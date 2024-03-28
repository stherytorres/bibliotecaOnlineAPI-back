const express = require('express');
const livroModel = require('./src/module/livro/livroModel');
const { connectToMongo } = require("./src/config/mongo");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({}));
connectToMongo();

app.get('/livros', async (req, res) => { // Listar livros
    const livros = await livroModel.find({});
    return res.status(200).json(livros);
});

app.post('/livros/cadastro', async (req, res) => { // Cadastrar livros
    if (!req.body.id) {
        return res.status(400).json({ message: 'O campo id é obrigatório' });
    }
    if (!req.body.titulo) {
        return res.status(400).json({ message: 'O campo título é obrigatório' });
    }
    if (!req.body.paginas) {
        return res.status(400).json({ message: 'O campo páginas é obrigatório' });
    }
    if (!req.body.codigoISBN) {
        return res.status(400).json({ message: 'O campo código ISBN é obrigatório' });
    }
    if (!req.body.editora) {
        return res.status(400).json({ message: 'O campo editora é obrigatório' });
    }

    //Verifica se o livro ja existe na base
    const livroExistente = await livroModel.find({ id: req.body.id });

    if (livroExistente && livroExistente.length) {
        return res.status(400).json({ message: 'O livro já foi cadastrado' });
    }

    const livro = await livroModel.create({
        id: req.body.id,
        titulo: req.body.titulo,
        paginas: req.body.paginas,
        codigoISBN: req.body.codigoISBN,
        editora: req.body.editora,
    });

    return res.status(201).json(livro);
});

app.get("/livros/edicao/:id", async (req, res) => {
    const livro = await livroModel.findOne({ id: req.params.id });
    return res.status(200).json(livro);
});

app.put("/livros/edicao/:id", async (req, res) => {
    try {
        const livro = await livroModel.updateOne({ id: req.params.id }, req.body);
        if (!livro) {
            return res.status(404).send("Livro não encontrado")
        }
        return res.status(200).json(livro)
    } catch (error) {
        res.status(500).send(error)
    }
});

app.delete("/livros/:id", async (req, res) => {
    try {
        const livro = await livroModel.deleteOne({ id: req.params.id });
        if (!livro) {
            return res.status(404).send("Livro não encontrado")
        }
        res.status(200).send("Livro apagado");
    } catch (error) {
        res.status(500).send(error)
    }
});


app.listen(9090, () => {
    console.log('Servidor funcionando na porta 9090');
});