import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly STORAGE_KEY = 'synapse-projects';

  private _allProjects: Project[] = [];
  private _projects$ = new BehaviorSubject<Project[]>([]);
  public projects$: Observable<Project[]> = this._projects$.asObservable();

  constructor() {
    this.loadProjectsFromLocalStorage();
  }

  private loadProjectsFromLocalStorage(): void {
    const projectsJson = localStorage.getItem(this.STORAGE_KEY);
    if (projectsJson) {
      this._allProjects = JSON.parse(projectsJson).map((p: any) => ({
        ...p,
        publicationDate: new Date(p.publicationDate),
        comments: p.comments ? p.comments.map((c: any) => ({ ...c, timestamp: new Date(c.timestamp) })) : []
      }));
    } else {
      this._allProjects = [
        {
          id: '1',
          title: 'Explorando Buracos Negros com Simulações Computacionais',
          authors: 'Dra. Elisa Antunes',
          summary: 'Este projeto utiliza simulações avançadas...',
          description: 'Descrição completa...',
          publicationDate: new Date(),
          likes: 15,
          comments: [],
          keywords: ['astrofísica', 'simulação']
        }
      ];
    }
    this._projects$.next(this._allProjects);
  }

  private saveAndBroadcast(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._allProjects));
    this._projects$.next(this._allProjects);
  }

  public filterProjects(searchTerm: string): void {
    if (!searchTerm) {
      this._projects$.next(this._allProjects);
      return;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = this._allProjects.filter(project =>
      project.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      project.summary.toLowerCase().includes(lowerCaseSearchTerm) ||
      project.keywords.some(k => k.toLowerCase().includes(lowerCaseSearchTerm))
    );
    this._projects$.next(filtered);
  }

  addProject(projectData: any): void {
    const newProject: Project = {
      id: new Date().getTime().toString(), ...projectData,
      publicationDate: new Date(), likes: 0, comments: []
    };
    this._allProjects.unshift(newProject);
    this.saveAndBroadcast();
  }

  deleteProject(id: string): void {
    this._allProjects = this._allProjects.filter(p => p.id !== id);
    this.saveAndBroadcast();
  }

  updateProject(id: string, updatedData: any): void {
    const index = this._allProjects.findIndex(p => p.id === id);
    if (index > -1) {
      this._allProjects[index] = { ...this._allProjects[index], ...updatedData };
      this.saveAndBroadcast();
    }
  }

  likeProject(id: string): void {
    const project = this._allProjects.find(p => p.id === id);
    if (project) {
      project.likes++;
      this.saveAndBroadcast();
    }
  }

  addComment(projectId: string, commentText: string): void {
    const project = this._allProjects.find(p => p.id === projectId);
    if (project) {
      const newComment: Comment = {
        id: new Date().getTime().toString(),
        authorName: 'Utilizador Anónimo', text: commentText, timestamp: new Date()
      };
      project.comments.push(newComment);
      this.saveAndBroadcast();
    }
  }
  
  getProjectById(id: string): Project | undefined {
    return this._allProjects.find(p => p.id === id);
  }
}