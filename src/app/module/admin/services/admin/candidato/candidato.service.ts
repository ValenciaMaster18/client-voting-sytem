import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICandidato } from '../../../models/Icandidato';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {
  private candidatos: ICandidato[];

  constructor() {
    this.candidatos = []
   }
  getCandidato(): Observable<ICandidato[]> {
    return of(this.candidatos);
  }
  addCandidato(candidatoNew: ICandidato): void {
    this.candidatos.push(candidatoNew);
  }
}
