import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { IVotacion } from '../../models/ivotacion';
import { RutasVotaciones } from '@environments/routes-production';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class VotacionService {
  API_URL: string;

  constructor(
    private http: HttpClient
  ) {
    this.API_URL = RutasVotaciones.url;
  }

  getVotacion(page: number, size: number): Observable<IVotacion[]> {
    return this.http.get<IVotacion[]>(`${this.API_URL}?page=${page}&size=${size}`)
  }
  addVotacion(nuevaVotacion: IVotacion): Observable<IVotacion[]> {
    return this.http.post<IVotacion[]>(this.API_URL, nuevaVotacion)
  }
  // updateEstadoVotacion(id: number, estado: string) {
  //   return this.http.put(`${this.API_URL}/update/estado/${id}`, { estado }).pipe(
  //     tap((valor) => {
  //       this.getVotacion().subscribe()
  //     })
  //   );
  // }
  // deleteVotacion(id: number) {
  //   return this.http.delete(`${this.API_URL}/delete/${id}`).pipe(
  //     tap(() => {
  //       let votaciones = this.votacion$.value;
  //       votaciones = votaciones.filter(votacion => votacion.id !== id);
  //       this.votacion$.next(votaciones);
  //     })
  //   )
  // }
}
