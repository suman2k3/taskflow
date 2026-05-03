import React from 'react';

export default function ProjectCard({ project, onClick, onDelete, isAdmin }) {
  const memberCount = project.members?.length || 0;

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(project._id);
  };

  return (
    <div
      onClick={onClick}
      className="card cursor-pointer hover:shadow-lg transition-shadow hover:border-l-4 hover:border-l-blue-600"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800 mb-2">{project.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
        </div>
        {isAdmin && (
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-700 text-lg ml-2"
            title="Delete project"
          >
            🗑
          </button>
        )}
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>👥 {memberCount} member{memberCount !== 1 ? 's' : ''}</span>
        <span className="text-blue-600 font-medium">View →</span>
      </div>
    </div>
  );
}
