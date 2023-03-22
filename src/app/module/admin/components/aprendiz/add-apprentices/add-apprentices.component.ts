import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { delay, Subscription } from 'rxjs';
import { IAprendiz } from '../../../models/iaprendiz';
import { GetAprendizService } from '../../../services/admin/aprendiz/get-aprendiz.service';
@Component({
  selector: 'app-add-apprentices',
  templateUrl: './add-apprentices.component.html',
  styleUrls: ['./add-apprentices.component.scss']
})
export class AddApprenticesComponent implements OnInit, OnDestroy {
  miForm: FormGroup;
  mensaje: string;
  resultado: boolean;
  loaders: boolean;
  data: IAprendiz[];
  suscribcion: Subscription;

  constructor(
    private controles: FormBuilder,
    private _getAprendizService: GetAprendizService
  ) {
    this.mensaje = '';
    this.resultado = false;
    this.loaders = false;
    this.data = [];
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
  ngOnInit(): void {
    this._getAprendizService.getAprendiz().subscribe(
      {
        next: (valor: any) => {
          this.data = valor;
          console.log(this.data)
        },
        error: (error: any) => {
          console.error(error);
        },
        complete: () => {
          console.log("Aprendices cargados");
        }
      }
    )
  }

  submit(): void {
    this.loaders = true;
    const buscarId: IAprendiz | undefined = this.data.find(element => element.id == this.miForm.value.id)
    if (buscarId) {
      this.resultado = true;
      this.loaders = false;
      this.mensaje = 'Aprendiz no guardado id estan en la BD'
      setTimeout(() => {
        this.resultado = false;
      }, 3000)
    } else {
      this.suscribcion = this._getAprendizService.enviarAprendiz(this.miForm.value).pipe(
        delay(300)
      ).subscribe(
        {
          next: () => {
            this.resultado = true;
            this.loaders = false;
            this.mensaje = 'Aprendiz Guardado'
            setTimeout(() => {
              this.resultado = false;
            }, 1000)
          },
          error: (error: any) => {
            console.error(error);
            this.resultado = true;
            setTimeout(() => {
              this.resultado = false;
            }, 1000)
          },
          complete: () => {
            console.log("Operacion culminada de agregar candidato");
          }
        }
      );
    }
    this.miForm.reset()
  }
  ngOnDestroy(): void {
    this.suscribcion.unsubscribe();
  }
}
