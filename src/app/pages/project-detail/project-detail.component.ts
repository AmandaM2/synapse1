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
  isSaved: boolean = false; // NOVA PROPRIEDADE

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
    this.commentForm = new FormGroup({
      text: new FormControl(null, Validators.required)
    });
    
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.project = this.projectService.getProjectById(projectId);

      if (this.project) {
        // Inicializa o estado 'isSaved'
        this.isSaved = this.projectService.isProjectSaved(this.project.id);
        if (!this.project.comments) {
          this.project.comments = [];
        }
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
    }
  }
  onCommentSubmit(): void {
    if (this.commentForm.invalid || !this.project) {
      return;
    }
    
    const commentText = this.commentForm.value.text;
  
   
    this.projectService.addComment(this.project.id, commentText);
  
    this.commentForm.reset();
  }

  onToggleSave(): void {
    if (this.project) {
      this.projectService.toggleSaveProject(this.project.id);
      this.isSaved = !this.isSaved; // Inverte o estado na UI
    }
  }
}