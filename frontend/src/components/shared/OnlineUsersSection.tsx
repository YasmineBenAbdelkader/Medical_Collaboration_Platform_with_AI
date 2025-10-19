import React from 'react';
import { UsersIcon, MessageCircleIcon } from 'lucide-react';

interface OnlineUser {
  id: number;
  name: string;
  specialty: string;
  avatar: string;
}

interface OnlineUsersSectionProps {
  title: string;
  users: OnlineUser[];
  buttonText: string;
}

export const OnlineUsersSection: React.FC<OnlineUsersSectionProps> = ({ 
  title, 
  users, 
  buttonText 
}) => {
  return (
    <div className="bg-white rounded-3xl border p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
        <UsersIcon size={20} className="text-teal-500" />
        {title}
      </h3>
      <div className="space-y-4">
        {users.map(user => (
          <div key={user.id} className="flex items-center gap-4 hover:bg-gray-50 rounded-xl p-2 transition">
            <div className="relative">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" 
              />
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">{user.specialty}</p>
            </div>
            <button className="text-teal-500 hover:text-teal-600">
              <MessageCircleIcon size={18} />
            </button>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 py-2 text-sm text-teal-600 font-medium rounded-xl bg-teal-50 hover:bg-teal-100 transition">
        {buttonText}
      </button>
    </div>
  );
};
