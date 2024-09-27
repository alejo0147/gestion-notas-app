import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfesoresService } from '../../../services/profesores.service';
import { Router } from '@angular/router';
import { Profesor } from '../../../models/profesor';

@Component({
  selector: 'app-profesor-nuevo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profesor-nuevo.component.html',
  styleUrl: './profesor-nuevo.component.css'
})
export class ProfesorNuevoComponent implements OnInit {
  notaForm: FormGroup;
  profesores: Profesor[] = [];

  constructor(
    private fb: FormBuilder,
    private profesoresService: ProfesoresService,
    private router: Router
  ){
    this.notaForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    this.loadProfesores();
  }

  loadProfesores(): void{
    this.profesoresService.getAllProfesores().subscribe((profesores) => {
      this.profesores = profesores;
  });
  }

  onSubmit(): void {
    if (this.notaForm.valid) {
      const nuevoProfesor: Profesor = {
        nombre: this.notaForm.value.nombre
      };

      this.profesoresService.createProfesor(nuevoProfesor).subscribe(
        () => {
          this.router.navigate(['/profesores']);
          this.profesoresService.getAllProfesores().subscribe((profesores) => this.profesores = profesores);
        },
        (error) => {
          console.log('Error al crear el profesor', error);
        }
      );

    }
  }

}
