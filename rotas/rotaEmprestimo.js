import { Router } from "express";
import EmprestimoCtrl from "../Controller/emprestimoCtrl.js";

const rotaEmprestimos = new Router();
const emprestimoCtrl = new EmprestimoCtrl();

rotaEmprestimos
    .post('/', emprestimoCtrl.gravar)
    .get('/', emprestimoCtrl.consultarTodos)

export default rotaEmprestimos;