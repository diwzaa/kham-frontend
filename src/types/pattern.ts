export interface Pattern {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  description: string;
  tags: string[];
  likes: number;
  isFavorite: boolean;
}

export interface UploadFormData {
  name: string;
  category: string;
  description: string;
  tags: string[];
  image: File | null;
}

export interface SearchFilters {
  query: string;
  category: string;
  sortBy: 'newest' | 'popular' | 'name';
}