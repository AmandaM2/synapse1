import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; // RouterLink foi adicionado aqui
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Corrigido de styleUrl para styleUrls
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),

      password: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    if(this.loginForm.invalid){
      return
    }
  

  const email = this.loginForm.value.email;
  const password = this.loginForm.value.password;

  const loginSuccess = this.authService.login(email, password);

  if(loginSuccess){
    alert('Login bem-sucedido!');
    this.router.navigate(['/']);
  } else{
    alert ('Email ou senha inválidos');
  }
}
}