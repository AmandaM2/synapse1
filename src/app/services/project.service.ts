import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  // Chave para guardar os nossos dados no localStorage.
  private readonly STORAGE_KEY = 'synapse-projects';

  private projects: Project[] = [];

  constructor() {
    // NOVO: Quando o serviço é criado, tentamos carregar os projetos do localStorage.
    this.loadProjectsFromLocalStorage();
  }

  private loadProjectsFromLocalStorage(): void {
    const projectsJson = localStorage.getItem(this.STORAGE_KEY);
    if (projectsJson) {
      this.projects = JSON.parse(projectsJson);
      // IMPORTANTE: O JSON não guarda os tipos, então convertemos as strings de data de volta para objetos Date.
      this.projects.forEach(p => {
        p.publicationDate = new Date(p.publicationDate);
        p.comments.forEach(c => c.timestamp = new Date(c.timestamp));
      });
    } else {
      // Se não houver nada guardado, usamos o nosso projeto de exemplo inicial.
      this.projects = [
        {
          id: '1',
          title: 'Explorando Buracos Negros com Simulações Computacionais',
          authors: 'Dra. Elisa Antunes',
          summary: 'Este projeto utiliza simulações avançadas...',
          description: 'Descrição completa...',
          publicationDate: new Date(),
          likes: 15,
          comments: [],
          keywords: ['astrofísica', 'simulação', 'relatividade'] 
        }
      ];
    }
  }

  // NOVO: Um método privado para guardar o estado atual no localStorage.
  private saveProjectsToLocalStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.projects));
  }

  // MÉTODOS PÚBLICOS (com uma pequena adição)

  getProjects(): Project[] {
    return [...this.projects];
  }

  getProjectById(id: string): Project | undefined {
    return this.projects.find(p => p.id === id);
  }

addProject(projectData: { title: string, authors: string, summary: string, description: string, keywords: string[] }): void {
  const newProject: Project = {
    id: new Date().getTime().toString(),
    ...projectData, // Copia title, authors, summary, description, keywords
    publicationDate: new Date(),
    likes: 0,
    comments: []
  };
  this.projects.unshift(newProject);
  this.saveProjectsToLocalStorage();
}

  updateProject(id: string, updatedData: { title: string, authors: string, summary: string, description: string }): void {
    const projectIndex = this.projects.findIndex(p => p.id === id);
    if (projectIndex > -1) {
      this.projects[projectIndex] = { ...this.projects[projectIndex], ...updatedData };
      this.saveProjectsToLocalStorage(); // GUARDA AS ALTERAÇÕES
    }
  }

  deleteProject(id: string): void {
    this.projects = this.projects.filter(project => project.id !== id);
    this.saveProjectsToLocalStorage(); // GUARDA AS ALTERAÇÕES
  }

  likeProject(id: string): void {
    const project = this.projects.find(p => p.id === id);
    if (project) {
      project.likes++;
      this.saveProjectsToLocalStorage(); // GUARDA AS ALTERAÇÕES
    }
  }

  addComment(projectId: string, commentText: string): void {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      const newComment: Comment = {
        id: new Date().getTime().toString(),
        authorName: 'Utilizador Anónimo',
        text: commentText,
        timestamp: new Date()
      };
      project.comments.push(newComment);
      this.saveProjectsToLocalStorage(); // GUARDA AS ALTERAÇÕES
    }
  }
}