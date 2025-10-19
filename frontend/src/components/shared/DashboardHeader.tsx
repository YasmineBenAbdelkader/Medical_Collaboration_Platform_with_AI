import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircleIcon, HeartPulseIcon } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  gradientFrom: string;
  gradientTo: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  gradientFrom,
  gradientTo,
}) => {
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold flex items-center tracking-tight">
          <span className="inline-block w-1.5 h-8 bg-teal-500 rounded-full mr-3 shadow-sm"></span>
          <span className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`}>
            {title}
          </span>
        </h1>
        <Link 
          to={buttonLink} 
          className="inline-flex items-center px-5 py-2.5 rounded-xl text-white bg-teal-500 shadow-md hover:shadow-lg transition-all duration-200 hover:bg-teal-600"
        >
          <PlusCircleIcon size={20} className="mr-2" />
          <span className="font-medium">{buttonText}</span>
        </Link>
      </div>

      {/* En-tête avec gradient */}
      <div className={`relative mb-4 overflow-hidden rounded-xl border border-teal-400/40 bg-gradient-to-r ${gradientFrom} ${gradientTo} shadow-md`}>
        <div className="absolute inset-0 opacity-40">
          <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <polyline 
              fill="none" 
              stroke="white" 
              strokeWidth="3" 
              strokeDasharray="1000"
              strokeDashoffset="1000"
              className="animate-pulse"
              points="0,100 80,100 100,40 120,160 140,100 220,100 240,60 260,140 280,100 360,100 380,30 400,170 420,100 520,100 540,50 560,150 580,100 800,100" 
            />
          </svg>
        </div>
        <div className="relative z-10 p-4 text-white">
          <div className="flex items-center gap-2 mb-1">
            <HeartPulseIcon size={22} className="drop-shadow animate-pulse" />
            <span className="uppercase text-xs tracking-widest opacity-80">MedCollab</span>
          </div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-white/80 text-sm mt-1">
            {subtitle}
          </p>
        </div>
      </div>
    </>
  );
};
