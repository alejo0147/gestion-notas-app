import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProfesoresService } from '../../../services/profesores.service';
import { Router } from '@angular/router';
import { Profesor } from '../../../models/profesor';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profesor-nuevo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profesor-nuevo.component.html',
  styleUrl: './profesor-nuevo.component.css',
})
export class ProfesorNuevoComponent implements OnInit {
  notaForm: FormGroup;
  profesores: Profesor[] = [];

  constructor(
    private fb: FormBuilder,
    private profesoresService: ProfesoresService,
    private router: Router
  ) {
    this.notaForm = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadProfesores();
  }

  loadProfesores(): void {
    this.profesoresService.getAllProfesores().subscribe((profesores) => {
      this.profesores = profesores;
    });
  }

  onSubmit(): void {
    if (this.notaForm.valid) {
      const nuevoProfesor: Profesor = {
        nombre: this.notaForm.value.nombre,
      };

      this.profesoresService.createProfesor(nuevoProfesor).subscribe(
        () => {
          Swal.fire({
            title: '¡Estudiante creado!',
            text: 'El profesor ha sido registrado exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            timer: 3000,
            timerProgressBar: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then(() => {
            this.router.navigate(['/profesores']);
            this.profesoresService
              .getAllProfesores()
              .subscribe((profesores) => (this.profesores = profesores));
          });
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al crear el profesor.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
          console.log('Error al crear el profesor', error);
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
