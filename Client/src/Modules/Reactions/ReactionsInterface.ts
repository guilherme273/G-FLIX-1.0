export interface ReactionType {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Reaction {
  id: number;
  id_user: number;
  id_reactions_type: number;
  id_movie: number;
  createdAt: string;
  reactionType: ReactionType;
}
