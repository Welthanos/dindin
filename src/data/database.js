require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
});

module.exports = {

    // Queries para tabela usuarios
    async insertUser(nome, email, senha) {
        const sql = `INSERT INTO usuarios(nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email`;
        const values = [nome, email, senha];
        const { rows } = await pool.query(sql, values);

        return rows[0];
    },

    async selectUser(id) {
        const sql = `SELECT * FROM usuarios WHERE id = $1`;
        const values = [id];
        const { rows } = await pool.query(sql, values);

        return rows[0];
    },

    async updateUser(id, nome, email, senha) {
        const sql = `UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4`;
        const values = [nome, email, senha, id];
        await pool.query(sql, values);
    },

    // Queries para tabela categorias
    async selectCategories() {
        const sql = `SELECT * FROM categorias`;
        const { rows } = await pool.query(sql);

        return rows;
    },

    // Queries para tabela transacoes
    async selectTransactions(usuario_id) {
        const sql = `SELECT t.*, c.descricao AS categoria_nome
                     FROM transacoes t 
                     INNER JOIN categorias c 
                     ON t.categoria_id = c.id 
                     WHERE usuario_id = $1`;
        const values = [usuario_id];
        const { rows } = await pool.query(sql, values);

        return rows;
    },

    async selectTransaction(id, usuario_id) {
        const sql = `SELECT t.*, c.descricao AS categoria_nome
                     FROM transacoes t 
                     INNER JOIN categorias c 
                     ON t.categoria_id = c.id 
                     WHERE t.id = $1
                     AND usuario_id = $2`;
        const values = [id, usuario_id];
        const { rows } = await pool.query(sql, values);

        return rows[0];
    },

    async insertTransaction(tipo, descricao, valor, data, categoria_id, usuario_id) {
        const sql = `INSERT INTO transacoes(tipo, descricao, valor, data, categoria_id, usuario_id)
                     VALUES ($1, $2, $3, $4, $5, $6) 
                     RETURNING *,
                        (SELECT descricao FROM categorias WHERE id = $5) AS categoria_nome`;
        const values = [tipo, descricao, valor, data, categoria_id, usuario_id];
        const { rows } = await pool.query(sql, values);

        return rows[0];
    },

    async updateTransaction(id, tipo, descricao, valor, data, categoria_id, usuario_id) {
        const sql = `UPDATE transacoes 
                     SET tipo = $1, descricao = $2, valor = $3, data = $4, categoria_id = $5
                     WHERE id = $6 
                     AND usuario_id = $7`;
        const values = [tipo, descricao, valor, data, categoria_id, id, usuario_id];
        await pool.query(sql, values);
    },

    async deleteTransaction(id, usuario_id) {
        const sql = `DELETE FROM transacoes WHERE id = $1 AND usuario_id = $2`;
        const values = [id, usuario_id];
        await pool.query(sql, values);
    },

    async selectTransactionStatement(usuario_id) {
        const sql = `SELECT
                        COALESCE(SUM(CASE WHEN tipo = 'entrada' THEN valor ELSE 0 END), 0)::INTEGER AS entrada,
                        COALESCE(SUM(CASE WHEN tipo = 'saida' THEN valor ELSE 0 END), 0)::INTEGER AS saida
                    FROM transacoes
                    WHERE usuario_id = $1`;
        const values = [usuario_id];
        const { rows } = await pool.query(sql, values);

        return rows[0];
    },

    // Queries auxiliares
    async existsUserEmail(email) {
        const sql = `SELECT COUNT(*) FROM usuarios WHERE email = $1`;
        const values = [email];
        const { rows } = await pool.query(sql, values);

        return rows[0].count != 0;
    },

    async existsTransaction(id, usuario_id) {
        const sql = `SELECT COUNT(*) FROM transacoes WHERE id = $1 AND usuario_id = $2`;
        const values = [id, usuario_id];
        const { rows } = await pool.query(sql, values);

        return rows[0].count == 0;
    },

    async getUserByEmail(email) {
        const sql = `SELECT id, nome, senha FROM usuarios WHERE email = $1`;
        const values = [email];
        const { rows } = await pool.query(sql, values);

        return rows[0];
    },

    async getEmailById(id) {
        const sql = `SELECT email FROM usuarios WHERE id = $1`;
        const values = [id];
        const { rows } = await pool.query(sql, values);

        return rows[0].email;
    }
};