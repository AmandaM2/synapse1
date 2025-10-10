import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly PROJECTS_STORAGE_KEY = 'synapse-projects';
  private readonly SAVED_PROJECTS_KEY = 'synapse-saved-projects'; 
  private _allProjects: Project[] = [];
  private _projects$ = new BehaviorSubject<Project[]>([]);
  public projects$: Observable<Project[]> = this._projects$.asObservable();

  private savedProjectIds = new Set<string>();

  constructor() {
    this.loadProjectsFromLocalStorage();
    this.loadSavedProjectIds(); 
  }

  private loadProjectsFromLocalStorage(): void {
    const projectsJson = localStorage.getItem(this.PROJECTS_STORAGE_KEY);
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
          authorId: 'system', // ID do autor (exemplo)
    authorName: 'Dra. Elisa Antunes', // Nome do autor
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
    localStorage.setItem(this.PROJECTS_STORAGE_KEY, JSON.stringify(this._allProjects));
    this._projects$.next(this._allProjects);
  }

public filterProjects(searchTerm: string): void {
  const allProjects = this._allProjects;
  if (!searchTerm) {
    this._projects$.next(allProjects);
    return;
  }

  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  const filtered = allProjects.filter(project => {
    const titleMatch = project.title.toLowerCase().includes(lowerCaseSearchTerm);
    const summaryMatch = project.summary.toLowerCase().includes(lowerCaseSearchTerm);
    
    // A CORREÇÃO ESTÁ AQUI:
    // Primeiro verificamos se project.keywords existe, e só depois usamos o .some()
    const keywordsMatch = project.keywords && project.keywords.some(k => k.toLowerCase().includes(lowerCaseSearchTerm));

    return titleMatch || summaryMatch || keywordsMatch;
  });
  this._projects$.next(filtered);
}

  private loadSavedProjectIds(): void {
    const savedIdsJson = localStorage.getItem(this.SAVED_PROJECTS_KEY);
    if (savedIdsJson) {
      const ids: string[] = JSON.parse(savedIdsJson);
      this.savedProjectIds = new Set(ids);
    }
  }

  private saveIdsToLocalStorage(): void {
    localStorage.setItem(this.SAVED_PROJECTS_KEY, JSON.stringify(Array.from(this.savedProjectIds)));
  }

  public toggleSaveProject(projectId: string): void {
    if (this.savedProjectIds.has(projectId)) {
      this.savedProjectIds.delete(projectId); // Se já existe, remove
    } else {
      this.savedProjectIds.add(projectId); // Se não existe, adiciona
    }
    this.saveIdsToLocalStorage();
  }

  public getSavedProjects(): Project[] {

    return this._allProjects.filter(project => this.savedProjectIds.has(project.id));
  }

  public isProjectSaved(projectId: string): boolean {
    return this.savedProjectIds.has(projectId);
  }


  addProject(projectData: any, authorId: string, authorName: string): void {
    const newProject: Project = {
      id: new Date().getTime().toString(),
      ...projectData,
      authorId: authorId,
      authorName: authorName,
      publicationDate: new Date(),
      likes: 0,
      comments: []
    };

    this._allProjects.unshift(newProject);
    this.saveAndBroadcast(); 
    // ...
  }
  public getProjectsByAuthorId(authorId: string): Project[] {
    return this._allProjects.filter(p => p.authorId === authorId);
  }

  public getAllKeywords(): string[] {
  // O método flatMap primeiro cria um array de arrays de palavras-chave, e depois "achata-o" num único array.
  const allKeywords = this._allProjects.flatMap(project => project.keywords);
  // Usamos um Set para remover automaticamente as duplicadas e depois convertemos de volta para um array.
  return [...new Set(allKeywords)];
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