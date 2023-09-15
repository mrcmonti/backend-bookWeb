import { Router } from "express";
import emprestimoCtrl from "../Controller/emprestimoCtrl.js";

const rota = new Router();
const ctrl = new emprestimoCtrl();

rota.get('/', ctrl.consultarTodos);

export default rota;