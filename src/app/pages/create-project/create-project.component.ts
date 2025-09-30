import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import{ Router } from '@angular/router'

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  projectForm!: FormGroup;

  constructor(
    private projectService: ProjectService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      authors: new FormControl(null, Validators.required),
      summary: new FormControl(null, [Validators.required, Validators.maxLength(300)]),
      description: new FormControl(null, Validators.required)
    });
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      return;
    }

    this.projectService.addProject(this.projectForm.value);

    alert('Projeto publicado com sucesso!');
    this.router.navigate(['/'])
    
    console.log('Dados do novo projeto:', this.projectForm.value);
  }
}