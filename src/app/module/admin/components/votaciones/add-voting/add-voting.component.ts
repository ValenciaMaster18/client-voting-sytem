import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, delay, Subscription } from 'rxjs';
import { VotacionService } from '../../../../../services/Votacion/votacion.service';
import { IVotacion } from 'src/app/models/ivotacion';
@Component({
  selector: 'app-add-voting',
  templateUrl: './add-voting.component.html',
  styleUrls: ['../../../../../../assets/css/formularios.scss']
})
export class AddVotingComponent implements OnDestroy {
  miForm: FormGroup;

  mensaje: string;
  resultado: boolean;
  estilo: boolean;
  loaders: boolean;

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
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      estado: [''],
      current: ['']
    })
  }
  ngOnDestroy(): void {
    this.suscribcion.unsubscribe();
  }


  onSubmit(): void {
    this.loaders = true;
    this.miForm.value.estado = 'CREADA';
    this.miForm.value.current = false;
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
          }, 7000)
        },
        error: (error: any) => {
          this.loaders = false;
          this.mensaje = 'Votacion No agregada. Nombre de votacion existente en la base de datos';
          this.estilo = false;
          this.resultado = true;
          this.miForm.reset();
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
}
