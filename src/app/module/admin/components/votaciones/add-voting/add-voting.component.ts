import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { delay, Subscription } from 'rxjs';
import { IVotacion } from '../../../../../models/ivotacion';
import { VotacionService } from '../../../../../services/Votacion/votacion.service';
@Component({
  selector: 'app-add-voting',
  templateUrl: './add-voting.component.html',
  styleUrls: ['./add-voting.component.scss']
})
export class AddVotingComponent implements OnDestroy {
  miForm: FormGroup;

  mensaje: string;
  resultado: boolean;
  estilo: boolean;
  loaders: boolean;

  data$ = this._votacionServices.votacion$;
  suscribcion: Subscription;

  constructor(
    private controles: FormBuilder,
    private _votacionServices: VotacionService
  ) {
    this.mensaje = '';
    this.loaders = false;
    this.resultado = false;
    this.estilo = false;

    this.suscribcion = new Subscription();
    this.miForm = this.controles.group({
      id: [''],
      name: ['', [Validators.required]],
      estado: [''],
      descripcion: ['', [Validators.required]],
      fecha: ['']
    })
  }
  ngOnDestroy(): void {
    this.suscribcion.unsubscribe();
  }


  onSubmit(): void {
    this.loaders = true;
    this.miForm.value.id = this.data$.value.length + 1;
    this.miForm.value.estado = 'CERRADA';
    this.miForm.value.fecha = Date();
    const buscandoIdDeVotacion = this.data$.value?.find(elemento => elemento.id == this.miForm.value.id)
    if (buscandoIdDeVotacion) {
      this.loaders = false;
      this.mensaje = 'Votacion No aregada id estan en la BD';
      this.estilo = false;
      this.resultado = true;
      setTimeout(() => {
        this.resultado = false;
      }, 4000)
    } else {
      const nombreVotacion = this.data$.value.find(element => element.name == this.miForm.value.name);
      if (nombreVotacion) {
        this.loaders = false;
        this.mensaje = 'Votacion No aregada. Nombre votacion estan en la BD';
        this.estilo = false;
        this.resultado = true;
        setTimeout(() => {
          this.resultado = false;
        }, 4000)
      } else {
        this._votacionServices.addVotacion(this.miForm.value).pipe(
          delay(1000)
        ).subscribe(
          {
            next: () => {
              this.loaders = false;
              this.mensaje = 'Votacion agregada';
              this.estilo = true;
              this.resultado = true;
              this.miForm.reset();
              setTimeout(() => {
                this.resultado = false;
              }, 4000)
            },
            error: (error: any) => {
              console.error(error)
            },
            complete: () => {
              //
            }
          }
        );
      }
    }
  }
}
