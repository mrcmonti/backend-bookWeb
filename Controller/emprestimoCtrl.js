import Emprestimo from "../Model/emprestimo.js";

export default class emprestimoCtrl {
    async consultarTodos(req, res) {
        const emprestimo = new Emprestimo();

        try {
            const emprestimos = await emprestimo.consultarTodos();
            return res.status(200).json(emprestimos);
        } catch (error) {
            return res.status(400).json();
        }
    }
}