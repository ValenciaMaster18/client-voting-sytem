import { Component, OnInit } from '@angular/core';
// import { GetAprendizService } from '../../../services/get-aprendiz.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { delay } from 'rxjs';
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
export class AddCandidatesComponent implements OnInit {
  // Propiedades
  miForm: FormGroup;
  mensaje: string;
  resultado: boolean;
  estilo: boolean;
  loaders: boolean;
  votaciones: IVotacion[];
  aprendiz: IAprendiz[];
  constructor(
    private controles: FormBuilder,
    private _getAprendizService: GetAprendizService,
    private _candidatoServices: CandidatoService,
    private _votacionService: VotacionService
  ) {
    this.votaciones = [];
    this.aprendiz = [];
    this.mensaje = '';
    this.estilo = false;
    this.resultado = false;
    this.loaders = false;
    this.miForm = this.controles.group({
      id: ['', [Validators.required]],
      img: ['', [Validators.required]],
      votacion: ['', [Validators.required]],
      propuesta: ['', [Validators.required]]
    })
  }
  ngOnInit(): void {
    this._votacionService.getVotacion().subscribe(
      {
        next: (valor: any) => {
          this.votaciones = valor;
        },
        error: (error: any) => {
          console.error(error);
        },
        complete: () => { console.error("1") },
      });
  }
  onSubmit(): void {
    this.loaders = true;
    this._getAprendizService.getAprendiz().pipe(
      delay(300)
    ).subscribe(
      {
        next: (valor: any) => {
          this.aprendiz = valor;
          const buscandoIdDeAprendiz = this.aprendiz.find(
            data => data.id == this.miForm.value.id
          )
          if (buscandoIdDeAprendiz) {
            this.mensaje = 'Candidato Agregado';
            this.resultado = true;
            this.estilo = true;
            this.loaders = false;
            this._candidatoServices.addCandidato(this.miForm.value);
            this.miForm.reset()
            setTimeout(() => {
              this.resultado = false;
            }, 1000)
          } else {
            this.mensaje = 'Candidato No agregado el id no esta en la BD';
            this.resultado = true;
            this.estilo = false;
            this.loaders = false;
            this.miForm.reset()
            setTimeout(() => {
              this.resultado = false;
            }, 1000)
          }
        },
        error: (error: any) => {
          console.error(error);
        },
        complete: () => { console.error("2") },
      });
  }
}
