export interface PlantillasCorreoArgs {
  plantilla: {
    subject: string;
    html: string;
    nombreplantilla: string;
  };
}

export interface PlantillaOBj {
  subject: string;
  html: string;
}

export type ContAlgoliaType =
  | {
      objectID: string;
      cedulaNit: string;
      id: number;
      nombreContratista: string;
      clasificacion_proveedor: string;
      tipo_proveedor: string;
      estado: boolean;
      responsable: {
        responsable_cargo: string;
        responsable_correo: string;
        responsable_nombre: string;
        responsable_telefono: string;
      };
    }[]
  | never[];
