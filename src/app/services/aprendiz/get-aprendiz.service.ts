import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IAprendiz } from '../../models/iaprendiz';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { RutasAprendiz } from '@environments/routes-production';
@Injectable({
  providedIn: 'root'
})
export class GetAprendizService {
  API_URL: string;
  private aprendiz = new BehaviorSubject<IAprendiz[]>([]);
  aprendiz$: Observable<IAprendiz[]> = this.aprendiz.asObservable()
  constructor(
    private http: HttpClient,
  ) {
    this.API_URL = RutasAprendiz.url;
  }

  getAprendiz(page: number, size: number): Observable<IAprendiz[]> {
    return this.http.get<IAprendiz[]>(`${this.API_URL}?page=${page}&size=${size}`).pipe(
      tap(( respuesta ) => this.aprendiz.next(respuesta))
    )
  }
  enviarAprendiz(nuevoAprendiz: IAprendiz) {
    return this.http.post(this.API_URL, nuevoAprendiz)
  }
  enviarAprendizCSV(csvFile: FormData) {
    // Agregar las cabeceras necesarias para enviar un archivo a través de un formulario
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data')
    return this.http.post(`${this.API_URL}/csv`, csvFile, { headers });
  }
  deleteAprendiz(id: string){
    return this.http.delete<any>(`${this.API_URL}/${id}`)
  }
}
