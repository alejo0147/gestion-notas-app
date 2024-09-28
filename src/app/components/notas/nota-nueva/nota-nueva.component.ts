import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Estudiante } from '../../../models/estudiante';
import { Profesor } from '../../../models/profesor';
import { EstudiantesService } from '../../../services/estudiantes.service';
import { ProfesoresService } from '../../../services/profesores.service';
import { NotasService } from '../../../services/notas.service';
import { Router } from '@angular/router';
import { Nota } from '../../../models/nota';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nota-nueva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nota-nueva.component.html',
  styleUrl: './nota-nueva.component.css',
})
export class NotaNuevaComponent implements OnInit {
  notaForm: FormGroup;
  estudiantes: Estudiante[] = [];
  profesores: Profesor[] = [];
  notas: Nota[] = [];

  constructor(
    private fb: FormBuilder,
    private estudiantesService: EstudiantesService,
    private profesoresService: ProfesoresService,
    private notasService: NotasService,
    private router: Router
  ) {
    this.notaForm = this.fb.group({
      nombre: ['', Validators.required],
      idEstudiante: ['', Validators.required],
      idProfesor: ['', Validators.required],
      valor: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
    });
  }

  ngOnInit(): void {
    this.loadEstudiantes();
    this.loadProfesores();
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

  onSubmit(): void {
    if (this.notaForm.valid) {
      const nuevaNota: Nota = {
        nombre: this.notaForm.value.nombre,
        idEstudiante: this.notaForm.value.idEstudiante,
        idProfesor: this.notaForm.value.idProfesor,
        valor: this.notaForm.value.valor,
      };

      this.notasService.createNota(nuevaNota).subscribe(
        () => {
          Swal.fire({
            title: '¡Nota creada!',
            text: 'La nota ha sido registrada exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            timer: 3000,
            timerProgressBar: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then(() => {
            this.router.navigate(['/notas']);
            this.notasService
              .getAllNotas()
              .subscribe((notas) => (this.notas = notas));
          });
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al crear la nota.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
          console.log('Error al crear la nota', error);
        }
      );
    } else {
      // Alerta de validación
      Swal.fire({
        title: 'Formulario inválido',
        text: 'Por favor, complete todos los campos requeridos.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
    }
  }
}
