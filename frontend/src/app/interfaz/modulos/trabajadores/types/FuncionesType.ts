export type enumeradorFunc = (
  number: number,
  terminacion: string,
  enumerador: Record<
    string,
    {
      [key: string]: string;
    }
  >
) => string;
