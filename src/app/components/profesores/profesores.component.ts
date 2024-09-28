import { Component } from '@angular/core';
import { Profesor } from '../../models/profesor';
import { ProfesoresService } from '../../services/profesores.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profesores',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profesores.component.html',
  styleUrl: './profesores.component.css',
})
export class ProfesoresComponent {
  title: string = "Profesores";
  profesores: Profesor[] = [];

  constructor(
    private profesoresService: ProfesoresService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProfesores();
  }

  getProfesores(): void {
    this.profesoresService.getAllProfesores().subscribe((profesores) => {
      this.profesores = profesores;
    });
  }

  editProfesor(id: number): void {
    this.router.navigate([`/profesores/editar/${id}`]);
  }

  deleteProfesor(id: number): void {
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
        this.profesoresService.deleteProfesor(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Eliminado',
              text: 'El profesor ha sido eliminado exitosamente.',
              icon: 'success',
              timer: 3000,
              showConfirmButton: false,
            });
            this.profesores = this.profesores.filter((e) => e.id !== id);
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
}
