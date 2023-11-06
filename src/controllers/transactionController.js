const db = require('../data/database');
const utils = require('../utils/utils');

module.exports = {
    async getTransactions(req, res) {
        const usuario_id = utils.getUserIdFromToken(req);
        const { filtro } = req.query;

        try {
            const transactions = await db.selectTransactions(usuario_id);

            if (filtro) return res.status(200).json(utils.transactionsFilter(filtro, transactions));

            return res.status(200).json(transactions);
        } catch (error) {

            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    },

    async getTransaction(req, res) {
        const { id } = req.params;
        const usuario_id = utils.getUserIdFromToken(req);

        try {
            const transaction = await db.selectTransaction(id, usuario_id);

            if (!transaction) return res.status(404).json({ mensagem: 'Transação não encontrada.' });

            return res.status(200).json(transaction);
        } catch (error) {

            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    },

    async postTransaction(req, res) {
        const { tipo, descricao, valor, data, categoria_id } = req.body;
        const usuario_id = utils.getUserIdFromToken(req);

        if (tipo !== 'entrada' && tipo !== 'saida')
            return res.status(400).json({ mensagem: 'O tipo da transação é inválido.' });

        try {
            const transaction = await db.insertTransaction(tipo, descricao, valor, data, categoria_id, usuario_id);

            return res.status(200).json(transaction);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    },

    async putTransaction(req, res) {
        const { id } = req.params;
        const { tipo, descricao, valor, data, categoria_id } = req.body;
        const usuario_id = utils.getUserIdFromToken(req);

        if (tipo !== 'entrada' && tipo !== 'saida')
            return res.status(400).json({ mensagem: 'O tipo da transação é inválido.' });

        try {
            if (await db.existsTransaction(id, usuario_id))
                return res.status(404).json({ mensagem: 'Transação não encontrada.' });

            await db.updateTransaction(id, tipo, descricao, valor, data, categoria_id, usuario_id);

            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    },

    async deleteTransaction(req, res) {
        const { id } = req.params;
        const usuario_id = utils.getUserIdFromToken(req);

        try {
            if (await db.existsTransaction(id, usuario_id))
                return res.status(404).json({ mensagem: 'Transação não encontrada.' });

            await db.deleteTransaction(id, usuario_id);

            return res.status(204).send();
        } catch (error) {

            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    },

    async getTransactionStatement(req, res) {
        const usuario_id = utils.getUserIdFromToken(req);

        try {
            const statement = await db.selectTransactionStatement(usuario_id);

            return res.status(200).json(statement);
        } catch (error) {

            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    }
}