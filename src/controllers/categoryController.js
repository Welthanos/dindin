const db = require('../data/database')

module.exports = {
    async getCategories(req, res) {
        const categories = await db.selectCategories();

        return res.status(200).json(categories);
    }
}