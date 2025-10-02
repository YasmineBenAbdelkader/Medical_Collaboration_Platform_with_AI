import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  showPasswordToggle?: boolean; // Ajouté
  size?: "sm" | "lg"; // Ajouté
  className?: string; // Ajouté
}
export const FormInput = ({
  id,
  label,
  type = 'text',
  placeholder,
  icon,
  required = false,
  value,
  onChange,
  readOnly = false,
  showPasswordToggle = true, // Ajouté
  size,
  className,
  ...rest
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const inputType = type === 'password' ? showPassword ? 'text' : 'password' : type;
  const sizeClasses = size === 'lg' ? 'px-4 py-3 text-base' : 'px-3 py-2 text-sm';
  
  return <div className={`mb-4 ${className || ''}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && type !== 'password' && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}
        <input id={id} type={inputType} className={`w-full ${sizeClasses} ${icon && type !== 'password' ? 'pl-10' : ''} bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A7A7] focus:border-transparent outline-none text-gray-800 placeholder-gray-400 transition-all duration-300 ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`} placeholder={placeholder} value={value} onChange={onChange} required={required} readOnly={readOnly} {...rest} />
        {type === 'password' && showPasswordToggle && (
          <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none">
            {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
          </button>
        )}
      </div>
    </div>;
};