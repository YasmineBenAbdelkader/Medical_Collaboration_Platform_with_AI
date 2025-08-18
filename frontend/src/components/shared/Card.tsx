import React from 'react';
import { ChevronRight } from 'lucide-react';
interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}
export const Card = ({
  icon,
  title,
  description,
  onClick
}: CardProps) => {
  return <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-blue-50 border border-transparent hover:border-blue-200 cursor-pointer" onClick={onClick}>
      <div className="flex justify-center mb-5">
        <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
        {title}
      </h3>
      <p className="text-gray-600 text-center mb-5">{description}</p>
      <div className="text-center">
        <button className="text-blue-500 font-medium hover:text-blue-700 inline-flex items-center">
          En savoir plus
          <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      </div>
    </div>;
};