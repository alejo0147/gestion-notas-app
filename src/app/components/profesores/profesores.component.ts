import { Component } from '@angular/core';
import { Profesor } from '../../models/profesor';
import { ProfesoresService } from '../../services/profesores.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profesores',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profesores.component.html',
  styleUrl: './profesores.component.css'
})
export class ProfesoresComponent {
  profesores: Profesor[] = [];

  constructor(private profesoresService: ProfesoresService, private router: Router){}

  ngOnInit(): void {
    this.getProfesores();
  }

  getProfesores(): void{
    this.profesoresService.getAllProfesores().subscribe(profesores =>{
      this.profesores = profesores;
    });
  }

  editProfesor(id: number): void{
    this.router.navigate([`/profesores/editar/${id}`])
  }

  deleteProfesor(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este profesor?')) {
      this.profesoresService.deleteProfesor(id).subscribe({
        next: () => {
          console.log('Profesor eliminado exitosamente.');
        this.profesores = this.profesores.filter(e => e.id !== id);
        },
        error: (error) => {
          console.error('Error al eliminar el profesor:', error);
          alert(error);
        }
      });
    }
  }
}
