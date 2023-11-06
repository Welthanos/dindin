const routes = require('express').Router();

// Controladores
const loginController = require('./controllers/loginController');
const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const transactionController = require('./controllers/transactionController');

// Intermediadores
const userAuthorization = require('./middlewares/userAuthorization');
const requiredFields = require('./middlewares/requiredFields');

// Rotas
routes.post('/usuario', requiredFields.user, userController.postUser);
routes.post('/login', requiredFields.login, loginController.login);

routes.use(userAuthorization); // Autenticação JWT

routes.get('/usuario', userController.getUser);
routes.put('/usuario', requiredFields.user, userController.putUser);

routes.get('/categoria', categoryController.getCategories);

routes.get('/transacao', transactionController.getTransactions);
routes.get('/transacao/extrato', transactionController.getTransactionStatement);
routes.get('/transacao/:id', transactionController.getTransaction);
routes.post('/transacao', requiredFields.transaction, transactionController.postTransaction);
routes.put('/transacao/:id', requiredFields.transaction, transactionController.putTransaction);
routes.delete('/transacao/:id', transactionController.deleteTransaction);

module.exports = routes;