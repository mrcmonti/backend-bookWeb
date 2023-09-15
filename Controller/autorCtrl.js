import Autor from "../Model/autor.js";

export default class AutorCTRL {

    gravar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === "POST" && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const nomeAutor = dados.nomeAutor;
            const nacionalidade = dados.nacionalidade;
            if (nomeAutor && nacionalidade) {
                const autor = new Autor(0, nomeAutor, nacionalidade);
                autor
                .gravar()
                    .then(() => {
                        resposta.status(200).json({
                            status: true,
                            mensagem: "O autor foi salvo com sucesso!",
                        });
                    }).catch((erro) => {
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
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao === "PUT" && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const codAutor = dados.codAutor;
            const nomeAutor = dados.nomeAutor;
            const nacionalidade = dados.nacionalidade;
            if (codAutor && nomeAutor && nacionalidade) {
                const autor = new Autor(codAutor, nomeAutor, nacionalidade);

                autor
                    .atualizar()
                    .then(() => {
                        resposta.status(200).json({
                            status: true,
                            mensagem: "O autor foi atualizado com sucesso!",
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
                }); ''
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem:
                    "Método não permitido ou autor no formato Json nao foi reconhecido!",
            });
        }
    }
    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao === "DELETE" && requisicao.is('application/json')) {
            const dados = requisicao.dados;
            const codAutor = dados.codAutor;
            if (codAutor) {
                const autor = new Autor(codAutor);
                autor
                    .removerDoBancoDados()
                    .then(() => {
                        resposta.status(200).json({
                            status: true,
                            mensagem: "O autor foi excluido com sucesso!",
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
                    "Método não permitido ou autor no formato Json nao foi reconhecido!",
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === "GET") {
            const autor = new Autor();

            autor
                .consultarTodos()
                .then((listaAutores) => {
                    resposta.status(200).json(listaAutores);
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
                    "Método não permitido ou autor no formato Json nao foi reconhecido!",
            });
        }
    }

    consultarCodigo(requisicao, resposta) {
        resposta.type("application/json");
        const codAutor = requisicao.params["codAutor"];

        if (requisicao.method === "GET") {
            const autor = new Autor();

            autor
                .consultarCodigo(codAutor)
                .then((autor) => {
                    resposta.status(200).json(autor);
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
                    "Método não permitido ou autor no formato Json nao foi reconhecido!",
            });
        }
    }

}