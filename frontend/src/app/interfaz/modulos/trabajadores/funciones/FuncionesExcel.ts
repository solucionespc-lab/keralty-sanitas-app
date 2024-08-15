function capitalize(s: string) {
  return s && s[0].toUpperCase() + s.slice(1);
}
export const NombreMayus = (string: string) => {
  const name = string
    .toLowerCase()
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c?.toUpperCase()));
  return capitalize(name);
};

export const PrimeraMayus = (string: string) => {
  const newString = string?.toLowerCase();
  return newString?.charAt(0)?.toUpperCase() + newString?.slice(1);
};

export const removeAccents = (string: string) =>
  string
    ?.toString()
    ?.toUpperCase()
    ?.normalize('NFD')
    ?.replace(/[\u0300-\u036f]/g, '')
    ?.replace(/\s+/g, '');
