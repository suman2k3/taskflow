import React, { useState } from 'react';

export default function TaskCard({ task, onUpdate, onDelete, canEdit, user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    status: task.status,
    description: task.description
  });

  const handleStatusChange = async (newStatus) => {
    await onUpdate(task._id, { status: newStatus });
    setIsEditing(false);
  };

  const canDelete = user?.role === 'admin' || task.createdBy?._id === user?.id;

  const formatDate = (date) => {
    if (!date) return 'No due date';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'Done';

  const statusColor = {
    'Todo': 'bg-gray-100 text-gray-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Done': 'bg-green-100 text-green-800'
  };

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-800">{task.title}</h4>
          <p className="text-gray-600 text-sm mt-1">{task.description}</p>
        </div>
        <div className="flex gap-2">
          {canEdit && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              ✎ Edit
            </button>
          )}
          {canDelete && (
            <button
              onClick={() => onDelete(task._id)}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              🗑 Delete
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 items-center text-sm">
        <span className={`px-3 py-1 rounded-full font-medium ${statusColor[task.status]}`}>
          {task.status}
        </span>

        {task.assignedTo && (
          <span className="text-gray-600">👤 {task.assignedTo.name}</span>
        )}

        <span className={`${isOverdue ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
          📅 {formatDate(task.dueDate)}
        </span>
      </div>

      {isEditing && canEdit && (
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
          <div>
            <label className="block text-sm text-gray-700 font-medium mb-2">Status</label>
            <div className="flex gap-2">
              {['Todo', 'In Progress', 'Done'].map(status => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    editData.status === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setIsEditing(false)}
            className="text-gray-600 hover:text-gray-700 text-sm"
          >
            Done editing
          </button>
        </div>
      )}
    </div>
  );
}
