import { Component, OnDestroy, OnInit } from '@angular/core';
// import { GetAprendizService } from '../../../services/get-aprendiz.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { delay, Subscription } from 'rxjs';
import { IAprendiz } from '../../../models/iaprendiz';
import { IVotacion } from '../../../models/ivotacion';
import { GetAprendizService } from '../../../services/admin/aprendiz/get-aprendiz.service';
import { CandidatoService } from '../../../services/admin/candidato/candidato.service';
import { VotacionService } from '../../../services/admin/Votacion/votacion.service';
@Component({
  selector: 'app-add-candidates',
  templateUrl: './add-candidates.component.html',
  styleUrls: ['./add-candidates.component.scss']
})
export class AddCandidatesComponent implements OnInit, OnDestroy {
  miForm: FormGroup;

  mensaje: string;
  resultado: boolean;
  votacion: boolean;
  estilo: boolean;
  loaders: boolean;

  data$ = this._getAprendizService.aprendices$;
  votaciones: IVotacion[];

  suscription: Subscription;
  constructor(
    private controles: FormBuilder,
    private _getAprendizService: GetAprendizService,
    private _candidatoServices: CandidatoService,
    private _votacionService: VotacionService
  ) {
    this.mensaje = '';
    this.estilo = false;
    this.resultado = false;
    this.loaders = false;
    this.loaders = false;
    this.votacion = false;
    this.votaciones = [];
    this.suscription = new Subscription();

    this.miForm = this.controles.group({
      id: [''],
      idAprendiz: ['', [Validators.required]],
      img: ['', [Validators.required]],
      votacion: ['', [Validators.required]],
      propuesta: ['', [Validators.required]],
      fecha: ['']
    })
  }

  ngOnInit(): void {
    this.suscription = this._votacionService.votacion$.subscribe(
      {
        next: (votacion: any) => {
          this.votaciones = votacion;
        },
        error: (error: any) => {
          console.error(error);
        },
        complete: () => {
          //
        },
      });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  onSubmit(): void {
    this.miForm.value.id = this._candidatoServices.candidato$.value.length + 1;
    this.miForm.value.fecha = Date();
    this.votacion = false;
    this.loaders = true;
    const buscandoIdDeAprendiz = this.data$.value.find(data => data.id == this.miForm.value.idAprendiz)
    this._candidatoServices.candidato$.subscribe(
      (valor) => {
        const candidato = valor.filter( cand =>
          cand.idAprendiz == buscandoIdDeAprendiz!.id && cand.votacion == this.miForm.value.votacion
           )
           if (candidato.length === 0){
              this.votacion = true;
           }
          }
          )
    if (buscandoIdDeAprendiz && this.votacion) {
      this._candidatoServices.addCandidato(this.miForm.value).pipe(
        delay(1000)
      ).subscribe(
        {
          next: () => {
            this.loaders = false;
            this.mensaje = 'Candidato Agregado';
            this.resultado = true;
            this.estilo = true;
            this.miForm.reset()
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
    } else {
      this.loaders = false;
      if (!buscandoIdDeAprendiz){
        this.mensaje = 'Candidato No agregado el id no esta en la BD';
      }else{
        this.mensaje = 'El id ya tiene esta votacion agregada';
      }
      this.estilo = false;
      this.resultado = true;
      setTimeout(() => {
        this.resultado = false;
      }, 4000)
    }
  }
}
