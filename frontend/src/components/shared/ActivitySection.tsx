import React from 'react';
import { ClockIcon } from 'lucide-react';

interface Activity {
  id: number;
  text: string;
  time: string;
}

interface ActivitySectionProps {
  activities: Activity[];
}

export const ActivitySection: React.FC<ActivitySectionProps> = ({ activities }) => {
  return (
    <div className="bg-white rounded-3xl border p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
        <ClockIcon size={20} className="text-teal-500" />
        Activité récente
      </h3>
      <div className="space-y-4">
        {activities.map(activity => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className="w-2.5 h-2.5 bg-teal-400 rounded-full mt-1 animate-pulse"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-700">{activity.text}</p>
              <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
