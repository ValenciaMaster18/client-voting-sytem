import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { delay, Subscription } from 'rxjs';
import { IVotacion } from '../../../models/ivotacion';
import { VotacionService } from '../../../services/admin/Votacion/votacion.service';
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
      estado: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
    })
  }
  ngOnDestroy(): void {
    this.suscribcion.unsubscribe();
  }


  onSubmit(): void {
    this.loaders = true;
    this.miForm.value.id = this.data$.value.length + 1;
    const buscandoIdDeVotacion = this.data$.value?.find(elemento => elemento.id == this.miForm.value.id)
    if (buscandoIdDeVotacion) {
      this.loaders = false;
      this.mensaje = 'Votacion No aregada id estan en la BD';
      this.estilo = false;
      this.resultado = true;
      setTimeout(() => {
        this.resultado = false;
      }, 3000)
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
            }, 3000)
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
