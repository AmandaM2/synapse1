import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project: Project | undefined;
  commentForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private authService: AuthService,
    private router: Router
  ) {}

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  ngOnInit(): void {
    // Inicializa o formulário de comentário primeiro
    this.commentForm = new FormGroup({
      text: new FormControl(null, Validators.required)
    });
    
    // Vai buscar os dados do projeto
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.project = this.projectService.getProjectById(projectId);

      // ----> A CORREÇÃO PRINCIPAL ESTÁ AQUI <----
      // Linha de segurança: Se o projeto foi encontrado mas não tem a propriedade 'comments',
      // inicializamo-la como um array vazio para evitar erros no template.
      if (this.project && !this.project.comments) {
        this.project.comments = [];
      }
    }
  }

  onDelete(): void {
    if (!this.project) return;
    const confirmation = confirm('Tem a certeza de que deseja excluir este projeto?');
    if (confirmation) {
      this.projectService.deleteProject(this.project.id);
      alert('Projeto excluído com sucesso!');
      this.router.navigate(['/']);
    }
  }

  onLike(): void {
    if (this.project) {
      this.projectService.likeProject(this.project.id);
      this.project.likes++;
    }
  }

  onCommentSubmit(): void {
    if (this.commentForm.invalid || !this.project) {
      return;
    }
    const commentText = this.commentForm.value.text;
    this.projectService.addComment(this.project.id, commentText);

    // Como já garantimos que this.project.comments existe, esta linha é segura.
    this.project.comments.push({
      id: new Date().getTime().toString(),
      authorName: 'Utilizador Anónimo', // Numa app real, viria do AuthService
      text: commentText,
      timestamp: new Date()
    });

    this.commentForm.reset();
  }
}