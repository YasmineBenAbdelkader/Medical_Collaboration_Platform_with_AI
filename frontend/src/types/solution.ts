export interface Solution {
  id: string;
  content: string;
  post_id: string;
  expert_id: string;
  created_at: string;
  updated_at?: string;
  status: 'pending' | 'accepted' | 'rejected';
  is_marked_as_resolution: boolean;
  like_count: number;
  helpful_count: number;
  expert_approvals: number;
  references: string[];
  confidence_level?: 'low' | 'medium' | 'high';
  is_deleted: boolean;
  is_edited: boolean;
}

export interface SolutionWithAuthor extends Solution {
  author?: {
    id: string;
    name: string;
    avatar?: string;
    specialty?: string;
  };
}

export interface SolutionCreate {
  content: string;
  post_id: string;
  confidence_level?: 'low' | 'medium' | 'high';
  references?: string[];
}

export interface SolutionUpdate {
  content?: string;
  status?: 'pending' | 'accepted' | 'rejected';
  is_marked_as_resolution?: boolean;
  confidence_level?: 'low' | 'medium' | 'high';
  references?: string[];
  updated_at?: string;
}

export interface SolutionResponse {
  success: boolean;
  message: string;
  data?: Solution;
}

export interface SolutionListResponse {
  success: boolean;
  message: string;
  data: Solution[];
  total: number;
}

export interface SolutionFilters {
  skip?: number;
  limit?: number;
  status?: 'pending' | 'accepted' | 'rejected';
  expert_id?: string;
}
