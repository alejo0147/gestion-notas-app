import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Estudiante } from '../../../models/estudiante';
import { EstudiantesService } from '../../../services/estudiantes.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estudiante-nuevo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './estudiante-nuevo.component.html',
  styleUrl: './estudiante-nuevo.component.css',
})
export class EstudianteNuevoComponent implements OnInit {
  notaForm: FormGroup;
  estudiantes: Estudiante[] = [];

  constructor(
    private fb: FormBuilder,
    private estudiantesService: EstudiantesService,
    private router: Router
  ) {
    this.notaForm = this.fb.group({
      nombre: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.loadEstudiantes();
  }

  loadEstudiantes(): void {
    this.estudiantesService.getAllEstudiantes().subscribe((estudiantes) => {
      this.estudiantes = estudiantes;
    });
  }

  onSubmit(): void {
    if (this.notaForm.valid) {
      const nuevoEstudiante: Estudiante = {
        nombre: this.notaForm.value.nombre,
      };

      this.estudiantesService.createEstudiante(nuevoEstudiante).subscribe(
        () => {
          Swal.fire({
            title: '¡Estudiante creado!',
            text: 'El estudiante ha sido registrado exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            timer: 3000,
            timerProgressBar: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then(() => {
            this.router.navigate(['/estudiantes']);
            this.estudiantesService
              .getAllEstudiantes()
              .subscribe((estudiantes) => (this.estudiantes = estudiantes));
          });
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al crear el estudiante.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
          console.log('Error al crear el estudiante', error);
        }
      );
    } else {
      Swal.fire({
        title: 'Formulario inválido',
        text: 'Por favor, complete todos los campos requeridos.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
    }
  }
}
