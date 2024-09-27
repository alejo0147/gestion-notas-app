import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudiantesService } from '../../../services/estudiantes.service';

@Component({
  selector: 'app-estudiante-editar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './estudiante-editar.component.html',
  styleUrl: './estudiante-editar.component.css'
})
export class EstudianteEditarComponent implements OnInit {
  estudianteForm: FormGroup;
  estudiantes: any[] = [];
  estudianteId!: number;

  constructor(
    private route: ActivatedRoute,
    private estudiantesService: EstudiantesService,
    private router: Router
  ){
    this.estudianteForm = new FormGroup({
      nombre: new FormControl('', Validators.required)
    });
  }
  ngOnInit(): void {
    this.estudianteId = +this.route.snapshot.paramMap.get('id')!;
    this.loadEstudiantes();
  }

  loadEstudiantes(): void {
    this.estudiantesService.getEstudianteById(this.estudianteId).subscribe((data) => {
      this.estudianteForm.patchValue(data);
    });
  }

  onSubmit(): void {
    if (this.estudianteForm.valid) {
      const formValue = this.estudianteForm.value;

      console.log('Formulario a enviar:', formValue);

      this.estudiantesService.updateEstudiante(this.estudianteId, formValue).subscribe({
        next: () => {
          console.log('Estudiante actualizado exitosamente');
          this.router.navigate(['/estudiantes']);
        },
        error: (err) => {
          console.error('Error al actualizar el estudiante:', err);
        },
      });
    } else {
      console.error('Formulario no válido');
    }
  }

}
