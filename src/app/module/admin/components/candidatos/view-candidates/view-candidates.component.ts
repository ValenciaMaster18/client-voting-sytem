import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICandidato } from '../../../../../models/Icandidato';
import { CandidatoService } from '../../../../../services/candidato/candidato.service';

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
    this.suscription = this._candidatoServices.getCandidato(0,9).subscribe(
      {
        next: (value: any) => {
          this.data = value.content
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
