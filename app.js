var conexao = require("./conexaobanco");

const express = require('express')

//Express aplicativo - configurando o acesso as funções
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//registrar a visualição da engenharia
app.set('view engine', 'ejs');

//ouvindo as requisições na porta
app.listen(3001);

conexao.connect(function(error){
if (error){
    console.error("Erro ao conectar ao banco de dados:", error);
    process.exit(); //encerrar o servidor caso a conexão falhe
}
});

//acessar uma rota 
app.get('/', (req, res) => {
    conexao.query('SELECT * FROM blog ORDER BY id DESC', (error, results) => {
        if (error) {
            console.error('Erro ao buscar blogs:', error);
            return res.status(500).send('Erro ao buscar blogs');
        }
        res.render('index', { titulo: 'Home', blogs: results });
    });
});


app.get('/blog/criar', (req, res) => {
    res.render('criar', {titulo: 'Criar novo Blog'});
});




//nova rota 
app.get('/sobre', (req, res) => {
    res.render('sobre', {titulo: 'Sobre'});
});

//redirecionamento de página
app.get('/sobrenos', (req, res) => {
    res.redirect('/sobre')
});


app.get('/blog/criar', function(req, res){
    res.sendFile(__dirname+'/views/criar.ejs');
});

//rota da criação do conteúdo
app.post('/blog/criar', function(req, res){
    var titulo = req.body.titulo;
    var textocurto = req.body.textocurto;
    var conteudo = req.body.conteudo;

var sql = "INSERT INTO blog (titulo, textocurto, conteudo) VALUES (?, ?, ?)";
    conexao.query(sql, [titulo, textocurto, conteudo], function(error, result){
        if(error) throw error;
        res.redirect('/');
});

});