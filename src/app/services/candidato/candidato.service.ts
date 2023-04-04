import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { RutasCandidato } from '@environments/routes-production';
import { ICandidato } from '../../models/Icandidato';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  API_URL: string;

  candidato$ = new BehaviorSubject<FormData[]>([]);
  constructor(
    private http: HttpClient
  ) {
    this.API_URL = RutasCandidato.url;
   }
  getCandidato(): Observable<FormData[]> {
    return this.http.get<FormData[]>(this.API_URL).pipe(
      tap((response => {
        this.candidato$.next(response);
      }))
    );
  }
  addCandidato(candidatoNew: FormData): Observable<ICandidato[]> {
    return this.http.post<ICandidato[]>(this.API_URL, candidatoNew ).pipe(
      tap(() => {
        const candidatos = this.candidato$.value;
        candidatos.push(candidatoNew);
        this.candidato$.next(candidatos);
      })
    );
  }
  // deleteCandidato(id: number): Observable<ICandidato[]> {
  //   return this.http.delete<ICandidato[]>(`${this.API_URL}/delete/${id}`).pipe(
  //     tap(() => {
  //       let candidatos = this.candidato$.value;
  //       candidatos = candidatos.filter( candidato => candidato.id !== id)
  //       this.candidato$.next(candidatos);
  //     })
  //   );
  // }
}
