import React from 'react';
interface Option {
  value: string;
  label: string;
}
interface FormSelectProps {
  id: string;
  label: string;
  options: Option[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  icon?: React.ReactNode;
}
export const FormSelect = ({
  id,
  label,
  options,
  value,
  onChange,
  required = false,
  icon
}: FormSelectProps) => {
  return <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {icon}
          </div>}
        <select id={id} value={value} onChange={onChange} className={`w-full px-4 py-2 ${icon ? 'pl-10' : ''} bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A7A7] focus:border-transparent outline-none text-gray-800 transition-all duration-300 appearance-none`} required={required}>
          <option value="" disabled>
            Sélectionner...
          </option>
          {options.map(option => <option key={option.value} value={option.value}>
              {option.label}
            </option>)}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>;
};