const express = require('express');
const mongoose = require('mongoose');
const handlebars = require("express-handlebars");
const productFsRouter = require('./routes/file_routes/products.route');
const cartFsRouter = require('./routes/file_routes/carts.route');
const productRoutes = require('./routes/db_routes/products.route');
const cartRoutes = require('./routes/db_routes/carts.route');

/** ★━━━━━━━━━━━★ Declarando Express ★━━━━━━━━━━━★ */
const app = express();

/** ★━━━━━━━━━━━★ Configurando Handlebars ★━━━━━━━━━━━★ */
app.engine("hbs", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
app.use(express.static('public'));

/** ★━━━━━━━━━━━★  Middlewares ★━━━━━━━━━━━★ */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** ★━━━━━━━━━━━★ routes ★━━━━━━━━━━━★ */
// con FileSystem
app.use('/fs/products', productFsRouter);
app.use('/fs/carts', cartFsRouter);
// con MongoDB
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);


const port = 8080; //todo pasar a .env
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

/** ★━━━━━━━━━━━★ Configurando Mongo ★━━━━━━━━━━━★ */
const connectMongoDB = async ()=>{
    const stringConnection = 'mongodb://127.0.0.1:27017/ecommerce?retryWrites=true&w=majority' //todo pasar a .env
    try {
        await mongoose.connect(stringConnection);
        console.log("Conectado con exito a MongoDB usando Moongose.");
    } catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
};
connectMongoDB();