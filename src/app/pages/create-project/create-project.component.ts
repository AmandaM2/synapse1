import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Router, RouterLink } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      authors: new FormControl(null, Validators.required),
      summary: new FormControl(null, [Validators.required, Validators.maxLength(300)]),
      description: new FormControl(null, Validators.required),
      // NOVOS CAMPOS
      keywords: new FormControl(null, Validators.required),
      lgpdConsent: new FormControl(false, Validators.requiredTrue)
    });
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched(); // Mostra os erros se o utilizador tentar submeter inválido
      return;
    }

    const formValue = this.projectForm.value;

    // LIÇÃO IMPORTANTE: Transformação de Dados
    // O input dá-nos uma string "angular, tech, science".
    // O nosso serviço espera um array ['angular', 'tech', 'science'].
    // O código abaixo faz essa transformação.
    const keywordsArray = formValue.keywords.split(',').map((keyword: string) => keyword.trim());

    // Criamos o objeto de dados final para enviar ao serviço
    const projectData = {
      title: formValue.title,
      authors: formValue.authors,
      summary: formValue.summary,
      description: formValue.description,
      keywords: keywordsArray // Usamos o array transformado
    };

    this.projectService.addProject(projectData);

    alert('Projeto publicado com sucesso!');
    this.router.navigate(['/']);
  }
}