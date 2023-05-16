const express = require('express')
require('dotenv').config()
const app = express();
const users = require('./users.json')
const bodyParser = require('body-parser')
const jsonwebtoken = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

// app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.json())
const usersRouter = require('./routes/users');
const pool = require('./db');

const authHelper = (req, res, next) => {
    try{
        const authToken = req.headers.authorization.split(' ')[1];
        console.log('Token', authToken)
        console.log('Secret:: ', process.env.JWT_SECRET)
        const cookieToken = req.signedCookies['authToken'] //req.signedCookies['name']
        console.log('Cookie token', cookieToken)
        const decodeToken = jsonwebtoken.verify(authToken, process.env.JWT_SECRET)
        console.log('Decoded token  ', decodeToken)
        next()
    }catch(err){
        console.log(err)
        return res.status(401).send('User Unauthorized')
    }
}

app.post('/login', (req, res) => {
    const {username, password} = req.body
    if(username == 'admin' && password === 'admin'){
        const token = jsonwebtoken.sign({username}, process.env.JWT_SECRET)
        console.log(token)
        res.cookie('authToken', token, {maxAge: 10000, signed: true})
        return res.status(200).json({success: true, token, message: 'User authenticated successfully.'})
    }
    return res.status(401).send('Invalid username or password.')
})
// app.use(authHelper)

app.get('/getAll', authHelper, async (req, res) => {
    const users = await  pool.query('select * from users_table;')
    // console.log(users)
    return res.json(users.rows)
})
app.use('/users', usersRouter)

// app.get('/', (req, res, next) => {

//     res.status(200).json(users)
// })

// // GET, POST, PUT, DELETE & PATCH
// // app.

// app.get('/users/:id', (req, res, next)=> {
//     const id = req.params.id
//     console.log(id)
//     const user = users.filter((u) => u.id == id)
//     if(!user.length){
//         res.status(400).send('User not found')
//         return
//     }
//     console.log(user)
//     res.status(200).json(user)
// })



app.listen(8080, () => {
    console.log('App is listening at port 8080')
})
// const users = require('./users.json')