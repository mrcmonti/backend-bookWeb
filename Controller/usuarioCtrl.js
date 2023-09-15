import Usuario from "../Model/usuario.js";

export default class UsuarioCTRL {

  gravar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const nome = dados.nome;
      const rua = dados.rua;
      const numero = dados.numero;
      const bairro = dados.bairro;
      const estado = dados.estado;
      const cep = dados.cep;
      const cpf = dados.cpf;
      const dataNasc = dados.dataNasc;
      const celular = dados.celular;
      const email = dados.email;

      if (nome && rua && numero && bairro && estado && cep && cpf && dataNasc && celular && email) {

        const usuario = new Usuario(nome, rua, numero, bairro, estado, cep, cpf, dataNasc, celular, email);
        usuario
          .gravar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "O usuario foi salvo com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: erro.message,

              // resposta de erro vinda do servidor
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe todos os dados corretamente!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem:
          "Método não permitido ou usuário no formato Json não foi reconhecido!",
      });
    }
  }

  atualizar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "PUT" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const nome = dados.nome;
      const rua = dados.rua;
      const numero = dados.numero;
      const bairro = dados.bairro;
      const estado = dados.estado;
      const cep = dados.cep;
      const cpf = dados.cpf;
      const dataNasc = dados.dataNasc;
      const celular = dados.celular;
      const email = dados.email;

      if (nome && rua && numero && bairro && estado && cep && cpf && dataNasc && celular && email) {
        const usuario = new Usuario(nome, rua, numero, bairro, estado, cep, cpf, dataNasc, celular, email);

        usuario
          .atualizar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "O usuario foi atualizado com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: erro.message,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe todos os dados corretamente!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem:
          "Método não permitido ou formato Json nao foi reconhecido!",
      });
    }
  }

  excluir(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const cpf = dados.cpf;

      if (cpf) {
        const usuario = new Usuario();
        usuario.cpf = cpf;

        usuario
          .removerDoBanco()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "O usuario foi excluido com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: erro.message,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe todos os dados corretamente!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem:
          "Método não permitido ou formato Json nao foi reconhecido!",
      });
    }
  }

  consultar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "GET") {
      const usuario = new Usuario();

      usuario
        .consultarTodos()
        .then((listaUsuarios) => {
          resposta.status(200).json(listaUsuarios)
        }
        )
        .catch((erro) => {
          resposta.status(500).json({
            status: false,
            mensagem: erro.message,
          });
        });
    } else {
      resposta.status(400).json({
        status: false,
        mensagem:
          "Método não permitido ou formato Json nao foi reconhecido!",
      });
    }
  }

  consultarCpf(requisicao, resposta) {
    resposta.type("application/json");
    const cpf = requisicao.params["cpf"];

    if (requisicao.method === "GET") {
      const usuario = new Usuario();

      usuario
        .consultarCpf(cpf)
        .then((usuario) => {
          resposta.status(200).json(usuario);
        })
        .catch((erro) => {
          resposta.status(500).json({
            status: false,
            mensagem: erro.message,
          });
        });
    } else {
      resposta.status(400).json({
        status: false,
        mensagem:
          "Método não permitido ou formato Json nao foi reconhecido!",
      });
    }
  }
}
