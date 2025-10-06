import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// Validador Personalizado: Verifica se dois campos coincidem
export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (password !== confirmPassword) {
    return { passwordsNotMatching: true };
  }

  return null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
  name: new FormControl(null, Validators.required),
  email: new FormControl(null, [Validators.required, Validators.email]),
 password: new FormControl(null, [
  Validators.required,
  Validators.minLength(8),
  Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')
]),
confirmPassword: new FormControl(null, [Validators.required]),


  age: new FormControl(null, [Validators.required, Validators.min(16)]), // Idade obrigatória e mínima de 16
  profession: new FormControl(null, Validators.required),
  interests: new FormControl(null, Validators.required),


  lgpdConsent: new FormControl(false, Validators.requiredTrue) 
}, { 
  validators: passwordMatchValidator
});

  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      // Marca todos os campos como "tocados" para exibir os erros, se o utilizador tentar submeter
      this.registerForm.markAllAsTouched(); 
      return;
    }
    const { confirmPassword, ...registrationData } = this.registerForm.value;
    this.authService.register(registrationData);

    alert('Cadastro realizado com sucesso! Você será redirecionado para o login.');
    this.router.navigate(['/login']);
  }
}