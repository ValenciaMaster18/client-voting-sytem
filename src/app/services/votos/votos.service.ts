import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RutasVotos } from '@environments/routes-production';

@Injectable({
  providedIn: 'root'
})
export class VotosService {

  API_URL: string;
  estado: boolean = false;
  constructor(
    private http: HttpClient
  ) {
    this.API_URL = RutasVotos.url;
  }

  getEstadoVotoAprendiz(idAprendiz: string){
    return this.http.get(`${this.API_URL}/has-already-vote/${idAprendiz}`)
  }
  enviarVoto(idCandidato: number){
    return this.http.post(`${this.API_URL}/vote-by/${idCandidato}`,{})
  }
}
