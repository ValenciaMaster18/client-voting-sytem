import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { RutasDeleteCandidato, RutasGetCandidato, RutasPostCandidato } from '@environments/admin/rutas-dev';
import { ICandidato } from '../../../models/Icandidato';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  candidato$ = new BehaviorSubject<ICandidato[] | null>(null);
  constructor(
    private http: HttpClient
  ) {
   }
  getCandidato(): Observable<ICandidato[]> {
    return this.http.get<ICandidato[]>(RutasGetCandidato.url).pipe(
      tap((response => {
        this.candidato$.next(response);
      }))
    );
  }
  addCandidato(candidatoNew: ICandidato): Observable<ICandidato[]> {
    return this.http.post<ICandidato[]>(RutasPostCandidato.url, candidatoNew );
  }
  deleteCandidato(id: number): Observable<ICandidato[]> {
    return this.http.delete<ICandidato[]>(`${RutasDeleteCandidato.url}${id}`);
  }
}
