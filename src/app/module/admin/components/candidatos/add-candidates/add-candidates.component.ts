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
    this.votaciones = [];
    this.suscription = new Subscription();

    this.miForm = this.controles.group({
      id: ['', [Validators.required]],
      img: ['', [Validators.required]],
      votacion: ['', [Validators.required]],
      propuesta: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.suscription = this._votacionService.getVotacion().subscribe(
      {
        next: (valor: any) => {
          this.votaciones = valor;
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
    this.loaders = true;
    const buscandoIdDeAprendiz = this.data$.value.find(data => data.id == this.miForm.value.id)
    if (buscandoIdDeAprendiz) {
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
    } else {
      this.loaders = false;
      this.mensaje = 'Candidato No agregado el id no esta en la BD';
      this.estilo = false;
      this.resultado = true;
      setTimeout(() => {
        this.resultado = false;
      }, 3000)
    }
  }
}
