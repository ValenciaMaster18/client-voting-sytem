import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IAprendiz } from '../../../models/iaprendiz';
import { GetAprendizService } from '../../../services/get-aprendiz.service';
@Component({
  selector: 'app-view-apprentices',
  templateUrl: './view-apprentices.component.html',
  styleUrls: ['./view-apprentices.component.scss']
})
export class ViewApprenticesComponent implements OnInit, OnDestroy {
  valor: any;
  data: IAprendiz[];
  suscribtion: Subscription;
  constructor(
    private __getAprendizService: GetAprendizService
  ) {
    this.valor = '';
    this.data = [];
    this.suscribtion = new Subscription();
  };
  ngOnInit(): void {
    this.suscribtion = this.__getAprendizService.getAprendiz().subscribe(
      { next: (valor: IAprendiz[] ) => { this.data = valor },
        error: (error: any) => { console.error(error) },
        complete: () => { console.error("Opereracion terminada") },
      }
    );
  };
  ngOnDestroy(): void {
    this.suscribtion.unsubscribe();
  };
};
