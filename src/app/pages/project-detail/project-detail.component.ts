import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router'; // Importe ActivatedRoute
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project: Project | undefined;

  constructor(
    private route: ActivatedRoute, // Para ler os parâmetros da URL
    private projectService: ProjectService,
    private authService: AuthService,
    private router: Router
  ) {}

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  ngOnInit(): void {
    // Apanhamos o 'id' da URL
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.project = this.projectService.getProjectById(projectId);
    }
  }

  onDelete(): void {
    // Primeiro, verificamos se temos um projeto para excluir
    if (!this.project) {
      return;
    }
  
    // Pedimos confirmação ao utilizador - uma prática CRUCIAL de UX!
    const confirmation = confirm('Tem a certeza de que deseja excluir este projeto? Esta ação não pode ser desfeita.');
  
    if (confirmation) {
      // Se o utilizador confirmar, chamamos o serviço
      this.projectService.deleteProject(this.project.id);
      alert('Projeto excluído com sucesso!');
      // E navegamos de volta para a página inicial
      this.router.navigate(['/']);
    }
  }

}