import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
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
  getCandidato(page: number, size: number): Observable<FormData[]> {
    return this.http.get<FormData[]>(`${this.API_URL}?page=${page}&size=${size}`)
  }
  addCandidato(candidatoNew: FormData): Observable<ICandidato[]> {
    return this.http.post<ICandidato[]>(this.API_URL, candidatoNew )
  }
}
