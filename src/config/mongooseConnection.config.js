//conexao com o banco de dados
const express = require("express")
const mongoose = require('mongoose')

//importando o arquivo db.config.js
const database = require('./db.config')

mongoose.Promise = global.Promise

//conexao de base de dados
mongoose.connect(database.local.localDatabaseUrl, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    })
    .then(()=> console.log('A base foi conectado com sucesso'))
    .catch((err) => {
        console.log(`erro ao conectar com o banco de dados ${err}`)
        process.exit()
    })