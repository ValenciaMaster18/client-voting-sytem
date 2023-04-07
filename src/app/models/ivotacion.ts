export interface IVotacion {
  id?: number;
  nombre: string;
  descripcion: string;
  estado: 'CREADA' | 'HABILITADA' | 'INHABILITADA';
  current: boolean;
}
