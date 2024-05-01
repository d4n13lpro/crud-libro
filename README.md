**Resumen:**
La aplicación CRUD de libros es una aplicación de servidor Node.js que proporciona una API para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en una base de datos de libros. La aplicación sigue una arquitectura de software basada en el patrón Modelo-Vista-Controlador (MVC), donde los controladores manejan las solicitudes HTTP, los modelos representan los datos de los libros y los servicios proporcionan la lógica de negocio para interactuar con la base de datos.

**Estructura del Proyecto:**
```
crud-libro
├── .env
├── .gitignore
├── controllers
│   └── books.controller.js
├── middlewares
│   └── error.middleware.js
├── models
│   └── book.model.js
├── package-lock.json
├── package.json
├── request.http
├── routes
│   └── books.routes.js
├── server.js
└── services
    └── books.service.js
```

**Lógica y Funcionalidad:**
- `server.js`: Este archivo inicia el servidor HTTP utilizando Express.js y configura las rutas de la API.
- `BooksService`: Este servicio encapsula la lógica de negocio para realizar operaciones CRUD en la base de datos de libros. Utiliza el módulo 'mysql' para interactuar con la base de datos.
- `BooksModel`: Define el modelo de datos para los libros, especificando la estructura de la tabla en la base de datos.
- `BooksController`: Los controladores manejan las solicitudes HTTP y llaman a los métodos correspondientes del servicio de libros para realizar operaciones en la base de datos.
- `ErrorMiddleware`: Este middleware maneja los errores que ocurren durante el procesamiento de las solicitudes HTTP y envía respuestas de error adecuadas al cliente.
- `Routes`: Las rutas definen las URL y los métodos HTTP para acceder a las diferentes funcionalidades de la API, como obtener todos los libros, obtener un libro por su ID, crear un nuevo libro, actualizar un libro existente y eliminar un libro.

**Tecnologías Utilizadas:**
- Node.js: Plataforma de tiempo de ejecución de JavaScript del lado del servidor.
- Express.js: Framework web de Node.js utilizado para crear la API RESTful.
- MySQL: Sistema de gestión de bases de datos relacional utilizado para almacenar los datos de los libros.
- npm: Administrador de paquetes de Node.js utilizado para instalar y administrar las dependencias del proyecto.

**Instalación y Configuración:**
1. Instala Node.js desde su sitio oficial si aún no lo has hecho.
2. Clona el repositorio de la aplicación CRUD de libros desde GitHub.
3. Ejecuta `npm install` en la raíz del proyecto para instalar todas las dependencias listadas en el archivo `package.json`.
4. Configura las variables de entorno en el archivo `.env` según sea necesario.
5. Inicia el servidor ejecutando `node server.js`.
6. Crear un archivo .env con las variables de entorno de la base de datos
    * HOST='host'
    * DB_PORT='puerto_base_datos'
    * USER='usuario'
    * PASSWORD='contrasena'
    * DATABASE='nombre_base_datos'
    * PORT='puerto_servidor'
  
7.Tabla

Archivo/Carpeta	Función	Interacción
.env	Almacena las variables de entorno del proyecto, como la cadena de conexión de la base de datos.	Es leído por server.js para configurar el entorno.
.gitignore	Especifica qué archivos y directorios deben ser ignorados por Git.	Interactúa con Git para evitar que ciertos archivos sean rastreados.
package.json	Contiene metadatos del proyecto y las dependencias.	Es leído por npm para instalar las dependencias del proyecto.
package-lock.json	Registra la versión exacta de las dependencias instaladas.	Es leído por npm para garantizar la consistencia de las dependencias.
server.js	Punto de entrada de la aplicación. Inicia el servidor y configura la aplicación.	Importa y utiliza books.routes.js y error.middleware.js.
📁routes/books.routes.js	Define las rutas de la API y cómo deben manejar las solicitudes.	Importa y utiliza books.controller.js. Es importado por server.js.
📁middlewares/error.middleware.js	Maneja los errores que ocurren durante el procesamiento de las solicitudes HTTP.	Es importado por server.js.
📁controllers/books.controller.js	Maneja las solicitudes HTTP y utiliza los servicios para interactuar con la base de datos.	Importa y utiliza books.service.js. Es importado por books.routes.js.
📁services/books.service.js	Este archivo encapsula la lógica de negocio y las operaciones de la base de datos.	Importa y utiliza book.model.js. Es importado por books.controller.js.
📁models/book.model.js	Define la estructura de los datos que estás almacenando en la base de datos.	Es importado por books.service.js.
README.md	Documenta cómo funciona tu aplicación y cómo otros pueden usarla.	No interactúa directamente con otros archivos, pero proporciona información útil para los usuarios.
request.http	Contiene ejemplos de solicitudes HTTP que se pueden hacer a tu API.	No interactúa directamente con otros archivos, pero puede ser utilizado para probar la API.

![image](https://github.com/d4n13lpro/crud-libro/assets/115835689/8d591c9e-ec39-49dc-b732-6c67bb46ab10)



