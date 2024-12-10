export const generarHash = () => {
  return Math.random().toString(36).substring(2, 10); // Genera un string de 8 caracteres aleatorios
};
