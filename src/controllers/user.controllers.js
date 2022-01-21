const User = require('../models/user.model')

// guria do video prefere metodo async e await

// metodo responsavel
//registerNewUser = mesmo método que foi criado em "routes > user.routes"
exports.registerNewUser = async(req, res) => {
    try {
        let isUser = await User.find({ email: req.body.email })
        if(isUser.lenght >= 1) {
            return res.status(409).json({ Messsage: "desculpe, esse email já está registrado" })
        }

        const newUser = new User(req.body)
        // .save = é um método do mongoose para salver no bando
        const user = await newUser.save()

        //generateAuthToken() = é uma funcao usada para criar token, criarda em "model > user.model"
        const token = await newUser.generateAuthToken()
        res.status(201).json({ message: 'User created success successfully', user, token })
    } catch (err) {
        res.status(400).json({ err: err })
    }
}

//Todo = para fazer
exports.loginUser = async(req,res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        
        //usando o método criado em "models > user.models" para verificar se o usuário já existe
        // tem diferenaça entre User com U maiusculo e u minisculo
        const user = await User.findByCredentials(email, password)

        if(!user) {
            res.status(400).json({ err: 'Erro ao realizar o login verificar se o email e senha estão corretos'})
        }

        //gerando um token
        const token = await user.generateAuthToken()
        res.status(200).json({ message: 'Usuário logado com sucesso: ', user, token })

    } catch (err) {
        res.status(400).json({ err: err})
    }
}

//todo = para fazer
exports.returnUserProfile = async (req, res) => {
    await res.json(req.userData);
};

//retornar TODOS os dados do usuário logado
exports.returnUserDashboard = async (req, res) => {
    try {
        const id = req.query.id
        const user = await User.findById(id)
        res.status(200).json({ message: 'Usuário sucesso: ', user})
        console.log(user.email)
    } catch (error) {
        res.status(400).json({ err: err })
    }
}