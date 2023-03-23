import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IVotacion } from '../../../models/ivotacion';
import { RutasDeleteVotaciones, RutasGetVotaciones, RutasPostVotaciones } from '../../../environments/rutas-dev';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class VotacionService {
  constructor(
    private http : HttpClient
  ) {
   }

   getVotacion(): Observable<IVotacion[]> {
    return this.http.get<IVotacion[]>(RutasGetVotaciones.url);
   }
   addVotacion(nuevaVotacion: IVotacion): Observable<IVotacion[]> {
    return this.http.post<IVotacion[]>(RutasPostVotaciones.url, nuevaVotacion);
   }
   deleteVotacion(id: number){
    return this.http.delete(`${RutasDeleteVotaciones.url}${id}`)
  }
}
