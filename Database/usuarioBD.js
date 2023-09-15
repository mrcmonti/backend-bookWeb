import Usuario from "../Model/usuario.js";
import conectar from "./Conexao.js"

export default class UsuarioBD{

    async incluir(usuario) {
        
        if (usuario instanceof Usuario) {
          const conexao = await conectar();
          const sql = "INSERT INTO usuario(nome, rua, numero, bairro, estado, cep, cpf, dataNasc, celular, email)VALUES(?,?,?,?,?,?,?,?,?,?)";
          const valores = [usuario.nome, usuario.rua, usuario.numero, usuario.bairro, usuario.estado, usuario.cep, usuario.cpf, usuario.dataNasc, usuario.celular, usuario.email];
          const resultado = await conexao.query(sql, valores);
          return await resultado;
        }
    }
    async alterar(usuario) {
        if (usuario instanceof Usuario) {
          const conexao = await conectar();
          const sql =
            "UPDATE usuario SET nome=?, rua=?, numero=?, bairro=?, estado=?, cep=?, dataNasc=?, celular=?, email=?\
                                                WHERE cpf=?";
          //cpf é a chave primaria
          const valores = [
            usuario.nome,
            usuario.rua,
            usuario.numero,
            usuario.bairro,
            usuario.estado,
            usuario.cep,
            usuario.dataNasc,
            usuario.celular,
            usuario.email,
            usuario.cpf
          ];
          await conexao.query(sql, valores);
        }
      }

      async excluir(usuario) {
        if (usuario instanceof Usuario) {
          const conexao = await conectar();
          const sql = "DELETE FROM usuario WHERE(cpf=?)";
          const valores = [usuario.cpf];
          await conexao.query(sql, valores);
        }
      }

      async consultarTodos() {
        const conexao = await conectar();
    
        const sql = "SELECT * FROM usuario";
        const [rows] = await conexao.query(sql);
        const listaUsuarios = [];
        for (const row of rows) {
          const usuario = new Usuario(
            row["nome"],
            row["rua"],
            row["numero"],
            row["bairro"],
            row["estado"],
            row["cep"],
            row["cpf"],
            row["dataNasc"],
            row["celular"],
            row["email"]
          );
          listaUsuarios.push(usuario);
        }
        return listaUsuarios;
      }

      async consultarNome(nome) {

        const conexao = await conectar();
        const sql = "SELECT * FROM nome WHERE nome LIKE ?";
        const valores = ["%" + nome + "%"];
        // traz as linhas de informaçao
        const [rows] = await conexao.query(sql, valores);
        const listaUsuarios = [];
        for (const row of rows) {
          const usuario = new Usuario(
            row["nome"],
            row["rua"],
            row["numero"],
            row["bairro"],
            row["estado"],
            row["cep"],
            row["cpf"],
            row["dataNasc"],
            row["celular"],
            row["email"]
          );

          
          listaUsuarios.push(usuario);
        }
        return listaUsuarios;
      }


      async consultarCpf(cpf) {
        const conexao = await conectar();
        const sql = "SELECT * FROM usuario WHERE cpf = ?";
        const valores = [cpf];
        // traz as linhas de informaçao
        const [rows] = await conexao.query(sql, valores);
        var usuario = null;
        for (const row of rows) {
          usuario = new Usuario(
            row["nome"],
            row["rua"],
            row["numero"],
            row["bairro"],
            row["estado"],
            row["cep"],
            row["cpf"],
            row["dataNasc"],
            row["celular"],
            row["email"]
          ).toJSON();
        }
        return usuario;
      }
}




