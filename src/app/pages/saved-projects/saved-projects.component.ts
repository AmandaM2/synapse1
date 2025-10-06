import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-saved-projects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './saved-projects.component.html',
  styleUrls: ['./saved-projects.component.scss']
})
export class SavedProjectsComponent implements OnInit {
  savedProjects: Project[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.savedProjects = this.projectService.getSavedProjects();
  }
}