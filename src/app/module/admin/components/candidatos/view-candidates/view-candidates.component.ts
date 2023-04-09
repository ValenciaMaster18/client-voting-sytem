import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICandidato } from '../../../../../models/Icandidato';
import { CandidatoService } from '../../../../../services/candidato/candidato.service';

@Component({
  selector: 'app-view-candidates',
  templateUrl: './view-candidates.component.html',
  styleUrls: [
    '../../../../../../assets/css/barra-busqueda.scss',
    '../../../../../../assets/css/tablas.scss'
  ]
})
export class ViewCandidatesComponent implements OnInit, OnDestroy {
  data: ICandidato[];
  color: boolean;
  valor: any;
  first: number = 0;
  paginador: number = 1;
  lastFirst: number = 0;
  estadoPaginador: boolean = true;

  suscription: Subscription;

  constructor(
    private _candidatoServices: CandidatoService
  ){
    this.data = [];
    this.valor = '';
    this.color = false;
    this.suscription = new Subscription();
  }
  onPageChange(event: any) {
    this.first = event.first;
    this.suscription = this._candidatoServices.getCandidato(this.first, 9).subscribe(
      {
        next: (valor: any) => {
          this.data = valor.content;
          if (event.first > this.lastFirst && valor.numberOfElements == 9) {
            console.log('Se hizo click en el botón de avanzar.');
            this.paginador++;
          } else if (
            event.first < this.lastFirst &&
            valor.numberOfElements == 9 &&
            this.estadoPaginador
            ) {
            console.log('Se hizo click en el botón de retroceder.');
            this.paginador--;
          }
          if(this.paginador == 1){
            this.paginador++;
          }
          if (valor.numberOfElements < 9){
            this.estadoPaginador = false;
          }else{
            this.estadoPaginador = true;
          }

          this.lastFirst = event.first;
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
    this.suscription = this._candidatoServices.getCandidato(0,9).subscribe(
      {
        next: (value: any) => {
          this.data = value.content
          if (value.numberOfElements == 9){
            this.paginador++;
          }else{
            this.paginador--
          }
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

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  };
  cambiarColor(): void{
    this.color = !this.color;
  }
};
