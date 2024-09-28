import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../../models/estudiante';
import { EstudiantesService } from '../../services/estudiantes.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.css'
})
export class EstudiantesComponent implements OnInit {
  title: string = "Estudiantes"
  estudiantes: Estudiante[] = [];

  constructor (private estudiantesService: EstudiantesService, private router: Router){

  }

  ngOnInit(): void {
    this.getEstudiantes();
  }

  getEstudiantes(): void {
    this.estudiantesService.getAllEstudiantes().subscribe(data => {
      this.estudiantes = data;
    });
  }

  editEstudiante(id: number): void {
    this.router.navigate([`/estudiantes/editar/${id}`]);
  }

  deleteEstudiante(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.estudiantesService.deleteEstudiante(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Eliminado',
              text: 'El estudiante ha sido eliminado exitosamente.',
              icon: 'success',
              timer: 3000,
              showConfirmButton: false
            });
            this.estudiantes = this.estudiantes.filter(e => e.id !== id);
          },
          error: (error) => {
            Swal.fire({
              title: 'Error',
              text: error,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        });
      }
    });
  }


}
