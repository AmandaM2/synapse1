
import { Comment } from "./comment.model";
export interface Project {
    id: string; // Adicionaremos um ID único mais tarde
    title: string;
    authors: string;
    summary: string;
    description: string;
    publicationDate: Date; // Para sabermos quando foi publicado
    likes: number;
    comments: Comment[];
    keywords: string[];
  }