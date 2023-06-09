const Pool = require('pg').Pool
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgresql',
})

const testConnection = async () => {
    try{
        await sequelize.authenticate();
        console.log('database connection established')
    }catch(err){
        console.log('Could not connect to the database')
        console.log(err)
    }
}

// testConnection();
// const pool = new Pool({
//     host: 'localhost',
//     port: '5432',
//     user: 'postgres',
//     password: 'password',
//     database: 'postgres'
// })

// const createUserTable = () => {
//     return pool.query('create table if not exists users_table(id serial primary key, firstname varchar(30), lastname varchar(30), username varchar(20), role varchar(10))', (err, results) => {
//         if(err){
//             console.log('ERR: ', err)
//         }

//         console.log('Response', results)
//     })
// }

// const addUser = async (userId, name, age) => {
//     let response;
//     const query = pool.query(`insert into users(id, name, age) values(${userId}, '${name}', ${age})`, (err, results) => {
//         if (err) {
//             console.log(err)
//             response = false
//         }
//         console.log('User ', results)
//         response = true
//     })

//     return response
// }
// createUserTable()
module.exports = {sq: sequelize, testConnection}