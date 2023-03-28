import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IVotacion } from '../../../models/ivotacion';
import { RutasDeleteVotaciones, RutasGetVotaciones, RutasPostVotaciones, RutasPutVotaciones } from '@environments/admin/rutas-dev';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class VotacionService {
  votacion$ = new BehaviorSubject<IVotacion[]>([]);

  constructor(
    private http: HttpClient
  ) {
  }

  getVotacion(): Observable<IVotacion[]> {
    return this.http.get<IVotacion[]>(RutasGetVotaciones.url).pipe(
      tap(response => {
        this.votacion$.next(response)
      })
    );
  }
  addVotacion(nuevaVotacion: IVotacion): Observable<IVotacion[]> {
    return this.http.post<IVotacion[]>(RutasPostVotaciones.url, nuevaVotacion).pipe(
      tap(() => {
        const candidatos = this.votacion$.value;
        candidatos.push(nuevaVotacion);
        this.votacion$.next(candidatos);
      })
    );
  }
  updateEstadoVotacion(id: number, estado: string) {
    return this.http.put(`${RutasPutVotaciones.url}${id}`, { estado }).pipe(
      tap((valor) => {
        this.getVotacion().subscribe()
      })
    );
  }
  deleteVotacion(id: number) {
    return this.http.delete(`${RutasDeleteVotaciones.url}${id}`).pipe(
      tap(() => {
        let votaciones = this.votacion$.value;
        votaciones = votaciones.filter(votacion => votacion.id !== id);
        this.votacion$.next(votaciones);
      })
    )
  }
}
