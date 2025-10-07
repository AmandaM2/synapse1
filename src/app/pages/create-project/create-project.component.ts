import { Component, OnInit } from '@angular-core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  projectForm!: FormGroup;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      authors: new FormControl(null), 
      summary: new FormControl(null, [Validators.required, Validators.maxLength(500)]),
      description: new FormControl(null, Validators.required),
      keywords: new FormControl(null, Validators.required),
      lgpdConsent: new FormControl(false, Validators.requiredTrue)
    });
  }

  
  onSubmit(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return; 
    }

  
    const authorId = this.authService.getCurrentUserId();
    const user = this.authService.getUserById(authorId!);

    if (!authorId || !user) {
      alert('Erro: não foi possível identificar o autor. Por favor, faça o login novamente.');
      return;
    }

    const formValue = this.projectForm.value;
    const keywordsArray = formValue.keywords.split(',').map((keyword: string) => keyword.trim());
    
    // Concatenamos o nome do autor principal com os co-autores (se houver)
    const finalAuthors = user.name + (formValue.authors ? `; ${formValue.authors}` : '');

    const projectData = {
      title: formValue.title,
      summary: formValue.summary,
      description: formValue.description,
      keywords: keywordsArray
    };

    this.projectService.addProject(projectData, authorId, finalAuthors);

    alert('Projeto publicado com sucesso!');
    this.router.navigate(['/']);
  } // O MÉTODO onSubmit SÓ TERMINA AQUI
  
} // A CLASSE SÓ TERMINA AQUI