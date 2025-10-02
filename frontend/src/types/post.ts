export interface Media {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document' | 'audio';
  mime_type: string;
  url: string;
  size: number;
  width?: number;
  height?: number;
  duration?: number;
  uploaded_at: string;
  post_id?: string;
  user_id: string;
  is_processed: boolean;
  is_public: boolean;
  virus_scan_status?: 'pending' | 'clean' | 'infected';
}

export interface Post {
  id: string;
  title: string;
  summary?: string;
  content?: string;
  specialty?: string;
  is_urgent: boolean;
  is_resolved: boolean;
  ai_suggest?: string;
  author_id: string;
  media: Media[];
  tags: string[];
  created_at: string;
  updated_at?: string;
  comment_count: number;
  like_count: number;
  solution_count: number;
  is_anonymized: boolean;
}

export interface PostWithAuthor extends Post {
  author?: {
    id: string;
    name: string;
    avatar?: string;
    specialty?: string;
  };
}

export interface PostCreate {
  title: string;
  summary?: string;
  content?: string;
  specialty?: string;
  is_urgent: boolean;
  tags: string[];
  is_anonymized: boolean;
  media: MediaCreate[];
}

export interface MediaCreate {
  name: string;
  type: 'image' | 'video' | 'document' | 'audio';
  mime_type: string;
  url: string;
  size: number;
  width?: number;
  height?: number;
  duration?: number;
}

export interface PostUpdate {
  title?: string;
  summary?: string;
  content?: string;
  specialty?: string;
  is_urgent?: boolean;
  is_resolved?: boolean;
  tags?: string[];
  updated_at?: string;
}

export interface PostResponse {
  success: boolean;
  message: string;
  data?: Post;
}

export interface PostListResponse {
  success: boolean;
  message: string;
  data: Post[];
  total: number;
  page: number;
  limit: number;
}

export interface PostStats {
  total_posts: number;
  urgent_posts: number;
  resolved_posts: number;
  posts_by_specialty: Record<string, number>;
  posts_by_month: Record<string, number>;
}

export interface PostFilters {
  skip?: number;
  limit?: number;
  specialty?: string;
  is_urgent?: boolean;
  is_resolved?: boolean;
  search?: string;
  author_id?: string;
}
