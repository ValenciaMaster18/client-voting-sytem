import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, delay, Subscription } from 'rxjs';
import { IAprendiz } from '../../../../../models/iaprendiz';
import { GetAprendizService } from '../../../../../services/aprendiz/get-aprendiz.service';
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
  tipoDocumento: string[];
  estadoAprendiz: string[];

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
    this.tipoDocumento = ['CC', 'TI', 'PEP', 'PPT', 'CE']
    this.estadoAprendiz = ['EN FORMACION', 'CANCELADO', 'RETIRADO', 'TRASLADADO', 'SUSPENDIDO']
    this.suscribcion = new Subscription();

    // const documento = this.controles.group(
    //   {
    //     tipoDocumento: ['', Validators.required],
    //     numeroDocumento: ['', Validators.required]
    //   }
    // )
    this.miForm = this.controles.group(
      {
        ficha: ['', [Validators.required]],
        programa: ['', [Validators.required]],
        tipoDocumento: ['', Validators.required],
        numeroDocumento: ['', Validators.required],
        nombre: ['', [Validators.required]],
        apellido: ['', [Validators.required]],
        celular: ['', [Validators.required]],
        correoElectronico: ['', [Validators.required, Validators.email]],
        estado: ['', [Validators.required]]
      }
    )
  }

  submit(): void {
    this.loaders = true;
    const buscarNumeroDocumento: IAprendiz | undefined = this.data$.value.find(element => element.numeroDocumento == this.miForm.value.documento.numeroDocumento)
    if (buscarNumeroDocumento) {
      this.mensaje = 'Aprendiz no guardado numero documento estan en la BD';
      this.loaders = false;
      this.estilo = false;
      this.resultado = true;
      setTimeout(() => {
        this.resultado = false;
      }, 4000)
    } else {
      const valDocCorreo = this.data$.value.find(element => {
        if (element.numeroDocumento == this.miForm.value.numeroDocumento || element.correoElectronico == this.miForm.value.correoElectronico) {
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
