import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Profesor } from '../models/profesor';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {
  private baseUrl = 'http://localhost:8003/api/profesores';

  constructor(private http: HttpClient) { }

  getAllProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(this.baseUrl);
  }

  getProfesorById(id: number): Observable<Profesor> {
    return this.http.get<Profesor>(`${this.baseUrl}/${id}`);
  }

  createProfesor(profesor: Profesor): Observable<Profesor> {
    return this.http.post<Profesor>(this.baseUrl, profesor);
  }

  updateProfesor(id: number, profesor: Profesor): Observable<Profesor> {
    return this.http.put<Profesor>(`${this.baseUrl}/${id}`, profesor);
  }

  deleteProfesor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      return throwError('Profesor no encontrado.');
    } else if (error.status === 409) {
      const errorMessage = error.error ? error.error : 'No se puede eliminar el profesor porque tiene notas asociadas.';
      return throwError(errorMessage);
    }
    return throwError('Error en el servidor, inténtalo de nuevo más tarde.');
  }

}
