import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudiantesService } from '../../../services/estudiantes.service';
import Swal from 'sweetalert2';

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

      this.estudiantesService.updateEstudiante(this.estudianteId, formValue).subscribe({
        next: () => {
          Swal.fire({
            title: 'Actualizado',
            text: 'El estudiante ha sido actualizado exitosamente.',
            icon: 'success',
            timer: 3000,
            showConfirmButton: false
          });
          this.router.navigate(['/estudiantes']);
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al actualizar el estudiante.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Formulario no válido, por favor revisa los datos.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }


}
