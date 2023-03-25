import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { delay, Subscription } from 'rxjs';
import { IAprendiz } from '../../../models/iaprendiz';
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
  
  data$ = this._getAprendizService.aprendices$;
  suscribcion: Subscription;

  constructor(
    private controles: FormBuilder,
    private _getAprendizService: GetAprendizService
  ) {
    this.mensaje = '';
    this.resultado = false;
    this.loaders = false;
    this.suscribcion = new Subscription();
    this.miForm = this.controles.group(
      {
        id: ['', [Validators.required]],
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [
          Validators.required,
          Validators.maxLength(16),
          Validators.minLength(8)
        ]],
        createdAt: ['', [Validators.required]]
      }
    )
  }

  submit(): void {
    this.loaders = true;
    const buscarId: IAprendiz | undefined = this.data$.value.find(element => element.id == this.miForm.value.id)
    if (buscarId) {
      this.mensaje = 'Aprendiz no guardado id estan en la BD'
      this.loaders = false;
      this.resultado = true;
      setTimeout(() => {
        this.resultado = false;
      }, 3000)
    } else {
      this.suscribcion = this._getAprendizService.enviarAprendiz(this.miForm.value).pipe(
        delay(1000)
      ).subscribe(
        {
          next: () => {
            this.mensaje = 'Aprendiz Guardado'
            this.resultado = true;
            this.loaders = false;
            this.miForm.reset()
            setTimeout(() => {
              this.resultado = false;
            }, 3000)
          },
          error: (error: any) => {
            console.error(error);
          },
          complete: () => {
            //
          }
        }
      );
    }
  }
  ngOnDestroy(): void {
    this.suscribcion.unsubscribe();
  }
}
