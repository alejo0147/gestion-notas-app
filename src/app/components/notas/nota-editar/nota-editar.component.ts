import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotasService } from '../../../services/notas.service';
import { EstudiantesService } from '../../../services/estudiantes.service';
import { ProfesoresService } from '../../../services/profesores.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nota-editar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nota-editar.component.html',
  styleUrl: './nota-editar.component.css',
})
export class NotaEditarComponent {
  notaForm: FormGroup;
  estudiantes: any[] = [];
  profesores: any[] = [];
  notaId!: number;

  constructor(
    private route: ActivatedRoute,
    private notasService: NotasService,
    private estudiantesService: EstudiantesService,
    private profesoresService: ProfesoresService,
    private router: Router
  ) {
    this.notaForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      idEstudiante: new FormControl('', Validators.required),
      idProfesor: new FormControl('', Validators.required),
      valor: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(10),
      ]),
    });
  }

  ngOnInit(): void {
    this.notaId = +this.route.snapshot.paramMap.get('id')!;
    this.loadEstudiantes();
    this.loadProfesores();
    this.loadNota();
  }

  loadNota(): void {
    this.notasService.getNotaById(this.notaId).subscribe((nota) => {
      this.notaForm.patchValue(nota);
    });
  }

  loadEstudiantes(): void {
    this.estudiantesService.getAllEstudiantes().subscribe((data) => {
      this.estudiantes = data;
      this.loadNota();
    });
  }

  loadProfesores(): void {
    this.profesoresService.getAllProfesores().subscribe((data) => {
      this.profesores = data;
    });
  }

  onSubmit(): void {
    if (this.notaForm.valid) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.notaId = +id;

        const formValue = this.notaForm.value;
        formValue.idEstudiante = Number(formValue.idEstudiante);
        formValue.idProfesor = Number(formValue.idProfesor);

        console.log('Formulario a enviar:', formValue);

        this.notasService.updateNota(this.notaId, formValue).subscribe({
          next: () => {
            Swal.fire({
              title: 'Actualizado',
              text: 'La nota ha sido actualizada exitosamente.',
              icon: 'success',
              timer: 3000,
              showConfirmButton: false 
            });
            this.router.navigate(['/notas']);
          },
          error: (err) => {
            console.error('Error al actualizar la nota:', err);
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al actualizar la nota.',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          },
        });
      } else {
        console.error('ID de nota no encontrado en la URL');
        Swal.fire({
          title: 'Error',
          text: 'No se encontró el ID de la nota.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    } else {
      Swal.fire({
        title: 'Error',
        text: 'El formulario no es válido. Por favor revisa los datos.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }

}
