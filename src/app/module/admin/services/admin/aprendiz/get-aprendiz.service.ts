import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { IAprendiz } from '../../../models/iaprendiz';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { RutasGetAprendiz, RutasPostAprendiz, RutasDeleteAprendiz } from '@environments/admin/rutas-dev';
@Injectable({
  providedIn: 'root'
})
export class GetAprendizService {

  aprendices$ = new BehaviorSubject<IAprendiz[]>([]);

  constructor(
    private http: HttpClient,
  ) {
  }

  getAprendiz(): Observable<IAprendiz[]>{
    return this.http.get<IAprendiz[]>(RutasGetAprendiz.url).pipe(
      tap( response => {
        this.aprendices$.next(response);
      })
    )
  }
  enviarAprendiz(nuevoAprendiz: IAprendiz){
    return this.http.post(RutasPostAprendiz.url, nuevoAprendiz).pipe(
      tap(() => {
        const aprendices = this.aprendices$.value;
        aprendices.push(nuevoAprendiz);
        this.aprendices$.next(aprendices);
      })
    );
  }
  eliminarAprendiz(id: number){
    return this.http.delete(`${RutasDeleteAprendiz.url}${id}`);
  }
}
