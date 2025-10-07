import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, FormArray } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';


export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (password !== confirmPassword) {
    return { passwordsNotMatching: true };
  }

  return null;
}

function adultAgeValidator(control: AbstractControl): ValidationErrors | null {
  const birthDate = new Date(control.value);
  const today = new Date();
  const date18YearsAgo = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());

  if (birthDate > date18YearsAgo) {
    return { mustBeAdult: true }; 
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

  professions: string[] = [
    'Administrador(a)',
    'Administrador(a) Público(a)',
    'Advogado(a)',
    'Agrônomo(a)',
    'Analista de Comércio Exterior',
    'Analista de Dados',
    'Analista de Marketing',
    'Analista de Recursos Humanos',
    'Analista de Sistemas',
    'Analista Financeiro(a)',
    'Ambientalista',
    'Antropólogo(a)',
    'Apresentador(a) de TV',
    'Arqueólogo(a)',
    'Arquiteto(a)',
    'Artesão(ã)',
    'Assistente Administrativo(a)',
    'Assistente Social',
    'Astrônomo(a)',
    'Atendente de Farmácia',
    'Atleta',
    'Ator/Atriz',
    'Auditor(a)',
    'Bibliotecário(a)',
    'Biocientista',
    'Biomédico(a)',
    'Biólogo(a)',
    'Bombeiro(a)',
    'Cabeleireiro(a)',
    'Caminhoneiro(a)',
    'Carpinteiro(a)',
    'Cartógrafo(a)',
    'Chefe de Cozinha',
    'Cientista de Alimentos',
    'Cientista de Dados',
    'Cientista Político(a)',
    'Cineasta',
    'Coach',
    'Comissário(a) de Bordo',
    'Comprador(a)',
    'Comunicador(a) Visual',
    'Consultor(a) Ambiental',
    'Consultor(a) Empresarial',
    'Consultor(a) Financeiro(a)',
    'Contador(a)',
    'Controlador(a) de Qualidade',
    'Corretor(a) de Imóveis',
    'Corretor(a) de Seguros',
    'Costureiro(a)',
    'Criador(a) de Conteúdo',
    'Cuidador(a) de Idosos',
    'Decorador(a) de Interiores',
    'Delegado(a)',
    'Dentista',
    'Designer de Interiores',
    'Designer de Moda',
    'Designer de Produto',
    'Designer Gráfico',
    'Desenvolvedor(a) Back-end',
    'Desenvolvedor(a) Front-end',
    'Desenvolvedor(a) Web',
    'Detetive Particular',
    'Diplomata',
    'Diretor(a) de Arte',
    'Diretor(a) de Cinema',
    'Diretor(a) Escolar',
    'Docente Universitário(a)',
    'Doula',
    'Economista',
    'Editor(a) de Vídeo',
    'Eletricista',
    'Embaixador(a)',
    'Empreendedor(a)',
    'Encanador(a)',
    'Enfermeiro(a)',
    'Engenheiro(a) Aeronáutico(a)',
    'Engenheiro(a) Agrônomo(a)',
    'Engenheiro(a) Ambiental',
    'Engenheiro(a) Biomédico(a)',
    'Engenheiro(a) Civil',
    'Engenheiro(a) de Controle e Automação',
    'Engenheiro(a) de Minas',
    'Engenheiro(a) de Pesca',
    'Engenheiro(a) de Produção',
    'Engenheiro(a) de Segurança do Trabalho',
    'Engenheiro(a) de Software',
    'Engenheiro(a) Elétrico(a)',
    'Engenheiro(a) Mecânico(a)',
    'Engenheiro(a) Naval',
    'Engenheiro(a) Químico(a)',
    'Escritor(a)',
    'Escultor(a)',
    'Estatístico(a)',
    'Estilista',
    'Estudante',
    'Farmacêutico(a)',
    'Físico(a)',
    'Fisioterapeuta',
    'Fonoaudiólogo(a)',
    'Fotógrafo(a)',
    'Garçom/Garçonete',
    'Gastrônomo(a)',
    'Geógrafo(a)',
    'Geólogo(a)',
    'Gestor(a) Ambiental',
    'Gestor(a) Comercial',
    'Gestor(a) Cultural',
    'Gestor(a) de Logística',
    'Gestor(a) de Projetos',
    'Gestor(a) de Recursos Humanos',
    'Gestor(a) Financeiro(a)',
    'Guia de Turismo',
    'Historiador(a)',
    'Ilustrador(a)',
    'Inspetor(a) Escolar',
    'Instrutor(a) de Autoescola',
    'Instrutor(a) de Dança',
    'Instrutor(a) de Musculação',
    'Intérprete',
    'Investigador(a)',
    'Jardineiro(a)',
    'Joalheiro(a)',
    'Jogador(a) de Futebol',
    'Jornalista',
    'Jornalista Científico',
    'Juiz(a)',
    'Locutor(a)',
    'Maquiador(a)',
    'Marceneiro(a)',
    'Marketing Digital',
    'Médico(a)',
    'Médico(a) Veterinário(a)',
    'Mecânico(a)',
    'Meteorologista',
    'Militar',
    'Modelo',
    'Motorista',
    'Músico(a)',
    'Nutricionista',
    'Oceanógrafo(a)',
    'Operador(a) de Máquinas',
    'Orientador(a) Educacional',
    'Paisagista',
    'Pedagogo(a)',
    'Perito(a) Criminal',
    'Personal Trainer',
    'Pesquisador(a)',
    'Pintor(a)',
    'Piloto(a) de Avião',
    'Policial Civil',
    'Policial Federal',
    'Produtor(a) Audiovisual',
    'Produtor(a) Cultural',
    'Produtor(a) de Eventos',
    'Programador(a)',
    'Promotor(a) de Justiça',
    'Psicólogo(a)',
    'Publicitário(a)',
    'Químico(a)',
    'Relações Internacionais',
    'Relações Públicas',
    'Representante Comercial',
    'Revisor(a) de Textos',
    'Sociólogo(a)',
    'Soldador(a)',
    'Sommelier',
    'Tatuador(a)',
    'Técnico(a) Agrícola',
    'Técnico(a) de Enfermagem',
    'Técnico(a) de Informática',
    'Técnico(a) de Laboratório',
    'Técnico(a) de Segurança do Trabalho',
    'Técnico(a) Eletrônico(a)',
    'Técnico(a) em Administração',
    'Técnico(a) em Contabilidade',
    'Técnico(a) em Edificações',
    'Técnico(a) em Logística',
    'Técnico(a) em Mecânica',
    'Técnico(a) em Meio Ambiente',
    'Técnico(a) em Química',
    'Terapeuta Ocupacional',
    'Tradutor(a)',
    'Turismólogo(a)',
    'Urbanista',
    'Vendedor(a)',
    'Veterinário(a)',
    'Videomaker',
    'Web Designer',
    'Youtuber',
    'Zootecnista' ,      
    'Outros'
    
  ];

  interestTags = [
    { name: 'Ciências Biológicas', selected: false },
    { name: 'Engenharias e Tecnologia', selected: false },
    { name: 'Ciências da Saúde', selected: false },
    { name: 'Ciências Humanas', selected: false },
    { name: 'Linguística, Letras e Artes', selected: false },
    { name: 'Ciências Sociais Aplicadas', selected: false },
    { name: 'Ciências Exatas e da Terra', selected: false},
    { name: 'Ciências Agrárias', selected: false},
    { name: 'Ciências Multidisciplinares', selected: false}
  ];

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


birthDate: new FormControl(null, [Validators.required, adultAgeValidator]),
  profession: new FormControl(null, Validators.required),
  interests: new FormArray([], Validators.required),


  lgpdConsent: new FormControl(false, Validators.requiredTrue) 
}, { 
  validators: passwordMatchValidator
});

this.addInterestCheckboxes();

  }

  private addInterestCheckboxes() {
    this.interestTags.forEach(() => {
      (this.registerForm.get('interests') as FormArray).push(new FormControl(false));
    });
  }

  get interestsFormArray() {
    return this.registerForm.get('interests') as FormArray;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      
      this.registerForm.markAllAsTouched(); 
      return;
    }

    const selectedInterests = this.registerForm.value.interests
    .map((checked: boolean, i: number) => checked ? this.interestTags[i].name : null)
    .filter((name: string | null) => name !== null);

    const finalUserData = {
      ...this.registerForm.value,
      interests: selectedInterests 
    };

    const registrationSuccessful = this.authService.register(finalUserData);

if (registrationSuccessful) {
  alert('Cadastro realizado com sucesso! Você será redirecionado para o login.');
  this.router.navigate(['/login']);
}
  }
}