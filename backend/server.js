require("dotenv").config();

const session = require("express-session");



const express = require("express");
const sqlite3 = require("sqlite3");
const path = require("path");

const app = express();
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, "..")));

const db = new sqlite3.Database("./dados.db");

const cors = require("cors");

app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true
}));

function verificarLogin (req, res, next){
    if(req.session.logado){
        next();
    } else {
        res.status(401).send("Acesso negado. Faça login primeiro.");
    }
}
 
app.get("/cotacao/:ticker", async function(req, res){
    const ticker = req.params.ticker;
    const token = process.env.BRAPI_TOKEN;

    const resposta = await fetch(`https://brapi.dev/api/quote/${ticker}?token=${token}`);
    const dados = await resposta.json();

    res.json(dados);
});

db.run(`
    CREATE TABLE IF NOT EXISTS cadastros (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        email TEXT,
        celular TEXT
        )
    `);

app.use(express.json());

app.post("/login", function(req, res){
    const usuario = req.body.usuario;
    const senha = req.body.senha;
    if (usuario === process.env.ADMIN_USER && senha === process.env.ADMIN_PASS){
        req.session.logado = true;
        res.send("Login realizado com sucesso");
    } else {
        res.status(401).send("Usuario ou senha incorretos");
    }
});

app.get("/", function(req, res){
    res.send("Servidor funcionando!");
});

app.post("/cadastro", function(req, res){
    const nome = req.body.nome;
    const email = req.body.email;
    const celular = req.body.celular;

    db.run("INSERT INTO cadastros (nome, email, celular) VALUES (?, ?, ?)", [nome, email, celular], function(erro){
        if(erro){
            res.status(500).send("Erro ao salvar");
        } else {
            res.send("Cadastro salvo com sucesso!");
        }
    });
});

app.get("/cadastros", verificarLogin, function(req, res) {
    db.all("SELECT * FROM cadastros", function(erro, linhas) {
        if (erro) {
            res.status(500).send("Erro ao buscar cadastros");
        } else {
            res.json(linhas);
        }
    });
});

app.delete("/cadastro/:id", verificarLogin, function(req, res){
    const id = req.params.id;

    db.run("DELETE FROM cadastros WHERE id= ?", [id], function(erro){
        if (erro){
            res.status(500).send("Erro ao excluir");
        } else {
            res.send("Cadastro excluido com sucesso!");
        }
    });
});

app.listen(3000, function() {
    console.log("Servidor rodando em http://localhost:3000");
});