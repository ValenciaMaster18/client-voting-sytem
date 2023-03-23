import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IAprendiz } from '../../../models/iaprendiz';
import { Observable } from 'rxjs';
import { RutasGetAprendiz, RutasPostAprendiz, RutasDeleteAprendiz } from '../../../environments/rutas-dev';
@Injectable({
  providedIn: 'root'
})
export class GetAprendizService {

  constructor(
    private http: HttpClient,
  ) {
    // ../../../../assets/json/data.json
  }

  getAprendiz(): Observable<IAprendiz[]>{
    return this.http.get<IAprendiz[]>(RutasGetAprendiz.url);
  }
  enviarAprendiz(nuevoAprendiz: IAprendiz){
    return this.http.post(RutasPostAprendiz.url, nuevoAprendiz);
  }
  eliminarAprendiz(id: number){
    return this.http.delete(`${RutasDeleteAprendiz.url}${id}`)
  }
}
