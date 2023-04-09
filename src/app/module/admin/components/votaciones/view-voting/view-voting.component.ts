import { Component, OnInit } from '@angular/core';
import { IVotacion } from '../../../../../models/ivotacion';
import { VotacionService } from '../../../../../services/Votacion/votacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-voting',
  templateUrl: './view-voting.component.html',
  styleUrls: [
    '../../../../../../assets/css/tablas.scss'
  ]
})
export class ViewVotingComponent implements OnInit {
  data: IVotacion[];
  color: boolean;
  resultado: boolean = false;
  mensaje!: string;
  first: number = 0;
  paginador: number = 1;
  lastFirst: number = 0;
  estadoPaginador: boolean = true;

  constructor(
    private _votacionService: VotacionService,
    private router: Router
  ) {
    this.color = false;
    this.data = []
  }
  onPageChange(event: any) {
    this.first = event.first;
    this._votacionService.getVotacion(this.first, 6).subscribe(
      {
        next: (valor: any) => {
          this.data = valor.content;
          if (event.first > this.lastFirst && valor.numberOfElements == 6) {
            console.log('Se hizo click en el botón de avanzar.');
            this.paginador++;
          } else if (
            event.first < this.lastFirst &&
            valor.numberOfElements == 6 &&
            this.estadoPaginador
            ) {
            console.log('Se hizo click en el botón de retroceder.');
            this.paginador--;
          }
          if(this.paginador == 1){
            this.paginador++;
          }
          if (valor.numberOfElements < 6){
            this.estadoPaginador = false;
          }else{
            this.estadoPaginador = true;
          }

          this.lastFirst = event.first;
        },
        error: (error: any) => {
          // console.error(error);
        },
        complete: () => {
          //
        },
      });
  }
  ngOnInit(): void {
    this._votacionService.getVotacion(0, 6).subscribe(
      {
        next: (valor: any) => {
          this.data = valor.content
          if (valor.numberOfElements == 6){
            this.paginador++;
          }else{
            this.paginador--;
          }
        },
        error: (error: any) => {
          // console.error(error);
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
    this._votacionService.getEstadisticasVotacion(id).subscribe({
      next: () => {
        this.router.navigate(['admin/votacion/estadisticas'])
      },
      error: () => {
        this.mensaje = "Esta votacion no ha sido activada para ninguna votacion. No hay estadisticas disponibles"
        this.resultado = true
        setTimeout(() => {
          this.resultado = false
        }, 7000)
      },
      complete: () => {

      }
    })
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
