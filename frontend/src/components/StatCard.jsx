import React from 'react';

export default function StatCard({ label, value, color, textColor }) {
  return (
    <div className={`${color} rounded-lg p-4 border border-gray-200`}>
      <p className="text-gray-600 text-sm font-medium">{label}</p>
      <p className={`text-3xl font-bold ${textColor} mt-2`}>{value}</p>
    </div>
  );
}
