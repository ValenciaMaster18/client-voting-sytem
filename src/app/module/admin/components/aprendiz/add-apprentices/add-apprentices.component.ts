import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, delay, Subscription } from 'rxjs';
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
  estilo: boolean;
  loaders: boolean;
  estadoFormacion: string[];

  data$: BehaviorSubject<IAprendiz[]> = this._getAprendizService.aprendices$;
  suscribcion: Subscription;

  constructor(
    private controles: FormBuilder,
    private _getAprendizService: GetAprendizService
  ) {
    this.mensaje = '';
    this.resultado = false;
    this.estilo = false;
    this.loaders = false;
    this.estadoFormacion = ['En Formacion', 'Suspension', 'Retirado']
    this.suscribcion = new Subscription();
    this.miForm = this.controles.group(
      {
        id: [''],
        ficha: ['', [Validators.required]],
        documento: ['', [Validators.required]],
        nombre: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [''],
        estado: ['', [Validators.required]]
      }
    )
  }

  submit(): void {
    this.loaders = true;
    const buscarId: IAprendiz | undefined = this.data$.value.find(element => element.id == this.miForm.value.id)
    if (buscarId) {
      this.mensaje = 'Aprendiz no guardado id estan en la BD';
      this.loaders = false;
      this.estilo = false;
      this.resultado = true;
      setTimeout(() => {
        this.resultado = false;
      }, 4000)
    } else {
      const valDocCorreo = this.data$.value.find(element => {
        if (element.documento == this.miForm.value.documento || element.email == this.miForm.value.email) {
          return true;
        }
        return false;
      })
      if (valDocCorreo) {
        this.mensaje = 'Aprendiz no guardado documento o correo estan en la BD';
        this.loaders = false;
        this.estilo = false;
        this.resultado = true;
        setTimeout(() => {
          this.resultado = false;
        }, 4000)
      } else {
        this.miForm.value.id = this._getAprendizService.aprendices$.value.length + 1
        this.miForm.value.password = this.miForm.value.documento;
        this.suscribcion = this._getAprendizService.enviarAprendiz(this.miForm.value).pipe(
          delay(1000)
        ).subscribe(
          {
            next: () => {
              this.mensaje = 'Aprendiz Guardado'
              this.estilo = true;
              this.resultado = true;
              this.loaders = false;
              this.miForm.reset()
              setTimeout(() => {
                this.resultado = false;
              }, 4000)
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
  }
  ngOnDestroy(): void {
    this.suscribcion.unsubscribe();
  }
}
