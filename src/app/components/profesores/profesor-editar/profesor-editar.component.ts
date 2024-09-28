import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfesoresService } from '../../../services/profesores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profesor-editar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profesor-editar.component.html',
  styleUrl: './profesor-editar.component.css'
})
export class ProfesorEditarComponent implements OnInit{
  profesorForm: FormGroup;
  profesores: any[] = [];
  profesorId!: number;

  constructor(
    private route: ActivatedRoute,
    private profesoresService: ProfesoresService,
    private router: Router
  ){
    this.profesorForm = new FormGroup({
      nombre: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.profesorId = +this.route.snapshot.paramMap.get('id')!;
    this.loadProfesores();
  }

  loadProfesores(): void {
    this.profesoresService.getProfesorById(this.profesorId).subscribe((data) => {
      this.profesorForm.patchValue(data);
    });
  }

  onSubmit(): void {
    if (this.profesorForm.valid) {
      const formValue = this.profesorForm.value;

      console.log('Formulario a enviar:', formValue);

      this.profesoresService.updateProfesor(this.profesorId, formValue).subscribe({
        next: () => {
          Swal.fire({
            title: 'Actualizado',
            text: 'El profesor ha sido actualizado exitosamente.',
            icon: 'success',
            timer: 3000,
            showConfirmButton: false
          });
          this.router.navigate(['/profesores']);
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al actualizar el profesor.',
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
