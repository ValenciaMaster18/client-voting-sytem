import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAprendiz } from '../../models/iaprendiz';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { RutasAprendiz } from '@environments/admin/rutas-dev';
@Injectable({
  providedIn: 'root'
})
export class GetAprendizService {
  API_URL: string;
  aprendices$ = new BehaviorSubject<IAprendiz[]>([]);

  constructor(
    private http: HttpClient,
  ) {
    this.API_URL = RutasAprendiz.url;
  }

  getAprendiz(): Observable<IAprendiz[]> {
    return this.http.get<IAprendiz[]>(this.API_URL).pipe(
      tap(response => {
        this.aprendices$.next(response);
      })
    )
  }
  enviarAprendiz(nuevoAprendiz: IAprendiz) {
    return this.http.post(`${this.API_URL}/add`, nuevoAprendiz).pipe(
      tap(() => {
        const aprendices = this.aprendices$.value;
        aprendices.push(nuevoAprendiz);
        this.aprendices$.next(aprendices);
      })
    );
  }
  eliminarAprendiz(id: number) {
    return this.http.delete(`${this.API_URL}/delete/${id}`).pipe(
      tap(() => {
        let aprendices = this.aprendices$.value;
        aprendices = aprendices.filter(aprendiz => aprendiz.id !== id);
        this.aprendices$.next(aprendices);
      })
    );
  }
}
