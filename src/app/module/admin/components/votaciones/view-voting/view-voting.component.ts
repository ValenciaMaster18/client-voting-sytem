import { Component, OnInit } from '@angular/core';
import { IVotacion } from '../../../../../models/ivotacion';
import { VotacionService } from '../../../../../services/Votacion/votacion.service';

@Component({
  selector: 'app-view-voting',
  templateUrl: './view-voting.component.html',
  styleUrls: ['./view-voting.component.scss']
})
export class ViewVotingComponent implements OnInit {
  data: IVotacion[];
  color: boolean;

  constructor(
    private _votacionService: VotacionService
  ) {
    this.color = false;
    this.data = []
  }
  ngOnInit(): void {
    this._votacionService.getVotacion(0, 6).subscribe(
      {
        next: (valor: any) => {
          this.data = valor.content
        },
        error: (error: any) => {
          console.error(error);
        },
        complete: () => {
          //
        }
      }
    )
  }
  
  cambiarColor(): void {
    this.color = !this.color;
  }
  verEstadisticas(id: number){
    this._votacionService.getEstadisticasVotacion(id).subscribe((valor) => console.log(valor))
  }
  updateStatusDisableVotaciones(id: number) {
    this._votacionService.updateStatusDisableVotacion(id).subscribe((valor) => this.ngOnInit())
  }
  updateStatusEnableVotaciones(id: number) {
    this._votacionService.updateStatusEnableVotacion(id).subscribe((valor) => this.ngOnInit())
  }
  eliminarAprendiz(id: number) {
    this._votacionService.deleteVotacion(id).subscribe((valor) => console.log(valor))
  }
  actualVotacion(id: number){
    this._votacionService.actualVotacion(id).subscribe((valor: IVotacion) => {
    })
  }
}
