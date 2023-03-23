import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RutasDeleteCandidato, RutasGetCandidato, RutasPostCandidato } from '../../../environments/rutas-dev';
import { ICandidato } from '../../../models/Icandidato';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  constructor(
    private http: HttpClient
  ) {
   }
  getCandidato(): Observable<ICandidato[]> {
    return this.http.get<ICandidato[]>(RutasGetCandidato.url);
  }
  addCandidato(candidatoNew: ICandidato): Observable<ICandidato[]> {
    return this.http.post<ICandidato[]>(RutasPostCandidato.url, candidatoNew );
  }
  deleteCandidato(id: number): Observable<ICandidato[]> {
    return this.http.delete<ICandidato[]>(`${RutasDeleteCandidato.url}${id}`);
  }
}
