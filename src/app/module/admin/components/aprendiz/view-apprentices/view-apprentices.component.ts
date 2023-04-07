import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay  } from 'rxjs';
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

  constructor(
    private _getAprendizService: GetAprendizService
  ) {
    this.loaders = true;
    this.valor = '';
    this.color = false;
    this.data = [];
    this.suscribtion = new Subscription();
  };
  ngOnInit(): void {
    this.suscribtion = this._getAprendizService.getAprendiz(this.pagina,9).pipe(
    ).subscribe({
      next: (valor: any) => {
        this.data = valor.content;
        this.loaders = false;
      },
      error: (error: any) => {
        console.error(error);
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
  cambiarColor(): void{
    this.color = !this.color;
  }
  eliminarAprendiz(id: string): void{
    this._getAprendizService.deleteAprendiz(id).subscribe();
  }
};
