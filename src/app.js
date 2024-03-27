// /** ★━━━━━━━━━━━★ Importa Configuraciones ★━━━━━━━━━━━★ */

const app = require("./config/express");
const path = require('path');
const handlebars = require("./config/handlebars");
const connectMongoDB = require("./config/db");

// /** ★━━━━━━━━━━━★ Configurando Express ★━━━━━━━━━━━★ */

app.engine('handlebars', handlebars.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views/"));

// /** ★━━━━━━━━━━━★ Importa las rutas ★━━━━━━━━━━━★ */

const productFsRouter = require("./routes/file_routes/products.route");
const cartFsRouter = require("./routes/file_routes/carts.route");
const productRoutes = require("./routes/db_routes/products.route");
const cartRoutes = require("./routes/db_routes/carts.route");
const viewsRouter = require("./routes/views.route");

// /** ★━━━━━━━━━━━★ Configurando las rutas ★━━━━━━━━━━━★ */

app.use("/fs/products", productFsRouter);
app.use("/fs/carts", cartFsRouter);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/", viewsRouter);

// /** ★━━━━━━━━━━━★ Iniciando el servidor ★━━━━━━━━━━━★ */

const port = 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// /** ★━━━━━━━━━━━★ Conecta Mongo DB ★━━━━━━━━━━━★ */
connectMongoDB();