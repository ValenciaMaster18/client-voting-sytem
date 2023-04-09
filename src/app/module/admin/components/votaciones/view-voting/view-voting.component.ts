import { Component, OnInit } from '@angular/core';
import { IVotacion } from '../../../../../models/ivotacion';
import { VotacionService } from '../../../../../services/Votacion/votacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-voting',
  templateUrl: './view-voting.component.html',
  styleUrls: ['./view-voting.component.scss']
})
export class ViewVotingComponent implements OnInit {
  data: IVotacion[];
  color: boolean;
  resultado: boolean = false;
  mensaje!: string;
  first: number = 0;

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
        },
        error: (error: any) => {
          console.error(error);
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
