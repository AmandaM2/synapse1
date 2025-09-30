import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router'; // Importe ActivatedRoute
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

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
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    // Apanhamos o 'id' da URL
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.project = this.projectService.getProjectById(projectId);
    }
  }
}