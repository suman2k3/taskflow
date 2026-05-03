import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { projectsAPI } from '../services/api';
import Sidebar from '../components/Sidebar';
import ProjectCard from '../components/ProjectCard';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectsAPI.getProjects();
      setProjects(response.data.projects);
    } catch (err) {
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProject.title.trim()) {
      setError('Project title is required');
      return;
    }

    try {
      await projectsAPI.createProject(newProject);
      setNewProject({ title: '', description: '' });
      setShowCreateModal(false);
      fetchProjects();
    } catch (err) {
      setError('Failed to create project');
    }
  };

  const handleSelectProject = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      try {
        await projectsAPI.deleteProject(projectId);
        fetchProjects();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete project');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-600 mt-2">Welcome back, {user?.name}</p>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-primary"
              >
                + New Project
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <div className="loading">
              <p className="text-gray-600">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg mb-4">No projects yet</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-primary"
              >
                Create your first project
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  onClick={() => handleSelectProject(project._id)}
                  onDelete={handleDeleteProject}
                  isAdmin={user?.role === 'admin'}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Project</h2>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Project Title</label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="input-field"
                  placeholder="Project name"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="input-field"
                  placeholder="Project description (optional)"
                  rows="4"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
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
