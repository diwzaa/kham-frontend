export interface Pattern {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;
  category: PatternCategory;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  author?: {
    id: string;
    name: string;
  };
  downloadCount: number;
  likeCount: number;
  isLiked?: boolean;
}

export interface PatternFormData {
  title: string;
  category: PatternCategory;
  publicationYear: string;
  description: string;
  tags: string[];
  imageFile?: File;
}

export interface AIPatternRequest {
  prompt: string;
  style?: string;
  colors?: string[];
  complexity?: 'simple' | 'medium' | 'complex';
  size?: {
    width: number;
    height: number;
  };
}

export interface AIPromptFormData {
  description: string;
  prompts: string[];
}

export enum PatternCategory {
  TRADITIONAL = 'traditional',
  MODERN = 'modern',
  GEOMETRIC = 'geometric',
  FLORAL = 'floral',
  ABSTRACT = 'abstract',
  CULTURAL = 'cultural'
}

export interface SearchFilters {
  query?: string;
  category?: PatternCategory;
  tags?: string[];
  sortBy?: 'newest' | 'popular' | 'downloads' | 'likes';
  isPublic?: boolean;
}

export interface PatternGridProps {
  patterns: Pattern[];
  loading?: boolean;
  onPatternClick?: (pattern: Pattern) => void;
  onLike?: (patternId: string) => void;
  onDownload?: (patternId: string) => void;
}

export interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PatternFormData) => Promise<void>;
}