import AutorBD from "../Database/autorBD.js";

export default class Autor{

    #codAutor;
    #nomeAutor;
    #nacionalidade;

    constructor(codAutor, nomeAutor, nacionalidade){
        this.#codAutor = codAutor;
        this.#nomeAutor = nomeAutor;
        this.#nacionalidade = nacionalidade;
    }
    get codAutor(){
        return this.#codAutor;
    }
    set codAutor(codAutor){
        this.#codAutor = codAutor;
    }
    get nomeAutor(){
        return this.#nomeAutor;
    }
    set nomeAutor(nomeAutor){
        this.#nomeAutor = nomeAutor;
    }
    get nacionalidade(){
        return this.#nacionalidade;
    }
    set nacionalidade(nacionalidade){
        this.#nacionalidade = nacionalidade;
    }
    toJson(){
        return{
            "codAutor": this.#codAutor,
            "NomeAutor": this.#nomeAutor,
            "nacionalidade": this.#nacionalidade
        }
    }
    async gravar(){
        const autorBD = new AutorBD();
        this.codAutor = await autorBD.incluir(this);
    }

    async atualizar(){
        const autorBD = new AutorBD();
        await autorBD.alterar(this);
    }
    async removerDoBancoDados(){
        const autorBD = new AutorBD();
        await autorBD.excluir(this);
    }
    async consultarTodos() {
        const autorBD = new AutorBD();
        return await autorBD.consultarTodos();
    }

    async consultar(titulo){
        const autorBD = new AutorBD();
        const autor = await autorBD.consultar(titulo);
        return autor;
    }

    async consultarCodigo(codigo){
        const autorBD = new AutorBD();
        const autor = await autorBD.consultarCodigo(codigo);
        return autor;

    }
}