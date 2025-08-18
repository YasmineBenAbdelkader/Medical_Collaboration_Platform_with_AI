import React from 'react';
import { ShieldIcon } from 'lucide-react';
export const Logo = () => {
  return <div className="flex flex-col items-center">
      <div className="relative">
        <div className="absolute inset-0 blur-md bg-gradient-to-br from-[#00A7A7] to-[#008B8B] opacity-60 rounded-full"></div>
        <div className="relative w-12 h-12 bg-gradient-to-br from-[#00A7A7] to-[#008B8B] rounded-full flex items-center justify-center shadow-lg">
          <ShieldIcon className="w-7 h-7 text-white" />
        </div>
      </div>
      <h1 className="mt-3 text-2xl font-bold bg-gradient-to-r from-[#00A7A7] to-[#008B8B] bg-clip-text text-transparent">
        MediCollab
      </h1>
      <p className="text-gray-600 text-sm mt-1 text-center">
        Collaboration médicale IA
      </p>
    </div>;
};