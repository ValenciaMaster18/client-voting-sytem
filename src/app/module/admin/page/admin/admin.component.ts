import { Component, OnInit } from '@angular/core';
import { GetAprendizService } from '../../services/admin/aprendiz/get-aprendiz.service';
import { CandidatoService } from '../../services/admin/candidato/candidato.service';
import { VotacionService } from '../../services/admin/Votacion/votacion.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  cont: number = 1;
  constructor(
    private _getAprendizService: GetAprendizService,
    private _candidatoService: CandidatoService,
    private _votacionService: VotacionService
  ){

  }
  ngOnInit(): void {
    // this.cont++;
    // this._getAprendizService.getAprendiz().subscribe()
    // this._candidatoService.getCandidato().subscribe()
    // this._votacionService.getVotacion().subscribe()
    // console.log(this.cont)
  }
}
