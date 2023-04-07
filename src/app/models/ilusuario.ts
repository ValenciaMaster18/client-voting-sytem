export interface IUsuario {
  exp?: number;
  iat?: number;
  role?: 'ROLE_ADMINISTRADOR' | 'ROLE_APRENDIZ';
  sub?: string;
}
