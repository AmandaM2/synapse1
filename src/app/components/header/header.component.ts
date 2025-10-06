import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchTerm: string = '';

  constructor(
    private authService: AuthService, 
    private projectService: ProjectService
  ) {}
  
  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
  
  onLogout(): void {
    this.authService.logout();
  }

  onSearch(): void {
    this.projectService.filterProjects(this.searchTerm);
  }
}