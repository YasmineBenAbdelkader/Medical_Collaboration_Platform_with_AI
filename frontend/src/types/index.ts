export * from './post';
export * from './comment';
export * from './reaction';
export * from './solution';

// Types communs
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  message: string;
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface User {
  id: string;
  first_name: string;
  family_name: string;
  email_address: string;
  role: 'student' | 'doctor' | 'expert';
  medical_specialty_id?: string;
  profile_image?: string;
  banner_image?: string;
  profile_title?: string;
  address?: {
    country: string;
    city: string;
  };
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// Types pour les filtres communs
export interface BaseFilters {
  skip?: number;
  limit?: number;
}

export interface SearchFilters extends BaseFilters {
  search?: string;
}

// Types pour les médias
export type MediaType = 'image' | 'video' | 'document' | 'audio';
export type MimeType = 
  | 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp' | 'image/svg+xml'
  | 'video/mp4' | 'video/avi' | 'video/mov' | 'video/wmv' | 'video/flv' | 'video/webm'
  | 'application/pdf' | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  | 'application/msword' | 'text/plain' | 'application/rtf'
  | 'application/vnd.ms-powerpoint' | 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  | 'audio/mpeg' | 'audio/wav' | 'audio/ogg' | 'audio/mp4';

export interface FileUpload {
  file: File;
  preview?: string;
  progress?: number;
  error?: string;
}

// Types pour les spécialités médicales
export const MEDICAL_SPECIALTIES = [
  'Cardiologie',
  'Dermatologie', 
  'Endocrinologie',
  'Gastroentérologie',
  'Neurologie',
  'Oncologie',
  'Pédiatrie',
  'Pneumologie',
  'Psychiatrie',
  'Radiologie',
  'Rhumatologie',
  'Urgences'
] as const;

export type MedicalSpecialty = typeof MEDICAL_SPECIALTIES[number];

// Types pour les erreurs
export interface ApiError {
  detail: string;
  status_code: number;
}

// Types pour les notifications
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}
