import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI, projectsAPI } from '../services/api';
import Sidebar from '../components/Sidebar';

export default function UserManagement() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Redirect non-admins
  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projectsRes] = await Promise.all([
        projectsAPI.getProjects()
      ]);
      setProjects(projectsRes.data.projects);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const getProjectMembers = () => {
    const memberIds = new Set();
    projects.forEach(project => {
      project.members?.forEach(member => {
        memberIds.add(JSON.stringify(member));
      });
    });
    return Array.from(memberIds).map(m => JSON.parse(m));
  };

  const membersList = getProjectMembers();

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-600 mt-2">Manage projects and team members</p>
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

          {loading ? (
            <div className="loading">
              <p className="text-gray-600">Loading admin data...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Projects Section */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">All Projects ({projects.length})</h2>
                
                {projects.length === 0 ? (
                  <p className="text-gray-600">No projects available</p>
                ) : (
                  <div className="space-y-4">
                    {projects.map(project => (
                      <div key={project._id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800">{project.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                            <div className="flex gap-4 mt-3 text-sm text-gray-500">
                              <span>👤 Members: {project.members?.length || 0}</span>
                              <span>📝 Created by: {project.createdBy?.name}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Team Members Section */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Team Members ({membersList.length})</h2>
                
                {membersList.length === 0 ? (
                  <p className="text-gray-600">No team members</p>
                ) : (
                  <div className="space-y-4">
                    {membersList.map(member => (
                      <div key={member._id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-800">{member.name}</h3>
                            <p className="text-sm text-gray-600">{member.email}</p>
                            <div className="mt-2">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                member.role === 'admin'
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {member.role}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Statistics */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="text-3xl font-bold text-blue-600">{projects.length}</div>
                  <div className="text-sm text-blue-800 mt-2">Total Projects</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="text-3xl font-bold text-green-600">{membersList.length}</div>
                  <div className="text-sm text-green-800 mt-2">Active Members</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <div className="text-3xl font-bold text-purple-600">
                    {membersList.filter(m => m.role === 'admin').length}
                  </div>
                  <div className="text-sm text-purple-800 mt-2">Admin Users</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <div className="text-3xl font-bold text-orange-600">
                    {membersList.filter(m => m.role === 'member').length}
                  </div>
                  <div className="text-sm text-orange-800 mt-2">Regular Members</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
