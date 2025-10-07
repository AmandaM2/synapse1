
import { Comment } from "./comment.model";
export interface Project {
    id: string; // Adicionaremos um ID único mais tarde
    title: string;
    authorId: string;   
  authorName: string; 
    summary: string;
    description: string;
    publicationDate: Date; // Para sabermos quando foi publicado
    likes: number;
    comments: Comment[];
    keywords: string[];
  }