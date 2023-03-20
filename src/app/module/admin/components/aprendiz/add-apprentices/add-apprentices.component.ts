import { Component } from '@angular/core';
import { ReactiveFormsModule,FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetAprendizService } from '../../../services/get-aprendiz.service';
@Component({
  selector: 'app-add-apprentices',
  templateUrl: './add-apprentices.component.html',
  styleUrls: ['./add-apprentices.component.scss']
})
export class AddApprenticesComponent {
  miForm: FormGroup;
  mensaje: string;
  resultado: boolean;
  loaders: boolean;
  constructor(
    private controles: FormBuilder,
    private _getAprendizService: GetAprendizService
  ){
    this.mensaje = '';
    this.resultado = false;
    this.loaders = false;
    this.miForm = this.controles.group(
      {
        id:['', [Validators.required]],
        name:['', [Validators.required]],
        email:['', [Validators.required, Validators.email]],
        password:['', [
          Validators.required,
          Validators.maxLength(16),
          Validators.minLength(8)
        ]],
        createdAt:['', [Validators.required]]
      }
    )
  }
  submit(): void{
    console.log(this.miForm.value)
    this._getAprendizService.enviarAprendiz(this.miForm.value).subscribe(
      {
        next: ( valor: any ) => {
          this.loaders = true;
          console.info(valor)
          this.resultado = true;
          this.loaders = false;
          this.mensaje = 'Aprendiz Guardado'
        },
        error: (error: any) => console.error(error),
        complete: () => console.log("Aprendiz Guardado")
       }

    );
    this.miForm.reset()
  }
}
