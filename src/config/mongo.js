const mongoose = require('mongoose');
require("dotenv").config();

const dbUrl = process.env.DB_KEY;

const connectToMongo = () => {
    mongoose.connect(dbUrl);

    mongoose.connection.on("connected", () => {
        console.log("Conectado ao Banco de dados");
    });

    mongoose.connection.on("error", (err) => {
        console.error("Erro na conexão com o banco de dados", err);
    });

    mongoose.connection.on("disconnected", () => {
        console.log("Desconectado do Banco de dados");
    });

}

module.exports = { connectToMongo };