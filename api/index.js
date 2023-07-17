const express = require('express')
const cors = require('cors') //used for error with network sending credentials
const mongoose = require('mongoose')
const User = require('./models/user')
const bcrypt = require('bcryptjs') //password encryption
const app = express()
const jwt = require('jsonwebtoken')

const salt = bcrypt.genSaltSync(10)//needed to make bcrypt work
const secret = "hdfhsdhfjasdhjfsdahfsdhdf"

app.use(cors({credentials:true, origin:'http://localhost:3000'}))
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
        console.log(e) //test console.log ----delete later -aj
        res.status(400).json(e) //Error handling if user is not unique
    }
     
})

app.post('/login', async (req, res) => {
    const {username, password} = req.body
    const userDoc = await User.findOne({username}) // grabs username
    const passOk = bcrypt.compareSync(password, userDoc.password) //check encrypted password
    if(passOk){
        //user gets logged in
        jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
            if(err) throw err
            res.cookie('token', token).json('ok') //sends back a cookie
        })
    } else{
        res.status(400).json('Wrong Username or Password')
    }
})


app.get('/profile', (req,res) => {  //endpoint for profile (checking if logged in)
    res.json(req.cookies)
})
app.listen(4000)

//eM9QFIHWyEz2Wrtu --- mongo password - delete later - aj
//mongodb+srv://newsapp:eM9QFIHWyEz2Wrtu@cluster0.e8evabe.mongodb.net/?retryWrites=true&w=majority ---delete later -- aj