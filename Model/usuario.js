import UsuarioBD from "../Database/usuarioBD.js"

export default class Usuario {

    #nome;
    #rua;
    #numero;
    #bairro;
    #estado;
    #cep;
    #cpf;
    #dataNasc;
    #celular;
    #email;

    constructor(nome, rua, numero, bairro, estado, cep, cpf, dataNasc, celular, email) {

        this.#nome = nome;
        this.#rua = rua;
        this.#numero = numero;
        this.#bairro = bairro;
        this.#estado = estado;
        this.#cep = cep;
        this.#cpf = cpf;
        this.#dataNasc = dataNasc;
        this.#celular = celular;
        this.#email = email;
    }

    get nome() {
        return this.#nome;
    }
    set nome(novoNome) {
        this.#nome = novoNome;
    }
    get rua() {
        return this.#rua;
    }
    set rua(novaRua) {
        this.#rua = novaRua;
    }
    get numero() {
        return this.#numero;
    }
    set numero(novoNumero) {
        this.#numero = novoNumero;
    }
    get bairro() {
        return this.#bairro;
    }
    set bairro(novoBairro) {
        this.#bairro = novoBairro;
    }
    get estado() {
        return this.#estado;
    }
    set estado(novoEstado) {
        this.#estado = novoEstado;
    }
    get cep() {
        return this.#cep;
    }
    set cep(novoCep) {
        this.#cep = novoCep;
    }
    get cpf() {
        return this.#cpf;
    }
    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }
    get dataNasc() {
        return this.#dataNasc;
    }
    set dataNasc(novaData) {
        this.#dataNasc = novaData;
    }
    get celular() {
        return this.#celular;
    }
    set celular(novoCelular) {
        this.#celular = novoCelular;
    }
    get email() {
        return this.#email;
    }
    set email(novoEmail) {
        this.#email = novoEmail;
    }

    toJSON() {
        return {
            "nome": this.#nome,
            "rua": this.#rua,
            "numero": this.#numero,
            "bairro": this.#bairro,
            "estado": this.#estado,
            "cep": this.#cep,
            "cpf": this.#cpf,
            "dataNasc": this.#dataNasc,
            "celular": this.#celular,
            "email": this.#email
        }
    }

    async gravar() {

        const usuarioBD = new UsuarioBD();
        this.cpf = await usuarioBD.incluir(this);
    }

    async atualizar() {

        const usuarioBD = new UsuarioBD();
        await usuarioBD.alterar(this);
    }

    async removerDoBanco() {

        const usuarioBD = new UsuarioBD();
        await usuarioBD.excluir(this);
    }

    async consultarTodos() {

        const usuarioBD = new UsuarioBD();
        return await usuarioBD.consultarTodos();
    }

    async consultarNome(nome) {

        const usuarioBD = new UsuarioBD();
        const usuario = await usuarioBD.consultarNome(nome);
        return usuario;
    }

    async consultarCpf(cpf) {
        const usuarioBD = new UsuarioBD();
        const usuario = await usuarioBD.consultarCpf(cpf);
        return usuario;
    }
}   
