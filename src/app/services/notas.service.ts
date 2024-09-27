import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nota } from '../models/nota';

@Injectable({
  providedIn: 'root'
})
export class NotasService {
  private baseUrl = 'http://localhost:8003/api/notas';

  constructor(private http: HttpClient) { }

  getAllNotas(): Observable<Nota[]> {
    return this.http.get<Nota[]>(this.baseUrl);
  }

  getNotaById(id: number): Observable<Nota> {
    return this.http.get<Nota>(`${this.baseUrl}/${id}`);
  }

  createNota(nota: Nota): Observable<Nota> {
    return this.http.post<Nota>(this.baseUrl, nota);
  }

  updateNota(id: number, nota: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, nota);
  }

  deleteNota(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
