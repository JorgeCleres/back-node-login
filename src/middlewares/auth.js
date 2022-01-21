// verificando se o usuário tem autorização para fazer o login
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '');
        // ==> um console para termos uma saída do 'token'

        //verify = é um metodo jwt para verificar se o tojen é valido
            //secret =  vem do arquivo "config > db.config" onde foi definido password como secret
        const decoded = jwt.verify(token, 'secret');
        req.userData = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Falha na Autenticação!' });
    }
  };
