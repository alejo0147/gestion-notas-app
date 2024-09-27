import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../../models/estudiante';
import { EstudiantesService } from '../../services/estudiantes.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.css'
})
export class EstudiantesComponent implements OnInit {
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
    if (confirm('¿Estás seguro de que deseas eliminar este estudiante?')) {
      this.estudiantesService.deleteEstudiante(id).subscribe({
        next: () => {
          console.log('Estudiante eliminado exitosamente.');
          this.estudiantes = this.estudiantes.filter(e => e.id !== id);
        },
        error: (error) => {
          console.error('Error al eliminar el estudiante:', error);
          alert(error);
        }
      });
    }
  }


}
