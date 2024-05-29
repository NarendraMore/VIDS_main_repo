const mongoose = require('mongoose')
mongoose.set('strictQuery', true);


const loginSchema = mongoose.Schema({
    
    password:{
        type:String,required: true
    }
    
    })

const Login = mongoose.model('Login',loginSchema)

module.exports= Login