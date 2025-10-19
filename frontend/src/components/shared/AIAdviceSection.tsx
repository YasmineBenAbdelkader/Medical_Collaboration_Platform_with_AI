import React from 'react';
import { Link } from 'react-router-dom';
import { StarIcon } from 'lucide-react';

interface AIAdviceSectionProps {
  title: string;
  description: string;
  linkText: string;
  linkTo: string;
}

export const AIAdviceSection: React.FC<AIAdviceSectionProps> = ({
  title,
  description,
  linkText,
  linkTo,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-teal-200 p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <StarIcon size={20} className="text-teal-500" />
        {title}
      </h3>
      <p className="text-sm text-gray-700 mb-4">
        {description}
      </p>
      <Link 
        to={linkTo} 
        className="inline-flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-800 transition"
      >
        {linkText} →
      </Link>
    </div>
  );
};
