import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public projects$: Observable<Project[]>;
  availableTags: string[] = [];

  constructor(
    private projectService: ProjectService,
    private authService: AuthService // 2. Injetar o AuthService
  ) {
    this.projects$ = this.projectService.projects$;
  }

    ngOnInit(): void {
    // No início, vamos buscar todas as tags disponíveis
    this.availableTags = this.projectService.getAllKeywords();
  }


  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  // 4. Adicionar os métodos que serão chamados pelos botões
  onLike(projectId: string): void {
    this.projectService.likeProject(projectId);
  }

  onToggleSave(projectId: string): void {
    this.projectService.toggleSaveProject(projectId);
  }

  // 5. Adicionar um método para verificar o estado de cada cartão
  isProjectSaved(projectId: string): boolean {
    return this.projectService.isProjectSaved(projectId);
  }

   filterByTag(tag: string): void {
    // Em vez de o componente filtrar, ele simplesmente DIZ ao serviço o que pesquisar.
    // O Header fará a mesma coisa, então a lógica é centralizada.
    this.projectService.filterProjects(tag);
  }
}