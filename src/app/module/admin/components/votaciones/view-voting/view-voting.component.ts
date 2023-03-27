import { Component, OnInit } from '@angular/core';
import { IVotacion } from '../../../models/ivotacion';
import { VotacionService } from '../../../services/admin/Votacion/votacion.service';

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
   ){
    this.color = false;
    this.data = []
   }
  ngOnInit(): void {
    this._votacionService.votacion$.subscribe(
      {
        next: (valor: any) => {
          this.data = valor;
        },
        error: (error: any ) => {
          console.error(error);
        },
        complete: () => {
          //
        }
      }
    )
  }
  cambiarColor(): void{
    this.color = !this.color;
  }
  eliminarAprendiz(id: number){
    this._votacionService.deleteVotacion(id).subscribe(
      {
        next: () => {
      },
        error: (error: any) => {
          console.error(error)
        },
        complete: () => {
          //
        }
      }
    )
  }
}
