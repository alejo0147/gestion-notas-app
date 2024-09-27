import { Routes } from '@angular/router';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { ProfesoresComponent } from './components/profesores/profesores.component';
import { NotasComponent } from './components/notas/notas.component';
import { NotaNuevaComponent } from './components/notas/nota-nueva/nota-nueva.component';
import { NotaEditarComponent } from './components/notas/nota-editar/nota-editar.component';
import { EstudianteNuevoComponent } from './components/estudiantes/estudiante-nuevo/estudiante-nuevo.component';
import { ProfesorNuevoComponent } from './components/profesores/profesor-nuevo/profesor-nuevo.component';
import { EstudianteEditarComponent } from './components/estudiantes/estudiante-editar/estudiante-editar.component';
import { ProfesorEditarComponent } from './components/profesores/profesor-editar/profesor-editar.component';

export const routes: Routes = [
  { path: 'estudiantes',
    component: EstudiantesComponent
  },
  { path: 'estudiantes/editar/:id',
    component: EstudianteEditarComponent
  },
  { path: 'estudiantes/nuevo',
    component: EstudianteNuevoComponent
  },
  { path: 'profesores',
    component: ProfesoresComponent
  },
  { path: 'profesores/editar/:id',
    component: ProfesorEditarComponent
  },
  { path: 'profesores/nuevo',
    component: ProfesorNuevoComponent
  },
  { path: 'notas',
    component: NotasComponent
  },
  { path: 'notas/editar/:id',
    component: NotaEditarComponent
  },
  { path: 'notas/nuevo',
    component: NotaNuevaComponent
  },
  { path: '',
    redirectTo: '/estudiantes',
    pathMatch: 'full'
  }
];
