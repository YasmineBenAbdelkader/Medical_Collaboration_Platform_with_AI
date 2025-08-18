import React, { useState } from 'react';
import { FileTextIcon, UploadIcon, CheckCircleIcon, XIcon } from 'lucide-react';
interface FileUploadProps {
  label: string;
  accept?: string;
  icon?: React.ReactNode;
  required?: boolean;
}
export const FileUpload = ({
  label,
  accept = '.pdf,.jpg,.jpeg,.png',
  icon = <FileTextIcon size={20} />,
  required = false
}: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const removeFile = () => {
    setFile(null);
  };
  return <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {!file ? <div className={`border-2 border-dashed rounded-lg p-4 transition-all duration-300 ${isDragging ? 'border-[#00A7A7] bg-[#00A7A7]/5' : 'border-gray-300 hover:border-[#00A7A7]/50 bg-gray-50'}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="text-gray-500 mb-2">{icon}</div>
            <p className="text-sm text-gray-600 text-center mb-2">
              Glissez-déposez votre fichier ici, ou
            </p>
            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm py-1.5 px-3 rounded-md transition-colors duration-300 flex items-center">
              <UploadIcon size={16} className="mr-1.5" />
              Parcourir
              <input type="file" className="hidden" accept={accept} onChange={handleChange} required={required} />
            </label>
            <p className="text-xs text-gray-500 mt-2">
              Formats acceptés: PDF, JPG, PNG
            </p>
          </div>
        </div> : <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-[#00A7A7]/10 p-2 rounded-md mr-3">
              <FileTextIcon size={18} className="text-[#00A7A7]" />
            </div>
            <div>
              <p className="text-sm text-gray-800 truncate max-w-[200px]">
                {file.name}
              </p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <CheckCircleIcon size={16} className="text-green-500 mr-2" />
            <button type="button" onClick={removeFile} className="text-gray-500 hover:text-red-500 transition-colors duration-300">
              <XIcon size={18} />
            </button>
          </div>
        </div>}
    </div>;
};