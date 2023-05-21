const express = require('express')
const router = express.Router();
const db = require('../db')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/')
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({storage: storage}).single('myfile')
// router.route('/')
// router.get('/', (req, res, next) => {
//      db.createUserTable()
//     res.send('Get all users.')
// })
const users = [
    {
        firstname: 'Asfsd',
        lastname: 'dkfjdf'
    },
    {
        firstname: 'Asfdfdsd',
        lastname: 'dkfjdsdff'
    },{
        firstname: 'Asfdfdsd',
        lastname: 'dkfzxcvjdf'
    }
]
router.get('/', async (req, res) => {
    const users = await db.query(`select * from users_table;`)
    res.render('users', {users: users.rows})
})

router.get('/create', (req, res) => {
    res.render('createuser', {firstname: 'My name'})
})

router.get('/list', async (req, res) => {
    const users = await db.query(`select * from users_table;`)
    console.log(users)
    res.status(200).json(users.rows)
})

router.post('/create', async (req, res) => {
    console.log(req.body)
    const {firstname, lastname, username, role} = req.body
    // users.push({firstname, lastname, username})
    const user = await db.query(`select * from users_table where username = '${username}';`)
    console.log('Users', user)
    if(user.rows.length) {
        return res.status(400).send('User already exists.')
    }
    const newUser = await db.query(`insert into users_table(firstname, lastname, username, role) values('${firstname}', '${lastname}', '${username}', '${role}')`)
    console.log(newUser)

    // upload(req, res, (err) => {
    //     if(err){
    //        return res.send('Error uploading file')

    //     }
    //     console.log('File uploaded successfully.')
    //     return res.render('users', {users})
    // })
    res.send('User create')
})

// router.post('/', async (req, res) => {
//     const {id, name, age} = req.body;
//     const user = await db.addUser(id, name, age)
//     if(user){
//         return res.json({message: 'User created successfully', success: true})
//     }
//     return res.status(400).send('Error while creating a user')

// })

router.get('/user/:id', (req, res) => {
    console.log(req.body)
    console.log('Query Params', req.query)
    res.setHeader('Content-Type', 'plain/text')
    res.json({id: 1, name: "John"})
})


module.exports = router;