const bcrypt = require('bcrypt');
const db = require('../data/database');
const utils = require('../utils/utils');

module.exports = {
    async postUser(req, res) {
        const { nome, email, senha } = req.body;

        try {
            if (await db.existsUserEmail(email))
                return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' });

            const cryptPass = await bcrypt.hash(senha, 10);
            const user = await db.insertUser(nome, email, cryptPass);

            return res.status(201).json(user);
        } catch (error) {

            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    },

    async getUser(req, res) {
        const id = utils.getUserIdFromToken(req);

        try {
            const user = await db.selectUser(id);
            delete user.senha;

            return res.status(200).json(user);
        } catch (error) {

            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    },

    async putUser(req, res) {
        const id = utils.getUserIdFromToken(req);
        const { nome, email, senha } = req.body;

        try {
            const currentEmail = await db.getEmailById(id);

            if (await db.existsUserEmail(email) && currentEmail !== email)
                return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' });

            const cryptPass = await bcrypt.hash(senha, 10);
            await db.updateUser(id, nome, email, cryptPass);

            return res.status(204).send();
        } catch (error) {

            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    }
}