const mongoose = require('mongoose');

const livroSchema = mongoose.Schema(
    {
        id: { type: String, required: true },
        titulo: String,
        paginas: Number,
        codigoISBN: Number,
        editora: String,
    },
    {
        timestamps: true,
    }
);

const livroModel = mongoose.model('livros', livroSchema);

module.exports = livroModel;