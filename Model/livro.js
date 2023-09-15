import LivroBD from "../Database/livroBD.js";

export default class Livro{
    #cod_livro; // # define que um atributo é privado
    #titulo;
    #autor; 
    #editora;
    #genero;
    #dataPublicacao;
    #numPaginas;
    

    // metodo construtor que define informações necessarias para se criar objeto 
    constructor(cod_livro, titulo, autor, editora, genero, dataPublicacao, numPaginas) {
        this.#cod_livro = cod_livro;
        this.#titulo = titulo;
        this.#autor = autor;
        this.#editora = editora;
        this.#genero = genero;
        this.#dataPublicacao = dataPublicacao;
        this.#numPaginas = numPaginas;
    }
        
    // nos metodos get e set pode-se implementar regras de nogocios
    // metodos publicos get e set
    get codigo(){
        return this.#cod_livro;
    }
    set codigo(novoCodigo){

            this.#cod_livro = novoCodigo;
    }
    get titulo(){
        return this.#titulo;
    }
    set titulo(novotitulo){
        if(novotitulo != "") // regra de negocio que impede que clientes existam com titulo vazio
            this.#titulo = novotitulo;
    }

    get autor(){
        return this.#autor;
    }
    set autor(novoAutor){
        this.#autor = novoAutor;
    }

    get editora(){
        return this.#editora;
    }
    set editora(novaEditora){
        this.#editora = novaEditora;
    }
    get genero(){
        return this.#genero;
    }
    set genero(novoGenero){
        this.#genero = novoGenero;
    }
    get dataPublicacao(){
        return this.#dataPublicacao;
    }
    set dataPublicacao(novodataPublicacao){
        this.#dataPublicacao = novodataPublicacao;
    }
    get numPaginas(){
        return this.#numPaginas;
    }
    set numPaginas(novonumPaginas){
        this.#numPaginas = novonumPaginas;
    }
    
    // override ou sobrescrita do metodo toJson
    toJSON(){
        return{
            "codigo": this.#cod_livro,
            "titulo": this.#titulo,
            "autor": this.#autor,
            "editora": this.#editora,
            "genero":this.#genero,
            "dataPublicacao":this.#dataPublicacao,
            "numPaginas":this.#numPaginas,
            
        }
    }
    async gravar(){
        // instancia da classe LivroBD
        const livroBD = new LivroBD();
        this.cod_livro = await livroBD.incluir(this);
        // o codigo gerado pelo banco é atribuido ao codigo do livro
    }
    async atualizar(){
        const livroBD = new LivroBD();
        await livroBD.alterar(this);
    }

    async removerDoBancoDados(){
        const livroBD = new LivroBD();
        await livroBD.excluir(this);
    }
    async consultarTodos() {
        const livroBD = new LivroBD();
        return await livroBD.consultarTodos();
    }

    async consultar(titulo){
        const livroBD = new LivroBD();
        const livro = await livroBD.consultar(titulo);
        return livro;
    }

    async consultarCodigo(codigo){
        const livroBD = new LivroBD();
        const livro = await livroBD.consultarCodigo(codigo);
        return livro;

    }
}