# INICIO DEL ENTORNO DE DESARROLLO

Bienvenido(a) al monorepo del proyecto, por favor siga los siguientes pasos para empezar a programar la aplicación del cliente particular.

# Instalar los paquetes de Node
Para iniciar el entorno de desarrollo se deben instalar las dependencias de cada implementación del monorepo. Abra la consola y digite:
```bash
  pnpm install
```

Luego compile los servicios para correr todo el entorno de desarrollo
```bash
  pnpm -r run build
```

# Iniciar sesión en Infisical
Para poder tener acceso a las variables de entorno de desarrollo usamos un servicio llamado **Infisical** es Open Source, seguro y administrado en la nube. Por ello solicite el acceso a través del Líder de producto.

Para autenticarse como usuario abra la terminal.

1. Escriba **infisical login** y seleccione Infisical Cloud.
2. Autenticarse a través del navegador web en donde debe diligenciar las credenciales.
3. Digite en la consola **infisical init** y seleccione la carpeta **Clients**.

# Lanzar el entorno de desarollo de Firebase
1. Escriba en la consola

```bash
  firebase use dev
```

Si el comando no funciona o no tiene los permisos asignados, comuníquese con el Lider de desarrollo para que lo agregue al proyecto de Firebase; trate de autenticarse a través del siguente comando y vuelva a ejecutar el script anterior.

```bash
  firebase login:use su_correo@pcsoluciones.com.co
```

# Lanzar el entorno de desarrollo
Para iniciar el entorno de desarrollo digité las teclas <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>p</kbd>, escriba task y seleccione **Run task**, luego seleccione Development environment. Este proceso inicia en la consola los entornos que se encuentran establecidos.

## Entornos iniciados
- Apollo server sandbox: http://127.0.0.1:5001/pc-dev-db/us-central1/endpoint-api
- Firebase emulators: http://localhost:8006
- Application: http://localhost:3000
- SQLite: http://localhost:4000