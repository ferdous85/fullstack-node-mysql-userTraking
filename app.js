const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')
const bodyParser = require('body-parser')

require('dotenv').config()
//routes
const routes = require('./server/routes/userRouter')

const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const port = process.env.PORT || 5000

//static file
app.use(express.static('public'))

// template engine
app.engine('hbs', exphbs({extname: '.hbs'}))
app.set('view engine', 'hbs')

//router
app.use('/', routes)

//connection
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,   
    database: process.env.DB_NAME
})

// connection to DB
pool.getConnection((err, connection)=>{
    if(err) throw err
    console.log('connected as ID'+ connection.threadId);
})




// router
app.get('', (req, res)=>{
    res.render('home')
})

app.listen(port, ()=>{
    console.log(`Server is runnign ${port}`);
})