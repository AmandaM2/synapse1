import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';



@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: User | undefined;
  userProjects: Project[] = [];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private projectService: ProjectService 
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.user = this.authService.getUserById(userId);
      // VAI BUSCAR OS PROJETOS DESTE UTILIZADOR
      this.userProjects = this.projectService.getProjectsByAuthorId(userId);
    }
  }
}
