const bcrypt = require('bcrypt');
const db = require('../data/database');

const { createUserToken } = require('../data/userToken');

module.exports = {
    async login(req, res) {
        const { email, senha } = req.body;

        try {
            const user = await db.getUserByEmail(email);

            if (!user) return res.status(403).json({ mensagem: 'Usuário ou senha inválida.' });

            const matched = await bcrypt.compare(senha, user.senha);

            if (!matched) return res.status(403).json({ mensagem: 'Usuário ou senha inválida.' });

            const token = createUserToken({ id: user.id });
            const userAuth = {
                usuario: {
                    id: user.id,
                    nome: user.nome,
                    email: email
                },
                token: token
            };

            return res.status(200).json(userAuth);
        } catch (error) {

            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    }
}