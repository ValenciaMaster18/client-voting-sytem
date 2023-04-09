import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { IAprendiz } from '../../../../../models/iaprendiz';
import { GetAprendizService } from '../../../../../services/aprendiz/get-aprendiz.service';
@Component({
  selector: 'app-view-apprentices',
  templateUrl: './view-apprentices.component.html',
  styleUrls: ['./view-apprentices.component.scss']
})
export class ViewApprenticesComponent implements OnInit, OnDestroy {

  valor: any;
  loaders: boolean;
  color: boolean;
  pagina = 0;
  data: IAprendiz[];
  suscribtion: Subscription;
  first: number = 0;
  paginador: number = 1;
  lastFirst: number = 0;
  estadoPaginador: boolean = true;

  constructor(
    private _getAprendizService: GetAprendizService
  ) {
    this.loaders = true;
    this.valor = '';
    this.color = false;
    this.data = [];
    this.suscribtion = new Subscription();
  };


  onPageChange(event: any) {
    this.first = event.first;
    this.suscribtion = this._getAprendizService.getAprendiz(this.first, 9).subscribe(
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
          // console.error(error);
        },
        complete: () => {
          //
        },
      });
  }
  ngOnInit(): void {
    this.suscribtion = this._getAprendizService.getAprendiz(0, 9).pipe(
    ).subscribe({
      next: (valor: any) => {
        this.data = valor.content;
        if (valor.numberOfElements == 9){
          this.paginador++;
        }else{
          this.paginador--
        }
        this.loaders = false;
      },
      error: (error: any) => {
        // console.error(error);
        this.loaders = false;
      },
      complete: () => {
        //
      },
    });

  };
  ngOnDestroy(): void {
    this.suscribtion.unsubscribe();
  };
  cambiarColor(): void {
    this.color = !this.color;
  }
  eliminarAprendiz(id: string): void {
    this._getAprendizService.deleteAprendiz(id).subscribe();
  }
};
