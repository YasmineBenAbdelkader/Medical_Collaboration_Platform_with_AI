import React from 'react';

interface FilterSectionProps {
  title: string;
  filters: Array<{
    label: string;
    color: string;
    bgColor: string;
    textColor: string;
    hoverBg: string;
  }>;
}

export const FilterSection: React.FC<FilterSectionProps> = ({ title, filters }) => {
  return (
    <div className="bg-white rounded-xl border border-teal-300/30 p-4 mb-6 shadow-sm">
      <h2 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
        <span className="inline-block w-1.5 h-5 bg-teal-500 rounded-full mr-2"></span>
        {title}
      </h2>
      <div className="flex flex-wrap gap-3">
        {filters.map((filter, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full border ${filter.color} ${filter.bgColor} ${filter.textColor} font-medium text-sm hover:${filter.hoverBg} hover:scale-105 transition`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};
