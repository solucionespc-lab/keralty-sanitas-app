#!/bin/bash

# Función para convertir la primera letra en mayúscula

# Verificamos si se ha proporcionado un argumento al script
if [ -z "$1" ]
  then
    echo "Por favor, proporciona el nombre del módulo para crear la arquitectura"
    exit 1
fi

# Ruta donde debe crear el módulo
argument="${1}"
MODULE=$(echo -n ${argument:0:1} | tr '[:lower:]' '[:upper:]'; echo ${argument:1} | tr '[:upper:]' '[:lower:]')
PARENT_DIR="../frontend/src/app/interfaz/modulos"

FILES=("ConstGenerales.ts" "Store$MODULE.tsx" "Generales.module.css" "Queries.ts" "Iconografia.tsx" "Crear.tsx")
FOLDERS=("constantes" "store" "estilos" "peticiones" "recursos" "secciones")

echo "Creando la arquitectura para el módulo ${MODULE}"

# Verificamos si la carpeta padre ya existe
if [ ! -d "$1" ]
  then
    # Si la carpeta no existe, la creamos
    mkdir $PARENT_DIR/$1
fi

# Recorremos la lista de nombres de archivo y creamos cada archivo en la carpeta correspondiente
for i in ${!FOLDERS[@]}; do
  # Creamos las subcarpetas dentro del módulo que pasaron como argumento
  mkdir "$PARENT_DIR/${1}/${FOLDERS[$i]}"
  # Creamos el archivo en la carpeta seleccionada
  if [ ${FOLDERS[$i]} = "peticiones" ]; then
    touch "$PARENT_DIR/${1}/${FOLDERS[$i]}/Mutations.ts"
  fi

  touch "$PARENT_DIR/${1}/${FOLDERS[$i]}/${FILES[$i]}"
done

# Creamos el archivo principal del módulo
touch "$PARENT_DIR/${1}/${MODULE}.tsx"

echo "¡El módulo ha sido creado!"