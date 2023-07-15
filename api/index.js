const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user')
const bcrypt = require('bcryptjs') //password encryption
const app = express()

const salt = bcrypt.genSaltSync(10)//needed to make bcrypt work

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://newsapp:eM9QFIHWyEz2Wrtu@cluster0.e8evabe.mongodb.net/?retryWrites=true&w=majority')

app.post('/register', async (req,res) => {
    const {username,password} = req.body
    try{
        const userDoc = await User.create({
            username, 
            password:bcrypt.hashSync(password, salt), //password encrytpion
        })
        res.json(userDoc)
    }   catch(e) {
        console.log(e)
        res.status(400).json(e) //Error handling if user is not unique
    }
    
    
})
app.listen(4000)

//eM9QFIHWyEz2Wrtu
//mongodb+srv://newsapp:eM9QFIHWyEz2Wrtu@cluster0.e8evabe.mongodb.net/?retryWrites=true&w=majority