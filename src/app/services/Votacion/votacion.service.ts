import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  getEstadisticasVotacion(id: number){
    return this.http.get(`${this.API_URL}/estadisticas/${id}`)
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
