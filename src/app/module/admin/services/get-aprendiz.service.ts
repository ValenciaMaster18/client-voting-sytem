import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAprendiz } from '../models/iaprendiz';
import { Observable } from 'rxjs';
import { RutasGetAprendiz, RutasGetAprendizLocal } from '../environments/rutas-dev';
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

}
