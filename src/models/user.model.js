const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const newSchema = mongoose.Schema;

const userSchema = newSchema({
    name: { type: String, maxLenght: 50, required: true},
    email: { type: String, maxLenght: 30, required: true},
    password: { type: String, required: true},
    tokens: [
        { 
            token: {type: String, required: true}
        }
    ]
}, {
    timestamps: true,
    collection: 'users'
})

//metodo responsável por fazer o hash da senha antes de salvar a class do modelo user
userSchema.pre('save', async function(next) {
    const user = this;
    //se a senha estiver sendo modificado
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

//esse mpetodo irá criar (gerar) uma autenticação(token) para o 'User'
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id, name: user.name, email: user.email}, 'secret')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    console.log(user)

    if(!user) {
        throw new Error({ error: 'login inválido' })
    }

    //validando a senha digitado com a senha do banco
    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if(!isPasswordMatch) {
        throw new Error({ error: 'Senha inválida'})
    }

    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User