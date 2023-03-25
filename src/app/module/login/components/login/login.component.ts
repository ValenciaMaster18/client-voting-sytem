import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  miForm: FormGroup;
  mensaje: string;
  estado: boolean;

  constructor(
    private _loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.mensaje = '';
    this.estado = false;
    this.miForm = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    )
  }
  onSubmit(): void {
    const {username, password } = this.miForm.getRawValue();
    if (username && password) {
      this._loginService.login(username, password)
        .subscribe(
          () => {
            this.mensaje = 'Usuario Logeado';
            this.router.navigateByUrl('/aprendiz');
            setTimeout(() => {
            this.estado = false;
            }, 1200 )
          }
        );
    }else{
      this.mensaje = 'Usuario o contraseña incorrecta'
      this.estado = true;
      setTimeout(() => {
        this.estado = false;
      }, 1200)
      this.miForm.reset()
    }
  }
}
