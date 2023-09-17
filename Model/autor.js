import AutorBD from "../Database/autorBD.js";

export default class Autor{

    #cod_autor;
    #nomeAutor;
    #nacionalidade;

    constructor(cod_autor, nomeAutor, nacionalidade){
        this.#cod_autor = cod_autor;
        this.#nomeAutor = nomeAutor;
        this.#nacionalidade = nacionalidade;
    }
    get cod_autor(){
        return this.#cod_autor;
    }
    set cod_autor(cod_autor){
        this.#cod_autor = cod_autor;
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
    toJSON(){
        return{
            "cod_autor": this.#cod_autor,
            "NomeAutor": this.#nomeAutor,
            "nacionalidade": this.#nacionalidade
        }
    }
    async gravar(){
        const autorBD = new AutorBD();
        this.cod_autor = await autorBD.incluir(this);
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