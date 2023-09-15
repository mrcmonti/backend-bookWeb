import EmprestimoBD from "../Database/emprestimoBD.js";


export default class Emprestimo {
    #cod_emprestimo;
    #dataEmprestimo;
    #dataDevolucao;
    #cpf_usuario;
    #listaLivros;

    constructor(cod_emprestimo, dataEmprestimo, dataDevolucao,cpf_usuario, listaLivros) {
        this.#cod_emprestimo = cod_emprestimo;
        this.#dataEmprestimo = dataEmprestimo;
        this.#dataDevolucao = dataDevolucao;
        this.#cpf_usuario = cpf_usuario;
        this.#listaLivros = listaLivros;
    }

    get codigo() {
        return this.#cod_emprestimo;
    }
    set codigo(codigo) {
        this.#cod_emprestimo = codigo;
    }

    get dataEmprestimo() {
        return this.#dataEmprestimo;
    }
    set dataEmprestimo(dataEmprestimo) {
        this.#dataEmprestimo = dataEmprestimo;
    }

    get dataDevolucao() {
        return this.#dataDevolucao;
    }
    set dataDevolucao(dataDevolucao) {
        this.#dataDevolucao = dataDevolucao;
    }

    get cpf() {
        return this.#cpf_usuario;
    }

    set cpf(cpf) {
        this.#cpf_usuario = cpf;
    }

    toJSON() {
        return {
            "cod_emprestimo": this.#cod_emprestimo,
            "dataEmprestimo": this.#cod_emprestimo,
            "dataDevolucao": this.#dataDevolucao,
            "cpf_usuario": this.#cpf_usuario,
            "listaLivros": this.#listaLivros,
        }

    }

    async gravar(){
        const emprestimoBD = new EmprestimoBD();
        this.#cod_emprestimo = await emprestimoBD.incluir(this);
    }

    async atualizar(){
        const emprestimoBD = new EmprestimoBD();
        await emprestimoBD.alterar(this);
    }

    async removerDoBancoDados(){
        const emprestimoBD = new EmprestimoBD();
        await emprestimoBD.excluir(this);
    }

    async consultarTodos(){
        const emprestimoBD = new EmprestimoBD();
        return await emprestimoBD.consultarTodos();
    }

    async consultarCodigo(cod_emprestimo){
        const emprestimoBD = new EmprestimoBD();
        const emprestimo = await emprestimoBD.consultarCodigo(cod_emprestimo);
    }
}

