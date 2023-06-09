import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { delay, Subscription } from 'rxjs';
import { GetAprendizService } from '../../../../../services/aprendiz/get-aprendiz.service';
@Component({
  selector: 'app-add-apprentices',
  templateUrl: './add-apprentices.component.html',
  styleUrls: ['../../../../../../assets/css/formularios.scss']
})
export class AddApprenticesComponent implements OnDestroy {
  miForm: FormGroup;

  mensaje: string;
  resultado: boolean;
  estilo: boolean;
  loaders: boolean;
  tipoDocumento: string[];
  estadoAprendiz: string[];

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
    this.estadoAprendiz = ['EN_FORMACION', 'CANCELADO', 'RETIRADO', 'TRASLADADO', 'SUSPENDIDO']
    this.suscribcion = new Subscription();

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

    this._getAprendizService.aprendiz$.subscribe(
      {
        next: (value: any) => {
          console.log(value)
        },
        error: (err: any) => {
          console.log(err)
        },
        complete: () => { }
      });
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
          }, 7000)
        },
        error: (error: any) => {
          console.log(error)
          this.mensaje = "Aprendiz No Guardado, correo o numero documento existe"
          this.estilo = false;
          this.resultado = true;
          this.loaders = false;
          setTimeout(() => {
            this.resultado = false;
          }, 7000)
        },
        complete: () => {
          //
        }
      }
    );
  }
  ngOnDestroy(): void {
    this.suscribcion.unsubscribe();
  }
}
