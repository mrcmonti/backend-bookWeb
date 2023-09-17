import { Router } from 'express';
import LivroCTRL from '../Controller/livroCtrl.js';

const rotaLivros = new Router();
const livroCTRL = new LivroCTRL();

rotaLivros
    .get('/', livroCTRL.consultar)
    .get('/:cod_livro', livroCTRL.consultarCodigo)
    .post('/', livroCTRL.gravar)
    .put('/', livroCTRL.atualizar)
    .delete('/', livroCTRL.excluir);

export default rotaLivros;