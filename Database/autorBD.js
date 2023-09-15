import Autor from "../Model/autor.js";
import conectar from "./Conexao.js";

export default class AutorBD {

    async incluir(autor) {
        if (autor instanceof Autor) {
            const conexao = await conectar();
            const sql = "INSERT INTO autor(nomeAutor, nacionalidade)VALUES(?,?)";
            const valores = [ autor.nomeAutor, autor.nacionalidade];
            const resultado = await conexao.query(sql, valores);
            return await resultado[0].insertId;
            
        }
    }
    async alterar(autor) {
        if (autor instanceof Autor) {
            const conexao = await conectar();
            const sql = "UPDATE autor SET nomeAutor =?, nacionalidade = ? WHERE codAutor = ?";
            const valores = [autor.nomeAutor, autor.nacionalidade, autor.codAutor];
            await conexao.query(sql, valores);
        }
    }
    async excluir(autor) {
        if (usuario instanceof Autor) {
            const conexao = await conectar();
            const sql = "DELETE FROM usuario WHERE(cpf=?)";
            const valores = [autor.cpf];
            await conexao.query(sql, valores);
        }
    }

    async consultarTodos() {
        const conexao = await conectar();
        const sql = "SELECT * FROM autor";
        const [rows] = await conexao.query(sql);
        const listaAutores = [];
        for (const row of rows) {
            const autor = new Autor(
                row["codAutor"],
                row["nomeAutor"],
                row["nacionalidade"]
            );
            listaAutores.push(autor);
        }
        return listaAutores;
    }

    async consultarAutor(nomeAutor){

        const conexao = await conectar();
        const sql = "SELECT * FROM autor WHERE nomeAutor = ?";
        const valores = ["%" + nomeAutor + "%"];
        const [rows] = await conexao.query(sql, valores);
        const listaAutores = [];
        for(const row of rows){
            const autor = new Autor(
                row["codAutor"],
                row["nomeAutor"],
                row["nacionalidade"],
            );
            listaAutores.push(autor);
        }
        return listaAutores;

    }

    async consultarCodigo(codAutor){
        const conexao = await conectar();
        const sql ="SELECT * FROM autor WHERE codAutor = ?";
        const valores = [codAutor];
        const [rows] = await conexao.query(sql, valores);
        const autor = null;
        for(const row of rows){
             autor = new Autor(
                row["codAutor"],
                row["nomeAutor"],
                row["nacionalidade"],
            ).toJson();
            
        }
        return autor;

    }
}