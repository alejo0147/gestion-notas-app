export interface Nota {
  id?: number;
  nombre: string;
  idProfesor: number;
  idEstudiante: number;
  valor: number;
  estudianteNombre?: string;
  profesorNombre?: string;     
}
