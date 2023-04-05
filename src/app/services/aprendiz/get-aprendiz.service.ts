import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAprendiz } from '../../models/iaprendiz';
import { Observable } from 'rxjs';
import { RutasAprendiz } from '@environments/routes-production';
@Injectable({
  providedIn: 'root'
})
export class GetAprendizService {
  API_URL: string;

  constructor(
    private http: HttpClient,
  ) {
    this.API_URL = RutasAprendiz.url;
  }

  getAprendiz(page: number, size: number): Observable<IAprendiz[]> {
    return this.http.get<IAprendiz[]>(`${this.API_URL}?page=${page}&size=${size}`)
  }
  enviarAprendiz(nuevoAprendiz: IAprendiz) {
    return this.http.post(this.API_URL, nuevoAprendiz)
  }
  enviarAprendizCSV(csv: FormData) {
    return this.http.post(`${this.API_URL}`, csv);
  }
}
