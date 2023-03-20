import { Component, OnDestroy } from '@angular/core';
import { ReactiveFormsModule,FormGroup, FormBuilder, Validators } from '@angular/forms';
import { delay, Subscription } from 'rxjs';
import { GetAprendizService } from '../../../services/admin/aprendiz/get-aprendiz.service';
@Component({
  selector: 'app-add-apprentices',
  templateUrl: './add-apprentices.component.html',
  styleUrls: ['./add-apprentices.component.scss']
})
export class AddApprenticesComponent implements OnDestroy {
  miForm: FormGroup;
  mensaje: string;
  resultado: boolean;
  loaders: boolean;
  suscribcion: Subscription;

  constructor(
    private controles: FormBuilder,
    private _getAprendizService: GetAprendizService
  ){
    this.mensaje = '';
    this.resultado = false;
    this.loaders = false;
    this.suscribcion = new Subscription();
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
    this.loaders = true;
    this.suscribcion = this._getAprendizService.enviarAprendiz(this.miForm.value).pipe(
      delay(300)
    ).subscribe(
      {
        next: () => {
          this.resultado = true;
          this.loaders = false;
          this.mensaje = 'Aprendiz Guardado'
        },
        error: (error: any) => {
          console.error(error);
          this.mensaje = 'Aprendiz No Guardado'
        },
        complete: () => {
          console.log("Aprendiz Guardado");
        }
       }
    );
    this.miForm.reset()
  }
  ngOnDestroy(): void {
    this.suscribcion.unsubscribe();
  }
}
