import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Estudiante } from '../models/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {
  private baseUrl = 'http://localhost:8003/api/estudiantes';

  constructor(private http: HttpClient) { }

  getAllEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.baseUrl);
  }

  getEstudianteById(id: number): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.baseUrl}/${id}`);
  }

  createEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(this.baseUrl, estudiante);
  }

  updateEstudiante(id: number, estudiante: Estudiante): Observable<Estudiante> {
    return this.http.put<Estudiante>(`${this.baseUrl}/${id}`, estudiante);
  }

  deleteEstudiante(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      return throwError('Estudiante no encontrado.');
    } else if (error.status === 409) {
      const errorMessage = error.error ? error.error : 'No se puede eliminar el estudiante porque tiene notas asociadas.';
      return throwError(errorMessage);
    }
    return throwError('Error en el servidor, inténtalo de nuevo más tarde.');
  }

}
