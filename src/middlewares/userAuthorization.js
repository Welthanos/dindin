const { getUserAuth } = require("../data/userToken");

module.exports = (req, res, next) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        return res.status(403).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });
    }

    const token = bearer.split(' ')[1];
    const user = getUserAuth(token);

    if (!user) {
        return res.status(401).json({ mensagem: 'Usuário não autenticado.' });
    }

    next();
}