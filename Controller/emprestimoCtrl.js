import Emprestimo from '../Model/emprestimo.js';

export default class EmprestimoCtrl {
  async gravar(req, res) {
    const dados = req.body;
    const dataEmprestimo = dados.dataEmprestimo;
    const dataDevolucao = dados.dataDevolucao;
    const cpf_usuario = dados.cpf_usuario;
    const listaLivros = dados.listaLivros;
    if (dataEmprestimo && dataDevolucao && cpf_usuario && listaLivros) {
      const emprestimo = new Emprestimo(
        0,
        dataEmprestimo,
        dataDevolucao,
        cpf_usuario,
        listaLivros
      );
      emprestimo
        .gravar()
        .then(() => {
          res.status(200).json({
            status: true,
            mensagem: 'O empréstimo foi salvo com sucesso!',
          });
        })
        .catch((erro) => {
          resposta.status(500).json({
            status: false,
            mensagem: erro.message,
          });
        });
    } else {
        res.status(400).json({
            status: false,
            mensagem: "Informe todos os dados corretamente!"
        });
    }
  }

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
