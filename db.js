const Pool = require('pg').Pool

const pool = new Pool({
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: 'password',
    database: 'postgres'
})

const createUserTable = () => {
    return pool.query('create table if not exists users(id int primary key, name varchar(30), age int)', (err, results) => {
        if(err){
            console.log('ERR: ', err)
        }

        console.log('Response', results)
    })
}

const addUser = async (userId, name, age) => {
    let response;
    const query = await pool.query(`insert into users(id, name, age) values(${userId}, '${name}', ${age})`, (err, results) => {
        if(err){
            console.log(err)
            response = false
        }
        console.log('User', results)
        response = true
    })

    return response
}

module.exports = pool