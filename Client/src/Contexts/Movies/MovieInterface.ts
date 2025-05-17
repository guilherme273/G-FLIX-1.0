import { Category } from "../../Modules/Categories/CategoriesInterface";
import { Favorites } from "../../Modules/Favorites/FavoritesInterface";
import { Reaction } from "../../Modules/Reactions/ReactionsInterface";
import { Views } from "../../Modules/Views/ViewsInterface";

export interface Movie {
  id: number;
  title: string;
  url: string;
  cover: string;
  category_id: number;
  youtube_id: string;
  createdAt: string;
  updatedAt: string;
  reactions: Reaction[];
  reactionCounts: {
    [reactionTypeId: number]: number;
  };
  favorites: Favorites[];
  views: Views[];
}
export interface MovieTable {
  id: number;
  title: string;
  url: string;
  cover: string;
  category_id: number;
  youtube_id: string;
  createdAt: string;
  updatedAt: string;
  reactions: Reaction[];
  reactionCounts: {
    [reactionTypeId: number]: number;
  };
  favorites: Favorites[];
  views: Views[];
  category: Category;
}

export interface Movies {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  movies: Movie[];
}
export interface addMovieDto {
  url: string;
  category_id: string;
}
export interface updateMovieDTO {
  id_movie: number;
  category_id: string;
  title: string;
}
