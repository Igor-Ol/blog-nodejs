const express = require('express')

//Express aplicativo - configurando o acesso as funções
const app = express();

//registrar a visualição da engenharia
app.set('view engine', 'ejs');

//ouvindo as requisições na porta
app.listen(3001);

//acessar uma rota 
app.get('/', (req, res) => {
    res.render('index');
});

//nova rota 
app.get('/sobre', (req, res) => {
    res.render('sobre');
});

//redirecionamento de página
app.get('/sobrenos', (req, res) => {
    res.redirect('/sobre')
});

//erro 404
app.use((req, res) => {
    res.status(404).render('404');
})
