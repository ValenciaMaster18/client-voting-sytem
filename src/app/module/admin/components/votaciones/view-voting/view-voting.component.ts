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
  valor: any;
  constructor(
    private _votacionService: VotacionService
   ){
    this.valor = '';
    this.color = false;
    this.data = []
   }
  ngOnInit(): void {
    this._votacionService.getVotacion().subscribe(
      {
        next: (valor: any) => {
          this.data = valor;
        },
        error: (error: any ) => {
          console.error(error);
        },
        complete: () => {
          console.log("Operacion completada")
        }
      }
    )
  }
  cambiarColor(): void{
    this.color = !this.color;
  }
}
