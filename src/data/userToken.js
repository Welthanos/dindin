require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = {
    createUserToken(user) {
        return jwt.sign(user, process.env.JWTPASSWORD, { expiresIn: process.env.EXPIRES });
    },

    getUserAuth(token) {
        try {
            return jwt.verify(token, process.env.JWTPASSWORD);
        } catch (error) {
            return;
        }
    }
}