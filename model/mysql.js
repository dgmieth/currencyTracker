//npm modules
const mysql = require('mysql2/promise')
//pool creation
const pool = mysql.createPool({
    multipleStatements: true,
    host: process.env.DB_HOST,
    database: process.env.DB_DB,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    dateStrings: 'date'
})
pool.query(`SET time_zone = 'America/New_York';SELECT DATE_FORMAT(NOW(),'%Y-%m-%d') as date;`)
.then(([d,ex])=>{
    console.log(d[1][0].date)
})
.catch(err => {
    console.log(err)
})
pool.on('connection', con => {
    console.log(con.threadId)
})
module.exports = pool