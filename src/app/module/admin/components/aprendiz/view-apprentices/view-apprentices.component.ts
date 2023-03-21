import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay  } from 'rxjs';
import { IAprendiz } from '../../../models/iaprendiz';
import { GetAprendizService } from '../../../services/admin/aprendiz/get-aprendiz.service';
@Component({
  selector: 'app-view-apprentices',
  templateUrl: './view-apprentices.component.html',
  styleUrls: ['./view-apprentices.component.scss']
})
export class ViewApprenticesComponent implements OnInit, OnDestroy {
  valor: any;
  loaders: boolean;
  data: IAprendiz[];
  suscribtion: Subscription;
  constructor(
    private _getAprendizService: GetAprendizService
  ) {
    this.loaders = true;
    this.valor = '';
    this.data = [];
    this.suscribtion = new Subscription();
  };
  ngOnInit(): void {
    this.suscribtion = this._getAprendizService.getAprendiz().pipe(
      delay(1000) // retraso de un segundo
    ).subscribe({
      next: (valor: IAprendiz[] ) => {
        this.data = valor;
        this.loaders = false
      },
      error: (error: any) => {
        console.error(error);
        this.loaders = false;
       },
      complete: () => { console.error("Opereracion terminada") },
    });

  };
  ngOnDestroy(): void {
    this.suscribtion.unsubscribe();
  };
};
