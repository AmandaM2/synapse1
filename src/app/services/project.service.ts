import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: Project[] = [
    {
      id: '1',
      title: 'Explorando Buracos Negros com Simulações Computacionais',
      authors: 'Dra. Elisa Antunes',
      summary: 'Este projeto utiliza simulações avançadas para modelar o comportamento da matéria ao redor de buracos negros, oferecendo novas perspetivas sobre a gravidade quântica.',
      description: 'Descrição completa do projeto sobre buracos negros...',
      publicationDate: new Date(),
      likes: 15,
      comments: []
    }
  ];

  constructor() { }

  getProjects(): Project[] {
    return [...this.projects];
  }

  addProject(projectData: { title: string, authors: string, summary: string, description: string }): void {
    const newProject: Project = {
      id: new Date().getTime().toString(),
      title: projectData.title,
      authors: projectData.authors,
      summary: projectData.summary,
      description: projectData.description,
      publicationDate: new Date(),
      likes: 0,
      comments: []
    };
    this.projects.unshift(newProject);
    console.log('Projeto adicionado!', this.projects);
  }

  getProjectById(id: string): Project | undefined {
    return this.projects.find(p => p.id === id);
  }

  deleteProject(id: string): void {
    this.projects = this.projects.filter(project => project.id !== id);
    console.log('Projeto excluído. Lista atual:', this.projects);
  }

  updateProject(id: string, updatedData: { title: string, authors: string, summary: string, description: string }): void {
    const projectIndex = this.projects.findIndex(p => p.id === id);
    if (projectIndex > -1) {
      this.projects[projectIndex] = {
        ...this.projects[projectIndex],
        ...updatedData
      };
      console.log('Projeto atualizado!', this.projects[projectIndex]);
    }
  }

  likeProject(id: string): void {
    const project = this.projects.find(p => p.id === id);
    if (project) {
      project.likes++;
      console.log(`Projeto ${id} curtido. Total de curtidas: ${project.likes}`);
    }
  }

  addComment(projectId: string, commentText: string): void {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      const newComment: Comment = {
        id: new Date().getTime().toString(),
        authorName: 'Utilizador Anónimo', // Numa app real, viria do AuthService
        text: commentText,
        timestamp: new Date()
      };
      project.comments.push(newComment);
      console.log(`Comentário adicionado ao projeto ${projectId}`);
    }
  }

} 