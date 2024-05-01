const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const routes = require("./routes/books.routes");
const errorHandler = require("./middlewares/error.middleware");

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

// Configuración de la conexión a la base de datos
const dbOptions = {
  host: process.env.HOST,
  port: process.env.DB_PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
};

const connection = mysql.createConnection(dbOptions);

// Intentar conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    return;
  }
  console.log("Conexión exitosa a la base de datos!");
});

// Middleware para permitir el uso de JSON en las solicitudes
app.use(express.json());

// Middleware para pasar la conexión a la base de datos a todas las solicitudes
app.use((req, res, next) => {
  req.db = connection;
  next();
});

// Ruta de bienvenida
app.get("/", (req, res) => {
  res.send("¡Bienvenido a mi API!");
});

// Rutas de la API
app.use("/api/books", routes);

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
