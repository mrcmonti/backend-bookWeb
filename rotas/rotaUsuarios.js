import { Router } from 'express';
import UsuarioCTRL from '../Controller/usuarioCtrl.js';

const rotaUsuarios = new Router();
const usuarioCTRL = new UsuarioCTRL();

rotaUsuarios
    .get('/', usuarioCTRL.consultar)
    .get('/:cpf', usuarioCTRL.consultarCpf)
    .post('/', usuarioCTRL.gravar)
    .put('/', usuarioCTRL.atualizar)
    .delete('/', usuarioCTRL.excluir);

export default rotaUsuarios;