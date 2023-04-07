import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RutasCandidato } from '@environments/routes-production';
import { ICandidato } from '../../models/Icandidato';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  API_URL: string;

  constructor(
    private http: HttpClient
  ) {
    this.API_URL = RutasCandidato.url;
   }
  getCandidato(page: number, size: number): Observable<ICandidato[]> {
    return this.http.get<ICandidato[]>(`${this.API_URL}?page=${page}&size=${size}`)
  }
  candidatosVotacionActual(){
    return this.http.get<any>(`${this.API_URL}/current-votacion`);
  }
  addCandidato(candidatoDTO: ICandidato){
    return this.http.post(this.API_URL,  candidatoDTO);
  }

}
