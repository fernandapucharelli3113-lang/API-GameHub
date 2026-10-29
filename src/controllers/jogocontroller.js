import jogoModel from "../models/jogoModel.js";
import {
    textoValido,
    inteiroPositivo
} from "../utils/validacoes.js";

function listar(req, res, next) {
    jogoModel.listar((erro, resultado) => {
        if (erro) return next(erro);

        return res.status(200).json(resultado);
    });
}

function buscarPorId(req, res, next) {
    jogoModel.buscarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);

        if (resultado.length === 0) {
            return res.status(404).json({
                erro: "Jogo não encontrado"
            });
        }

        return res.status(200).json(resultado[0]);
    });
}

function cadastrar(req, res, next) {
    const {
        titulo,
        ano_lancamento,
        estudio_id
    } = req.body ?? {};

    if (
        !textoValido(titulo, 150) ||
        !inteiroPositivo(ano_lancamento) ||
        ano_lancamento > 9999 ||
        !inteiroPositivo(estudio_id)
    ) {
        return res.status(400).json({
            erro: "Informe titulo (até 150 caracteres), ano_lancamento de 1 a 9999 e estudio_id inteiro positivo"
        });
    }

    const dados = {
        titulo: titulo.trim(),
        ano_lancamento,
        estudio_id
    };

    jogoModel.cadastrar(dados, (erro, resultado) => {
        if (erro) return next(erro);

        return res.status(201).json({
            mensagem: "Jogo cadastrado com sucesso",
            id: resultado.insertId
        });
    });
}

function atualizar(req, res, next) {
    const {
        titulo,
        ano_lancamento,
        estudio_id
    } = req.body ?? {};

    if (
        !textoValido(titulo, 150) ||
        !inteiroPositivo(ano_lancamento) ||
        ano_lancamento > 9999 ||
        !inteiroPositivo(estudio_id)
    ) {
        return res.status(400).json({
            erro: "Informe titulo (até 150 caracteres), ano_lancamento de 1 a 9999 e estudio_id inteiro positivo"
        });
    }

    const dados = {
        titulo: titulo.trim(),
        ano_lancamento,
        estudio_id
    };

    jogoModel.buscarPorId(req.id, (erro, registros) => {
        if (erro) return next(erro);

        if (registros.length === 0) {
            return res.status(404).json({
                erro: "Jogo não encontrado"
            });
        }

        jogoModel.atualizar(req.id, dados, (erro) => {
            if (erro) return next(erro);

            return res.status(200).json({
                mensagem: "Jogo atualizado com sucesso"
            });
        });
    });
}

function excluir(req, res, next) {
    jogoModel.excluir(req.id, (erro, resultado) => {
        if (erro) return next(erro);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                erro: "Jogo não encontrado"
            });
        }

        return res.status(200).json({
            mensagem: "Jogo excluído com sucesso"
        });
    });
}

export default {
    listar,
    buscarPorId,
    cadastrar,
    atualizar,
    excluir
};