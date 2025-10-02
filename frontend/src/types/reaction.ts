export interface Reaction {
  id: string;
  type: 'like' | 'dislike' | 'helpful' | 'expert_approved';
  post_id?: string;
  comment_id?: string;
  solution_id?: string;
  user_id: string;
  created_at: string;
}

export interface ReactionCreate {
  type: 'like' | 'dislike' | 'helpful' | 'expert_approved';
  post_id?: string;
  comment_id?: string;
  solution_id?: string;
}

export interface ReactionResponse {
  success: boolean;
  message: string;
  data?: Reaction;
}

export interface ReactionStats {
  likes: number;
  dislikes: number;
  helpful: number;
  expert_approved: number;
}
