import { Component, OnInit } from '@angular/core';
import { ICandidato } from 'src/app/models/Icandidato';
import { IAprendiz } from 'src/app/models/iaprendiz';
import { IVotacion } from 'src/app/models/ivotacion';
import { VotacionService } from 'src/app/services/Votacion/votacion.service';
import { GetAprendizService } from 'src/app/services/aprendiz/get-aprendiz.service';
import { CandidatoService } from 'src/app/services/candidato/candidato.service';

@Component({
  selector: 'app-votacion-aprendiz',
  templateUrl: './votacion-aprendiz.component.html',
  styleUrls: ['./votacion-aprendiz.component.scss']
})
export class VotacionAprendizComponent implements OnInit {
  candidatos$: ICandidato[];
  votaciones$: IVotacion[];
  aprendices$: IAprendiz[];
  constructor(
    private _candidatoService: CandidatoService,
    private _votacionService: VotacionService,
    private _aprendizService: GetAprendizService,

  ){
    this.candidatos$ = []
    this.votaciones$ = []
    this.aprendices$ = []

  }
  ngOnInit(): void {
    this._candidatoService.candidato$.subscribe(
      {
        next: (value: ICandidato[]) => {
          this.candidatos$ = value;
         }
      }
    )
    this._votacionService.votacion$.subscribe(
      {
        next: (value: IVotacion[]) => {
          this.votaciones$ = value;
        }
      }
    )
    this._aprendizService.aprendices$.subscribe(
      {
        next: (value: IAprendiz[]) => {
          this.aprendices$ = value;
        }
      }
    )
  }

}
