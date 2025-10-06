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

  constructor(
    private projectService: ProjectService,
    private authService: AuthService // 2. Injetar o AuthService
  ) {
    this.projects$ = this.projectService.projects$;
  }

  // 3. Adicionar a lógica para saber se está logado
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
}