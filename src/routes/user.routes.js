const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controllers')
const auth = require('../middlewares/auth')

// rota responsável por criar um novo User: (post) localhost:api/v1/register
// registerNewUser = é um método criado por mim em "controllers > user.controllers"
router.post('/register', userController.registerNewUser)

// rota responsável por criar um novo User: (post) localhost:api/v1/login
// loginUser = é um método criado por mim em "controllers > user.controllers"
router.post('/login', userController.loginUser)

// rota responsável por criar um novo User: (get) localhost:api/v1/userProfile
// returnUserProfile = é um método criado por mim
    //auth = verifica se o token é valido e depois vai executar o 'returnUserProfile'
router.get('/userProfile', auth, userController.returnUserProfile)

router.get('/dashboard', userController.returnUserDashboard)

module.exports = router