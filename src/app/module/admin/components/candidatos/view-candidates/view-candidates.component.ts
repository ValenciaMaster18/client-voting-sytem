import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICandidato } from '../../../models/Icandidato';
import { CandidatoService } from '../../../services/admin/candidato/candidato.service';

@Component({
  selector: 'app-view-candidates',
  templateUrl: './view-candidates.component.html',
  styleUrls: ['./view-candidates.component.scss']
})
export class ViewCandidatesComponent implements OnInit, OnDestroy {
  data: ICandidato[];
  color: boolean;
  valor: any;
  suscription: Subscription;

  constructor(
    private _candidatoServices: CandidatoService
  ){
    this.data = [];
    this.valor = '';
    this.color = false;
    this.suscription = new Subscription();
  }

  ngOnInit(): void {
    this.suscription = this._candidatoServices.getCandidato().subscribe(
      {
        next: (value: any) => {
          this.data = value
        },
        error: (error: any) => {
          console.error(error)
        },
        complete: () => {
          console.log("Hemos terminado candidato")
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  };
  cambiarColor(): void{
    this.color = !this.color;
  }
  eliminarAprendiz(id: number){
    this._candidatoServices.deleteCandidato(id).subscribe(
      {
        next: () => {
          console.log("Eliminado");
          this.ngOnInit();
      },
        error: (error: any) => console.error(error),
        complete: () => console.info("votacion completa")
      }
    )
  }
};
