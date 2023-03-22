import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../models/login';
import { LoginService } from '../../services/login.service';
// import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  miForm: FormGroup;
  userLogin: Login;
  mensaje: string;
  estado: boolean;
  constructor(
    private _loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ){
    this.mensaje = '';
    this.estado = false;
    this.userLogin = this._loginService.getLoginUser();
    this.miForm = this.formBuilder.group(
      {
        user: ['', [ Validators.required ]],
        password: ['', [ Validators.required ]]
      }
    )
  }
  onSubmit(): void{
    // console.log(this.miForm.value);
    // this.miForm.reset();
    if (
      this.miForm.value.user == this.userLogin.user &&
      this.miForm.value.password == this.userLogin.password
       ){
        this._loginService.setAdminAuth(true);
        this.router.navigate(['/aprendiz'])
        return;
    }
    this.mensaje = 'Usuario o contraseña incorrecta'
    this.estado = true;
    setTimeout(() => {
      this.estado = false;
    }, 1200)
    this.miForm.reset()
  }
}
