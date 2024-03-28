// /** ★━━━━━━━━━━━★ Configurando Express ★━━━━━━━━━━━★ */

const express = require("express");
const path = require("path");

const app = express();

// Configura el middleware de Express para parsear el cuerpo de las solicitudes HTTP
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configura el middleware de Express para servir archivos estáticos
app.use(express.static('public'));

module.exports = app;