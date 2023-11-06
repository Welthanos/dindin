module.exports = {
    user(req, res, next) {
        const { nome, email, senha } = req.body;

        if (!nome) return res.status(400).json({ mensagem: 'O campo nome é obrigatório.' });
        if (!email) return res.status(400).json({ mensagem: 'O campo email é obrigatório.' });
        if (!senha) return res.status(400).json({ mensagem: 'O campo senha é obrigatório.' });

        next();
    },

    login(req, res, next) {
        const { email, senha } = req.body;

        if (!email) return res.status(400).json({ mensagem: 'O campo email é obrigatório.' });
        if (!senha) return res.status(400).json({ mensagem: 'O campo senha é obrigatório.' });

        next();
    },

    transaction(req, res, next) {
        const { tipo, descricao, valor, data, categoria_id } = req.body;

        if (!tipo) return res.status(400).json({ mensagem: 'O campo tipo é obrigatório.' });
        if (!descricao) return res.status(400).json({ mensagem: 'O campo descricao é obrigatório.' });
        if (!valor) return res.status(400).json({ mensagem: 'O campo valor é obrigatório.' });
        if (!data) return res.status(400).json({ mensagem: 'O campo data é obrigatório.' });
        if (!categoria_id) return res.status(400).json({ mensagem: 'O campo categoria_id é obrigatório.' });

        next();
    }
}