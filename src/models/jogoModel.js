import conexao from "../../db.js";

function listar(callback) {
    conexao.query(
        "SELECT * FROM jogos ORDER BY id",
        callback
    );
}

function buscarPorId(id, callback) {
    conexao.query(
        "SELECT * FROM jogos WHERE id = ?",
        [id],
        callback
    );
}

function cadastrar(dados, callback) {
    conexao.query(
        "INSERT INTO jogos (titulo, ano_lancamento, estudio_id) VALUES (?, ?, ?)",
        [dados.titulo, dados.ano_lancamento, dados.estudio_id],
        callback
    );
}

function atualizar(id, dados, callback) {
    conexao.query(
        "UPDATE jogos SET titulo = ?, ano_lancamento = ?, estudio_id = ? WHERE id = ?",
        [dados.titulo, dados.ano_lancamento, dados.estudio_id, id],
        callback
    );
}

function excluir(id, callback) {
    conexao.query(
        "DELETE FROM jogos WHERE id = ?",
        [id],
        callback
    );
}

export default {
    listar,
    buscarPorId,
    cadastrar,
    atualizar,
    excluir
};