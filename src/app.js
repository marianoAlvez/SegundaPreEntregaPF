const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const hbs = require("express-handlebars");
const Handlebars = require('handlebars');
const productFsRouter = require("./routes/file_routes/products.route");
const cartFsRouter = require("./routes/file_routes/carts.route");
const productRoutes = require("./routes/db_routes/products.route");
const cartRoutes = require("./routes/db_routes/carts.route");
const viewsRouter = require("./routes/views.route");

/** ★━━━━━━━━━━━★ Declarando Express ★━━━━━━━━━━━★ */
const app = express();

/** ★━━━━━━━━━━━★ Configurando Handlebars ★━━━━━━━━━━━★ */
const handlebars = hbs.create({
  defaultLayout: "main",
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});

// Helpers Handlebars
Handlebars.registerHelper("add", function (value1, value2) {
  return value1 + value2;
});

Handlebars.registerHelper("subtract", function (value1, value2) {
  return value1 - value2;
});

Handlebars.registerHelper("multiply", function (value1, value2) {
  return value1 * value2;
});

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

/** ★━━━━━━━━━━━★  Middlewares ★━━━━━━━━━━━★ */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** ★━━━━━━━━━━━★ routes ★━━━━━━━━━━━★ */
// con FileSystem
app.use("/fs/products", productFsRouter);
app.use("/fs/carts", cartFsRouter);
// con MongoDB
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
// con Handlebars
app.use("/", viewsRouter);

const port = 8080; //todo pasar a .env
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

/** ★━━━━━━━━━━━★ Configurando Mongo ★━━━━━━━━━━━★ */
const connectMongoDB = async () => {
  const stringConnection =
    "mongodb://127.0.0.1:27017/ecommerce?retryWrites=true&w=majority"; //todo pasar a .env
  try {
    await mongoose.connect(stringConnection);
    console.log("Conectado con exito a MongoDB usando Moongose.");
  } catch (error) {
    console.error("No se pudo conectar a la BD usando Moongose: " + error);
    process.exit();
  }
};
connectMongoDB();
