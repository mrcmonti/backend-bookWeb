import Emprestimo from "../Model/emprestimo.js";
import Livro from "../Model/livro.js";
import Usuario from "../Model/usuario.js";
import conectar from "./Conexao.js";

export default class EmprestimoBD {

    async incluir(emprestimo) {

        if (emprestimo instanceof Emprestimo) {
            const conexao = await conectar();
            try {
                await conexao.beginTransaction();
                const sql = "INSERT INTO emprestimo(dataEmprestimo, dataDevolucao, cpf_usuario)VALUES(?,?,?)";
                const valores = [emprestimo.dataEmprestimo, emprestimo.dataDevolucao, emprestimo.usuario.cpf_usuario];
                const resultado = await conexao.query(sql, valores);
                emprestimo.codigo_emprestimo = resultado[0].insertId;
                for (livro of emprestimo.listaLivros) {
                    const sql2 = "INSERT INTO livros_emprestimo(cod_livro, cod_emprestimo)VALUES(?,?)";
                    const parametros = [livro.livro.cod_livro, livro.emprestimo.cod_emprestimo];
                    await conexao.query(sql2, parametros);
                }

            } catch (error) {
                await conexao.rollback();
                throw error;
            }
            await conexao.commit();
        }
    }
    async consultarTodos() {

        const conexao = await conectar();

        const sql = "select * \
        from emprestimo emp \
        inner join usuario usu on usu.cpf = emp.cpf_usuario";
        const [rows] = await conexao.query(sql);
        const emprestimos = {};

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
                row["email"]).toJSON();

            const emprestimo = new Emprestimo(
                row["cod_emprestimo"],
                row["dataEmprestimo"],
                row["dataDevolucao"],
                row["cpf_usuario"],
                row["listaLivros"]).toJSON();

            emprestimos[row["cod_emprestimo"]] = { ...emprestimo, usuario, livros: [] }
        }

        const sql2 = "select * \
        from emprestimo emp \
        inner join livros_emprestimo lemp on lemp.cod_emprestimo = emp.cod_emprestimo\
        inner join livro liv on liv.cod_livro = lemp.cod_livro";

        const [rows2] = await conexao.query(sql2);

        for (const row of rows2) {
            const emp = emprestimos[row["cod_emprestimo"]];

            const livro = new Livro(
                row["cod_livro"],
                row["titulo"],
                row["autor"],
                row["editora"],
                row["genero"],
                row["dataPublicacao"],
                row["numPaginas"]).toJSON();

            emp.livros = [...emp.livros, livro]
        }

        return Object.values(emprestimos);
    }
}

//implementação N:N mudanças