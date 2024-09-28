import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Nota } from '../../models/nota';
import { NotasService } from '../../services/notas.service';
import { Estudiante } from '../../models/estudiante';
import { Profesor } from '../../models/profesor';
import { EstudiantesService } from '../../services/estudiantes.service';
import { ProfesoresService } from '../../services/profesores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './notas.component.html',
  styleUrl: './notas.component.css',
})
export class NotasComponent implements OnInit {
  title: string = "Notas"
  notas: Nota[] = [];
  estudiantes: Estudiante[] = [];
  profesores: Profesor[] = [];

  constructor(
    private notasService: NotasService,
    private estudiantesService: EstudiantesService,
    private profesoresService: ProfesoresService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEstudiantes();
    this.loadProfesores();
    this.getNotas();
  }

  getNotas(): void {
    this.notasService.getAllNotas().subscribe((notas) => {
      this.notas = notas.map((nota) => {
        const estudianteNombre = this.getEstudianteNombre(nota.idEstudiante);
        const profesorNombre = this.getProfesorNombre(nota.idProfesor);

        if (!profesorNombre) {
          console.warn(
            `No se encontró el profesor para el ID: ${nota.idProfesor}`
          );
        }

        return {
          ...nota,
          estudianteNombre,
          profesorNombre: profesorNombre || 'Desconocido', // Para asegurar que no sea undefined
        };
      });
    });
  }

  editNota(id: number): void {
    this.router.navigate([`/notas/editar/${id}`]);
  }

  deleteNota(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.notasService.deleteNota(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Eliminado',
              text: 'La nota ha sido eliminada exitosamente.',
              icon: 'success',
              timer: 3000,
              showConfirmButton: false,
            });
            this.notas = this.notas.filter((nota) => nota.id !== id);
          },
          error: (error) => {
            Swal.fire({
              title: 'Error',
              text: error,
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          },
        });
      }
    });
  }

  loadEstudiantes(): void {
    this.estudiantesService.getAllEstudiantes().subscribe((estudiantes) => {
      this.estudiantes = estudiantes;
    });
  }

  loadProfesores(): void {
    this.profesoresService.getAllProfesores().subscribe((profesores) => {
      this.profesores = profesores;
    });
  }

  getEstudianteNombre(idEstudiante: number): string {
    const estudiante = this.estudiantes.find((est) => est.id === idEstudiante);
    return estudiante ? estudiante.nombre : 'Desconocido';
  }

  getProfesorNombre(idProfesor: number): string {
    const profesor = this.profesores.find((prof) => prof.id === idProfesor);
    return profesor ? profesor.nombre : 'Desconocido';
  }
}
