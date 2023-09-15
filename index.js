import http from 'http';
import express from 'express';
import cors from 'cors'
import rotaLivros from './rotas/rotaLivros.js';
import rotaUsuarios from './rotas/rotaUsuarios.js';
import rotaAutores from './rotas/rotaAutores.js';
import rotaEmprestimos from './rotas/rotaEmprestimo.js';

const hostname = 'localhost';
const porta = 4004;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/livros", rotaLivros);
app.use("/usuarios", rotaUsuarios);
app.use("/autores", rotaAutores);
app.use('/emprestimos', rotaEmprestimos);

const servidor = http.createServer(app);

servidor.listen(porta, hostname, () => {
    console.log(`Servidor escutando em http:// ${hostname}: ${porta}`);
});
