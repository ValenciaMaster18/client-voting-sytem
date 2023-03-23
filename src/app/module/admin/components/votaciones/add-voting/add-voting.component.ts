import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IVotacion } from '../../../models/ivotacion';
import { VotacionService } from '../../../services/admin/Votacion/votacion.service';
@Component({
  selector: 'app-add-voting',
  templateUrl: './add-voting.component.html',
  styleUrls: ['./add-voting.component.scss']
})
export class AddVotingComponent implements OnInit, OnDestroy {
  miForm: FormGroup;
  loaders: boolean;
  mensaje: string;
  resultado: boolean;
  estilo: boolean;
  data: IVotacion[];
  suscribcion: Subscription;
  constructor(
    private controles: FormBuilder,
    private _votacionServices: VotacionService
  ) {
    this.mensaje = '';
    this.loaders = false;
    this.resultado = false;
    this.estilo = false;
    this.data = [];
    this.suscribcion = new Subscription();
    this.miForm = this.controles.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
    })
  }
  ngOnDestroy(): void {
    this.suscribcion.unsubscribe();
  }
  ngOnInit(): void {
    this.suscribcion = this._votacionServices.getVotacion().subscribe(
      {
        next: (value: any) => {
          this.data = value
        },
        error: (error: any) => {
          console.error(error);
        },
        complete: () => { console.error("1") },
      });
  }
  onSubmit(): void {
    this.loaders = true;
    const buscandoIdDeVotacion: IVotacion | undefined = this.data.find(elemento =>
      elemento.id == this.miForm.value.id
    )
    if (buscandoIdDeVotacion) {
      this.resultado = true;
      this.estilo = false;
      this.mensaje = 'Votacion No aregada id estan en la BD';
      this.loaders = false;
      setTimeout(() => {
        this.resultado = false;
      }, 3000)
    } else {
      setTimeout(() => {
        this.resultado = true;
        this._votacionServices.addVotacion(this.miForm.value).subscribe(
          {
            next: (value: any) => {
              console.log(value);
              this.estilo = true;
              this.mensaje = 'Votacion agregada';
              this.loaders = false;
              this.miForm.reset();
            },
            error: (error: any) => console.error(error),
            complete: () => console.info("votacion completa")
          }
        );

        setTimeout(() => {
          this.resultado = false;
          this.miForm.reset();
        }, 1000)
      }, 300);
    }
  }
}
