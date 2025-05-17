import { Views } from "../Views/ViewsInterface";

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updated_at: string;
}
export interface CategoryPage {
  id: number;
  name: string;
  createdAt: string;
  updated_at: string;
  movies: MovieToCategoryPage[];
}
export interface MovieToCategoryPage {
  id: number;
  title: string;
  youtube_id: string;
  url: string;
  cover: string;
  category_id: number;
  created_at: string;
  updated_at: string;
  views: Views[];
}

export interface addCategoryDto {
  name: string;
}
