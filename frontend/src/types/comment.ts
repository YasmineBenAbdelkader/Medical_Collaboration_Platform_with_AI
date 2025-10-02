export interface Comment {
  id: string;
  content: string;
  post_id: string;
  user_id: string;
  parent_comment_id?: string;
  created_at: string;
  updated_at?: string;
  reply_count: number;
  is_deleted: boolean;
  is_edited: boolean;
  like_count: number;
}

export interface CommentWithAuthor extends Comment {
  author?: {
    id: string;
    name: string;
    avatar?: string;
    specialty?: string;
  };
}

export interface CommentCreate {
  content: string;
  post_id: string;
  parent_comment_id?: string;
}

export interface CommentUpdate {
  content?: string;
  updated_at?: string;
}

export interface CommentResponse {
  success: boolean;
  message: string;
  data?: Comment;
}

export interface CommentListResponse {
  success: boolean;
  message: string;
  data: Comment[];
  total: number;
}

export interface CommentFilters {
  skip?: number;
  limit?: number;
}
