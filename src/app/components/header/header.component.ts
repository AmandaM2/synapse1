import { Component, Output, EventEmitter, HostBinding } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchTerm: string = '';
isDarkMode: boolean;
  @Output() menuToggled = new EventEmitter<boolean>();

  @HostBinding('class.menu-is-open')
  isMenuOpen: boolean = false;
    


  constructor(
    private authService: AuthService, 
    private projectService: ProjectService,
    private themeService: ThemeService 
  ) {
    this.isDarkMode = this.themeService.isDarkMode();
  }

  
  
  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
  
  onLogout(): void {
    this.authService.logout();
  }

  onSearch(): void {
    this.projectService.filterProjects(this.searchTerm);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuToggled.emit(this.isMenuOpen);
  }

   onToggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkMode = this.themeService.isDarkMode();
  }
}
