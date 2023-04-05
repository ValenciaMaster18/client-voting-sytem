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
   ){
    this.color = false;
    this.data = []
   }
  ngOnInit(): void {
    this._votacionService.getVotacion(0,6).subscribe(
      {
        next: (valor: any) => {
          this.data = valor.content
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
  // actualizarEstadoAprendiz(id: number, modo: string){
  //   switch(modo){
  //     case 'ABIERTA':
  //       modo = 'CERRADA';
  //       break;
  //     case 'CERRADA':
  //       modo = 'ABIERTA';
  //       break;
  //   }
  //   this._votacionService.updateEstadoVotacion(id, modo).subscribe();
  // }
  // eliminarAprendiz(id: number){
  //   this._votacionService.deleteVotacion(id).subscribe(
  //     {
  //       next: () => {
  //     },
  //       error: (error: any) => {
  //         console.error(error)
  //       },
  //       complete: () => {
  //         //
  //       }
  //     }
  //   )
  // }
}
