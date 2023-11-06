const { getUserAuth } = require("../data/userToken");

module.exports = {
    getUserIdFromToken(req) {
        const bearer = req.headers.authorization;
        const token = bearer.split(' ')[1];
        const { id } = getUserAuth(token);

        return id;
    },

    transactionsFilter(filter, transactions) {
        const filteredTransactions = [];

        for (category of filter) for (obj of transactions) {
            if (obj.categoria_nome.toLowerCase() === category.toLowerCase()) {
                filteredTransactions.push(obj);
            }
        }

        return filteredTransactions;
    }
}