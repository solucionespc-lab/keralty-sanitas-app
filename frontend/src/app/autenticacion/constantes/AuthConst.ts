import { type ParsedToken } from 'firebase/auth';
import { type AuthClaimsType } from 'autenticacion/hooks/types/AuthTypes';

export const usuarioDefecto: AuthClaimsType | ParsedToken = {
  claims: {
    tipo: '',
    regional: [''],
    centro: [''],
    grupo: '',
    rol: 'Sin Rol',
    organizacion: 'bio',
    permisos: '',
  },
  token: '',
  autorizado: false,
};
