import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfesoresService } from '../../../services/profesores.service';

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
          console.log('Profesor actualizado exitosamente');
          this.router.navigate(['/profesores']);
        },
        error: (err) => {
          console.error('Error al actualizar el profesor:', err);
        },
      });
    } else {
      console.error('Formulario no válido');
    }
  }

}
