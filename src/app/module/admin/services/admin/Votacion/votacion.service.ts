import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IVotacion } from '../../../models/ivotacion';

@Injectable({
  providedIn: 'root'
})
export class VotacionService {
  votacion: IVotacion[];
  constructor() {
    this.votacion = []
   }

   getVotacion(): Observable<IVotacion[]> {
    return of(this.votacion);
   }
   addVotacion(nuevaVotacion: IVotacion): void {
    this.votacion.push(nuevaVotacion);
   }
}
