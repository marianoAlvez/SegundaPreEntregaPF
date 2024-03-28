// /** ★━━━━━━━━━━━★ Configurando Mongo ★━━━━━━━━━━━★ */

const mongoose = require("mongoose");

const connectMongoDB = async () => {
    const stringConnection =
        "mongodb://127.0.0.1:27017/ecommerce?retryWrites=true&w=majority";
    try {
        await mongoose.connect(stringConnection);
        console.log("Conectado con exito a MongoDB usando Moongose.");
    } catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
};

module.exports = connectMongoDB;