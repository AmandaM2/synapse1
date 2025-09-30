import { Injectable } from '@angular/core';
import { Project } from '../models/project.model'; // 1. Importe a nossa interface

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  // 2. Uma lista privada para guardar os projetos.
  // Começa com um projeto de exemplo para não termos a página vazia.
  private projects: Project[] = [
    {
      id: '1',
      title: 'Explorando Buracos Negros com Simulações Computacionais',
      authors: 'Dra. Elisa Antunes',
      summary: 'Este projeto utiliza simulações avançadas para modelar o comportamento da matéria ao redor de buracos negros, oferecendo novas perspetivas sobre a gravidade quântica.',
      description: 'Descrição completa do projeto sobre buracos negros...',
      publicationDate: new Date()
    }
  ];

  constructor() { }

  // 3. Método para obter todos os projetos
  getProjects(): Project[] {
    // Retornamos uma cópia do array para evitar modificações acidentais
    return [...this.projects];
  }

  // 4. Método para adicionar um novo projeto
  addProject(projectData: { title: string, authors: string, summary: string, description: string }): void {
    const newProject: Project = {
      id: new Date().getTime().toString(), // Um ID único baseado no tempo atual
      title: projectData.title,
      authors: projectData.authors,
      summary: projectData.summary,
      description: projectData.description,
      publicationDate: new Date()
    };

    // Adiciona o novo projeto ao início da lista (para aparecer primeiro)
    this.projects.unshift(newProject);


    console.log('Projeto adicionado!', this.projects);
  }
      getProjectById(id: string): Project | undefined {
      return this.projects.find(p => p.id === id);
    }

}