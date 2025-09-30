import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service'; // 1. Importe o serviço
import { Project } from '../../models/project.model';      
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // 3. Crie uma propriedade para guardar a lista de projetos
  projects: Project[] = [];

  // 4. Injete o serviço no construtor
  constructor(private projectService: ProjectService) {}

  // 5. No ngOnInit, vá buscar os projetos ao serviço
  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
  }
}