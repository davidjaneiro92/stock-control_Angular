import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { authRequest } from 'src/app/moduls/interfaces/user/auth/authRequest';
import { signuoUserRequest } from 'src/app/moduls/interfaces/user/siginuoUserRequest';
import { UserService } from './../../services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  [x: string]: any;
  loginCard = true;

  loginForm = this.formbuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  signuoForm = this.formbuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  constructor(private formbuilder: FormBuilder, private userService: UserService,
    private cookieService: CookieService, private messageService: MessageService, private router: Router) { }

  onSubmitLoginForm(): void {
    if(this.loginForm.value && this.loginForm.valid){
      this.userService.authuser(this.loginForm.value as authRequest)
      .subscribe({
        next: (response) => {
          if (response) {
           this.cookieService.set('USER_INFO',response?.token)
            this.signuoForm.reset();
            this.router.navigate(['/dashboard'])

            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `Bem vindo Senhor(a) ${response.name}!`,
              life: 2000
            });
          }
        },
        error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Erro ao Fazer Login!`,
          life: 2000
        });
        console.log(err);
      }
      });
    }
  }
  onSubmitSignuoForm(): void {
    if (this.signuoForm.value && this.signuoForm.valid) {
      this.userService.signupUser(this.signuoForm.value as signuoUserRequest)
        .subscribe({
          next: (response) => {
            if (response) {
              this.signuoForm.reset();
              this.loginCard = true;
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: `Criado com Sucesso!`,
                life: 2000
              });
            }
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: `Erro ao ao cria Usuário`,
              life: 2000
            });
            console.log(err);
          }
        });
    }
  }


}
