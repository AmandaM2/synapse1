import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  projectForm!: FormGroup;
  currentProjectId: string | null = null;
  projectNotFound = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.currentProjectId = this.route.snapshot.paramMap.get('id');
    if (!this.currentProjectId) {
      this.projectNotFound = true;
      return;
    }

    const projectData = this.projectService.getProjectById(this.currentProjectId);
    if (!projectData) {
      this.projectNotFound = true;
      return;
    }

    this.initializeForm(projectData);
  }

  private initializeForm(project: Project): void {
    this.projectForm = new FormGroup({
      title: new FormControl(project.title, Validators.required),
      authors: new FormControl(project.authors, Validators.required),
      summary: new FormControl(project.summary, [Validators.required, Validators.maxLength(300)]),
      description: new FormControl(project.description, Validators.required)
    });
  }

  onSubmit(): void {
    if (this.projectForm.invalid || !this.currentProjectId) {
      return;
    }

    this.projectService.updateProject(this.currentProjectId, this.projectForm.value);
    alert('Projeto atualizado com sucesso!');
    this.router.navigate(['/projeto', this.currentProjectId]);
  }
}