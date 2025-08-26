import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquareIcon, ThumbsUpIcon, BookmarkIcon, ShareIcon, SendIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

interface Comment {
  id: string;
  text: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    specialty: string;
  };
  date: string;
  likes: number;
}

interface CaseCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    specialty: string;
  };
  date: string;
  commentCount: number;
  likeCount: number;
  hasImage?: boolean;
  imageUrl?: string;
  tags?: string[];
  isUrgent?: boolean;
  comments?: Comment[];
}

export const CaseCard: React.FC<CaseCardProps> = ({
  id,
  title,
  excerpt,
  author,
  date,
  commentCount,
  likeCount,
  hasImage,
  imageUrl,
  tags,
  isUrgent,
  comments = []
}) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Données de commentaires simulées
  const sampleComments: Comment[] = [
    {
      id: '1',
      text: 'Ce cas présente des caractéristiques intéressantes. Je recommande d\'examiner les antécédents familiaux plus en détail.',
      author: {
        id: '2',
        name: 'Dr. Marie Laurent',
        avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        specialty: 'Dermatologie'
      },
      date: 'Il y a 2 heures',
      likes: 3
    },
    {
      id: '2',
      text: 'Avez-vous considéré une approche différente pour ce diagnostic ? Les symptômes semblent atypiques.',
      author: {
        id: '3',
        name: 'Dr. Antoine Moreau',
        avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        specialty: 'Pédiatrie'
      },
      date: 'Il y a 1 heure',
      likes: 1
    }
  ];

  const displayComments = comments.length > 0 ? comments : sampleComments;

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    
    // Simulation d'un délai d'envoi
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Ici, vous ajouteriez la logique pour envoyer le commentaire à l'API
    console.log('Nouveau commentaire:', newComment);
    
    setNewComment('');
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-center mb-3">
          <Link to={`/profile/${author.id}`} className="flex items-center">
            <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-full object-cover" />
            <div className="ml-2">
              <p className="text-sm font-medium text-gray-900">{author.name}</p>
              <p className="text-xs text-gray-500">{author.specialty}</p>
            </div>
          </Link>
          <span className="ml-auto text-xs text-gray-500">{date}</span>
        </div>
        
        {isUrgent && (
          <div className="mb-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Urgent
            </span>
          </div>
        )}
        
        <Link to={`/case/${id}`}>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-3">{excerpt}</p>
        </Link>
        
        {hasImage && imageUrl && (
          <div className="mb-3 rounded-md overflow-hidden">
            <img src={imageUrl} alt="Case image" className="w-full h-48 object-cover" />
          </div>
        )}
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, index) => (
              <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#00A7A7]/10 text-[#00A7A7]">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex space-x-4">
            <button className="flex items-center text-gray-500 hover:text-[#00A7A7]">
              <ThumbsUpIcon size={18} />
              <span className="ml-1 text-xs">{likeCount}</span>
            </button>
            <button 
              className="flex items-center text-gray-500 hover:text-[#00A7A7]"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageSquareIcon size={18} />
              <span className="ml-1 text-xs">{commentCount}</span>
              {showComments ? (
                <ChevronUpIcon size={16} className="ml-1" />
              ) : (
                <ChevronDownIcon size={16} className="ml-1" />
              )}
            </button>
          </div>
          <div className="flex space-x-2">
            <button className="text-gray-500 hover:text-[#00A7A7]">
              <BookmarkIcon size={18} />
            </button>
            <button className="text-gray-500 hover:text-[#00A7A7]">
              <ShareIcon size={18} />
            </button>
          </div>
        </div>

        {/* Section des commentaires */}
        {showComments && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            {/* Formulaire d'ajout de commentaire */}
            <form onSubmit={handleSubmitComment} className="mb-4">
              <div className="flex space-x-3">
                <img 
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                  alt="Your avatar" 
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Ajouter un commentaire..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#00A7A7] focus:border-transparent"
                    rows={2}
                    disabled={isSubmitting}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">
                      {newComment.length}/500 caractères
                    </span>
                    <button
                      type="submit"
                      disabled={!newComment.trim() || isSubmitting}
                      className="flex items-center px-3 py-1.5 text-sm font-medium text-white bg-[#00A7A7] rounded-lg hover:bg-[#009393] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Envoi...
                        </>
                      ) : (
                        <>
                          <SendIcon size={16} className="mr-1" />
                          Commenter
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Liste des commentaires */}
            <div className="space-y-4">
              {displayComments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <img 
                    src={comment.author.avatar} 
                    alt={comment.author.name} 
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <Link 
                            to={`/profile/${comment.author.id}`}
                            className="text-sm font-medium text-gray-900 hover:text-[#00A7A7]"
                          >
                            {comment.author.name}
                          </Link>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">{comment.author.specialty}</span>
                        </div>
                        <span className="text-xs text-gray-500">{comment.date}</span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.text}</p>
                    </div>
                    <div className="flex items-center mt-2 space-x-4">
                      <button className="flex items-center text-xs text-gray-500 hover:text-[#00A7A7]">
                        <ThumbsUpIcon size={14} className="mr-1" />
                        {comment.likes}
                      </button>
                      <button className="text-xs text-gray-500 hover:text-[#00A7A7]">
                        Répondre
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};