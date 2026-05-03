import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { projectsAPI, tasksAPI, authAPI } from '../services/api';
import Sidebar from '../components/Sidebar';
import TaskCard from '../components/TaskCard';
import StatCard from '../components/StatCard';

export default function ProjectDetail() {
  const { id: projectId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    dueDate: '',
    status: 'Todo'
  });
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    fetchProjectData();
  }, [projectId]);

  const fetchProjectData = async () => {
    try {
      setLoading(true);
      const [projectRes, tasksRes, statsRes] = await Promise.all([
        projectsAPI.getProjectById(projectId),
        tasksAPI.getTasksByProject(projectId),
        tasksAPI.getTaskStats(projectId)
      ]);

      setProject(projectRes.data.project);
      setTasks(tasksRes.data.tasks);
      setStats(statsRes.data.stats);
    } catch (err) {
      setError('Failed to load project data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) {
      setError('Task title is required');
      return;
    }

    try {
      await tasksAPI.createTask({ ...newTask, projectId });
      setNewTask({ title: '', description: '', assignedTo: '', dueDate: '', status: 'Todo' });
      setShowCreateTaskModal(false);
      fetchProjectData();
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      await tasksAPI.updateTask(taskId, updates);
      fetchProjectData();
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await tasksAPI.deleteTask(taskId);
        fetchProjectData();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete task');
      }
    }
  };

  const handleDeleteProject = async () => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      try {
        await projectsAPI.deleteProject(projectId);
        navigate('/dashboard');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete project');
      }
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!newMemberEmail.trim()) {
      setError('Email is required');
      return;
    }

    try {
      // Look up user by email
      const userRes = await authAPI.getUserByEmail(newMemberEmail);
      const userId = userRes.data.user.id;
      
      // Add user as member
      await projectsAPI.addMember(projectId, userId);
      
      setNewMemberEmail('');
      setShowAddMemberModal(false);
      setError('');
      fetchProjectData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add member');
    }
  };

  const isAdmin = user?.role === 'admin';
  const isProjectCreator = project?.createdBy?._id === user?.id;

  const filteredTasks = filterStatus === 'All'
    ? tasks
    : tasks.filter(t => t.status === filterStatus);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex justify-between items-start">
              <div>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-blue-600 hover:text-blue-700 mb-4"
                >
                  ← Back to Dashboard
                </button>
                <h1 className="text-3xl font-bold text-gray-800">{project?.title}</h1>
                <p className="text-gray-600 mt-2">{project?.description}</p>
              </div>
              <div className="flex gap-2">
                {(isAdmin || isProjectCreator) && (
                  <>
                    <button
                      onClick={() => setShowAddMemberModal(true)}
                      className="btn-secondary"
                    >
                      + Add Member
                    </button>
                    {isAdmin && (
                      <button
                        onClick={handleDeleteProject}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                      >
                        🗑 Delete Project
                      </button>
                    )}
                  </>
                )}
                <button
                  onClick={() => setShowCreateTaskModal(true)}
                  className="btn-primary"
                >
                  + New Task
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <StatCard label="Total Tasks" value={stats.total} color="bg-blue-50" textColor="text-blue-600" />
              <StatCard label="Completed" value={stats.completed} color="bg-green-50" textColor="text-green-600" />
              <StatCard label="In Progress" value={stats.inProgress} color="bg-yellow-50" textColor="text-yellow-600" />
              <StatCard label="Pending" value={stats.pending} color="bg-gray-50" textColor="text-gray-600" />
              <StatCard label="Overdue" value={stats.overdue} color="bg-red-50" textColor="text-red-600" />
            </div>
          )}

          {/* Tasks Section */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Tasks</h2>
              <div className="flex gap-2">
                {['All', 'Todo', 'In Progress', 'Done'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filterStatus === status
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {filteredTasks.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-600">No tasks found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTasks.map(task => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onUpdate={handleUpdateTask}
                    onDelete={handleDeleteTask}
                    canEdit={isAdmin || isProjectCreator || task.assignedTo?._id === user?.id}
                    user={user}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Task Modal */}
      {showCreateTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Task</h2>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Task Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="input-field"
                  placeholder="Task name"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="input-field"
                  placeholder="Task description"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Assign To</label>
                <select
                  value={newTask.assignedTo}
                  onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                  className="input-field"
                >
                  <option value="">Unassigned</option>
                  {project?.members.map(member => (
                    <option key={member._id} value={member._id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Due Date</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="flex gap-4">
                <button type="submit" className="flex-1 btn-primary">
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateTaskModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Member</h2>

            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  className="input-field"
                  placeholder="member@email.com"
                  required
                />
              </div>

              <div className="flex gap-4">
                <button type="submit" className="flex-1 btn-primary">
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddMemberModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
