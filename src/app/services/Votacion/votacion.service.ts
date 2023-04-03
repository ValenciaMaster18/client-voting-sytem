import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IVotacion } from '../../models/ivotacion';
import { RutasVotaciones } from '@environments/admin/rutas-dev';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class VotacionService {
  votacion$ = new BehaviorSubject<IVotacion[]>([]);
  API_URL: string;

  constructor(
    private http: HttpClient
  ) {
    this.API_URL = RutasVotaciones.url;
  }

  getVotacion(): Observable<IVotacion[]> {
    return this.http.get<IVotacion[]>(this.API_URL).pipe(
      tap(response => {
        this.votacion$.next(response)
      })
    );
  }
  addVotacion(nuevaVotacion: IVotacion): Observable<IVotacion[]> {
    return this.http.post<IVotacion[]>(`${this.API_URL}/add`, nuevaVotacion).pipe(
      tap(() => {
        const candidatos = this.votacion$.value;
        candidatos.push(nuevaVotacion);
        this.votacion$.next(candidatos);
      })
    );
  }
  updateEstadoVotacion(id: number, estado: string) {
    return this.http.put(`${this.API_URL}/update/estado/${id}`, { estado }).pipe(
      tap((valor) => {
        this.getVotacion().subscribe()
      })
    );
  }
  deleteVotacion(id: number) {
    return this.http.delete(`${this.API_URL}/delete/${id}`).pipe(
      tap(() => {
        let votaciones = this.votacion$.value;
        votaciones = votaciones.filter(votacion => votacion.id !== id);
        this.votacion$.next(votaciones);
      })
    )
  }
}
