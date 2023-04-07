import { Component, OnInit } from '@angular/core';
import { GetAprendizService } from '../../../../services/aprendiz/get-aprendiz.service';
import { CandidatoService } from '../../../../services/candidato/candidato.service';
import { VotacionService } from '../../../../services/Votacion/votacion.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(
    private _getAprendizService: GetAprendizService,
    private _candidatoService: CandidatoService,
    private _votacionService: VotacionService
  ){

  }
  ngOnInit(): void {
    this._getAprendizService.getAprendiz(0, 9).subscribe()
    this._candidatoService.getCandidato(0, 9).subscribe()
    this._votacionService.getVotacion(0, 6).subscribe()
  }
}
