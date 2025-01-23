# Radio Frecuencia Interactiva

## Descripción
Radio Frecuencia Interactiva es una aplicación de radio online enfocada en un público adulto joven de 25 a 60 años, profesionales y emprendedores.

## Características

### Autenticación

La aplicación utiliza autenticación basada en tokens JWT. Los usuarios deben registrarse e iniciar sesión para acceder a ciertas funcionalidades.

- **Registro**: Los usuarios pueden registrarse proporcionando su nombre completo, nick de usuario, ciudad, correo electrónico, fecha de nacimiento, nacionalidad y contraseña.
- **Inicio de sesión**: Los usuarios pueden iniciar sesión proporcionando su correo electrónico y contraseña.
- **Cerrar sesión**: Los usuarios pueden cerrar sesión, lo que elimina el token de autenticación almacenado en el navegador.

### Roles

La aplicación soporta diferentes roles de usuario:

- **Usuario**: Tiene acceso a funcionalidades básicas.
- **Administrador**: Tiene acceso a funcionalidades avanzadas, como la gestión de usuarios y reportes.

### Usuarios

Los administradores pueden gestionar usuarios:

- **Crear usuario**: Los administradores pueden crear nuevos usuarios.
- **Editar usuario**: Los administradores pueden editar la información de los usuarios existentes.
- **Eliminar usuario**: Los administradores pueden eliminar usuarios.

### Reportes

La aplicación permite la gestión de reportes de comportamiento de los pasajeros:

- **Crear reporte**: Los usuarios pueden crear reportes proporcionando información detallada sobre el pasajero.
- **Buscar reporte**: Los usuarios pueden buscar reportes por nombre, ID, CI o pasaporte, teléfono o nick.
- **Ver todos los reportes**: Los administradores pueden ver todos los reportes.
- **Editar reporte**: Los administradores pueden editar los reportes existentes.
- **Eliminar reporte**: Los administradores pueden eliminar reportes.

## Requisitos previos
- Node.js (versión 14 o superior)
- npm (Node Package Manager)
- PM2 (para ejecutar la aplicación en segundo plano)
- Nginx (para configurar el proxy inverso)

## Instalación y despliegue

### Paso 1: Subir archivos al servidor
1. **Conéctate a tu servidor:**
   - Utiliza un cliente FTP (como FileZilla) o el administrador de archivos de BlueHosting para conectarte a tu servidor.

2. **Sube los archivos de tu proyecto:**
   - Sube todos los archivos de tu proyecto a una carpeta en tu servidor. Asegúrate de incluir todos los archivos necesarios, como `server.js`, `package.json`, `Procfile`, y las carpetas `public`, `database`, etc.

### Paso 2: Instalar Node.js y PM2 en el servidor
1. **Accede a tu servidor mediante SSH:**
   - Utiliza un cliente SSH (como PuTTY) para conectarte a tu servidor.

2. **Instalar Node.js:**
   - Si aún no tienes Node.js instalado, puedes instalarlo utilizando `nvm` (Node Version Manager).

   ```sh
   # Instalar nvm
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
   source ~/.bashrc

   # Instalar la versión de Node.js que necesitas
   nvm install 14
   nvm use 14
   ```

3. **Instalar PM2:**
   ```sh
   npm install -g pm2
   ```

### Paso 3: Instalar dependencias y ejecutar la aplicación
1. **Navega a la carpeta de tu proyecto:**
   ```sh
   cd /ruta/a/tu/proyecto
   ```

2. **Instala las dependencias:**
   ```sh
   npm install
   ```

3. **Ejecuta tu aplicación con PM2:**
   ```sh
   pm2 start server.js
   pm2 startup
   pm2 save
   ```

### Paso 4: Configurar el servidor web para redirigir las solicitudes
Configura tu servidor web (como Apache o Nginx) para redirigir las solicitudes a tu aplicación Node.js. Esto puede implicar la configuración de un proxy inverso.

### Ejemplo de configuración de Nginx como proxy inverso
Si estás utilizando Nginx como servidor web, aquí tienes un ejemplo de configuración para redirigir las solicitudes a tu aplicación Node.js:

```plaintext
// filepath: /etc/nginx/sites-available/default
server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Paso 5: Verificar el despliegue
1. **Accede a tu aplicación:**
   - Abre tu navegador web y navega a la URL de tu dominio para verificar que tu aplicación esté funcionando correctamente.

2. **Monitorea los registros:**
   - Utiliza `pm2` para monitorear los registros de tu aplicación y asegurarte de que todo esté funcionando correctamente.
   ```sh
   pm2 logs
   ```

## Contacto
Para cualquier consulta o soporte, por favor contacta a [Perspectiva Digital](https://www.makuaz.cl).
