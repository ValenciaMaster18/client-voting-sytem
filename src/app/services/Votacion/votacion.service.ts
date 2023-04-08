import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IVotacion } from '../../models/ivotacion';
import { RutasVotaciones } from '@environments/routes-production';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IEstadisticas } from 'src/app/models/iestadisticas';
@Injectable({
  providedIn: 'root'
})
export class VotacionService {
  API_URL: string;
  estadisticasValida!: Observable<boolean>;
  private votacionSubject = new BehaviorSubject<IVotacion[]>([]);
  votacionEstadisticas = new BehaviorSubject<IEstadisticas>({});

  constructor(
    private http: HttpClient
  ) {
    this.API_URL = RutasVotaciones.url;
  }

  getVotacion(page: number, size: number): Observable<IVotacion[]> {
    return this.http.get<IVotacion[]>(`${this.API_URL}?page=${page}&size=${size}`).pipe(
      tap((votaciones: IVotacion[]) => this.votacionSubject.next(votaciones))
    )
  }
  getEstadisticasVotacion(id: number){
    return this.http.get(`${this.API_URL}/estadisticas/${id}`).pipe(
      tap((estadisticas: any) => this.votacionEstadisticas.next(estadisticas))
    )
  }
  addVotacion(nuevaVotacion: IVotacion): Observable<IVotacion[]> {
    return this.http.post<IVotacion[]>(this.API_URL, nuevaVotacion)
  }
  deleteVotacion(id: number){
    return this.http.delete<any>(`${this.API_URL}/${id}`)
  }
  actualVotacion(id: number){
    const url = `${this.API_URL}/current/${id}`;
    return this.http.put<any>(url, {})
  }
  updateStatusDisableVotacion(id: number): Observable<any> {
    const url = `${this.API_URL}/disable/${id}`;
    return this.http.patch<any>(url, {})
  }
  updateStatusEnableVotacion(id: number): Observable<IVotacion> {
    const url = `${this.API_URL}/enable/${id}`;
    return this.http.patch<any>(url, {})
  }
}
