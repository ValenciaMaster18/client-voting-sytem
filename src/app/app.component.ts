import { Component } from '@angular/core';
import { GetAprendizService } from './services/aprendiz/get-aprendiz.service';
import { CandidatoService } from './services/candidato/candidato.service';
import { VotacionService } from './services/Votacion/votacion.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {

  constructor(
    private _getAprendizService: GetAprendizService,
    private _candidatoService: CandidatoService,
    private _votacionService: VotacionService
  ){

  }
  ngOnInit(): void {
    this._getAprendizService.getAprendiz().subscribe(
      () => {
        // console.log(this._getAprendizService.aprendices$)
      }
    )
    this._candidatoService.getCandidato().subscribe(
      () => {
        // console.log(this._candidatoService.candidato$)
      }
    )
    this._votacionService.getVotacion().subscribe(
      () => {
        // console.log(this._votacionService.votacion$)
      }
    )
  }
}
