import { Router } from "express";
import AutorCTRL from "../Controller/autorCtrl.js";

const rotaAutores = new Router();
const autorCTRL = new AutorCTRL();

rotaAutores
    .get('/', autorCTRL.consultar)
    .get('/codAutor',autorCTRL.consultarCodigo)
    .post('/', autorCTRL.gravar)
    .put('/',autorCTRL.atualizar)
    .delete('/',autorCTRL.excluir);

export default rotaAutores;