import Livro from "../Model/livro.js";
import conectar from "./Conexao.js";

export default class LivroBD {

  async incluir(livro) {
    // verifica se livro é instancia de Livro, verifica conexao
    if (livro instanceof Livro) {
      const conexao = await conectar();
      const sql = "INSERT INTO livro(titulo, cod_autor, editora, genero, dataPublicacao, numPaginas)VALUES(?,?,?,?,?,?)";
      const valores = [livro.titulo, livro.cod_autor, livro.editora, livro.genero, livro.dataPublicacao, livro.numPaginas];
      const resultado = await conexao.query(sql, valores);
      return await resultado[0].insertId;
      // retorna o cod gerado pelo banco de dados qdo a coluna for auto incremento
    }
  }
  async alterar(livro) {
    if (livro instanceof Livro) {
      const conexao = await conectar();
      const sql =
        "UPDATE livro SET titulo=?, cod_autor=?, editora=?, genero=?, dataPublicacao=?, numPaginas=?\
                                            WHERE cod_livro=?";
      //codigo é a chave primaria
      const valores = [
        livro.titulo,
        livro.cod_autor,
        livro.editora,
        livro.genero,
        livro.dataPublicacao,
        livro.numPaginas,
        livro.codigo
      ];
      await conexao.query(sql, valores);
    }
  }
  async excluir(livro) {
    if (livro instanceof Livro) {
      const conexao = await conectar();
      const sql = "DELETE FROM livro WHERE(cod_livro=?)";

      const valores = [livro.cod_livro];
      await conexao.query(sql, valores);
    }
  }

  async consultarTodos() {
    const conexao = await conectar();
    const sql = "SELECT * FROM livro";
    const [rows] = await conexao.query(sql);
    const listaLivros = [];
    for (const row of rows) {
      const livro = new Livro(
        row["cod_livro"],
        row["titulo"],
        row["cod_autor"],
        row["editora"],
        row["genero"],
        row["dataPublicacao"],
        row["numPaginas"]
      );
      listaLivros.push(livro);
    }
    return listaLivros;
  }

  async consultar(titulo) {
    
    const conexao = await conectar();
    const sql = "SELECT * FROM livro WHERE titulo LIKE ?";
    // nao importa o que ta a direita ou a esquerda do titulo, importante é recuperar a informação do banco
    const valores = ["%" + titulo + "%"];
    // traz as linhas de informaçao
    const [rows] = await conexao.query(sql, valores);
    const listaLivros = [];
    for (const row of rows) {
      const livro = new Livro(
        row["cod_livro"],
        row["titulo"],
        row["cod_autor"],
        row["editora"],
        row["genero"],
        row["dataPublicacao"],
        row["numPaginas"]
      );
      listaLivros.push(livro);
    }
    return listaLivros;
  }
  async consultarCodigo(cod_livro) {
    const conexao = await conectar();
    const sql = "SELECT * FROM livro WHERE cod_livro = ?";
    const valores = [cod_livro];
    // traz as linhas de informaçao
    const [rows] = await conexao.query(sql, valores);
    var livro = null;
    for (const row of rows) {
      livro = new Livro(
        row["cod_livro"],
        row["titulo"],
        row["cod_autor"],
        row["editora"],
        row["genero"],
        row["dataPublicacao"],
        row["numPaginas"]
      ).toJSON();
    }
    return livro;
  }
}
