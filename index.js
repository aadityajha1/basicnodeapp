const express = require('express')
const app = express();
const users = require('./users.json')
const bodyParser = require('body-parser')

// app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

app.use(express.json())
const usersRouter = require('./routes/users')

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
    console.log('App is listening at port 8000')
})
// const users = require('./users.json')