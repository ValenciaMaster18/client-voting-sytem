import { Component, OnInit } from '@angular/core';
import { GetAprendizService } from '../../services/admin/aprendiz/get-aprendiz.service';
import { CandidatoService } from '../../services/admin/candidato/candidato.service';
import { VotacionService } from '../../services/admin/Votacion/votacion.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  constructor(
    private _getAprendizService: GetAprendizService,
    private _candidatoService: CandidatoService,
    private _votacionService: VotacionService
  ){

  }
  ngOnInit(): void {
    this._getAprendizService.getAprendiz().subscribe(
      () => {
        console.log(this._getAprendizService.aprendices$)
      }
    )
    this._candidatoService.getCandidato().subscribe(
      () => {
        console.log(this._candidatoService.candidato$)
      }
    )
    this._votacionService.getVotacion().subscribe(
      () => {
        console.log(this._votacionService.votacion$)
      }
    )
  }
}
