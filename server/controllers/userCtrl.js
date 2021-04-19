const mysql = require('mysql')

//connection
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,   
    database: process.env.DB_NAME
})

const userCtrl ={
        view: (req, res)=>{
                // connection to DB
                pool.getConnection((err, connection)=>{
                    if(err) throw err
                    console.log('connected as ID'+ connection.threadId);

                //user connection
                connection.query('SELECT * FROM user WHERE status ="active"', (err, rows)=>{
                    // when done with the connection, release it
                    connection.release();
                    if(!err){
                        res.render('home', {rows})   
                    } else{
                        console.log(err);
                    }
                    
                } )    
                })

        },
        find: (req, res) => {
            pool.getConnection((err, connection) => {
              if (err) throw err; // not connected!
              console.log('Connected as ID ' + connection.threadId);
              let searchTerm = req.body.search;
              // User the connection
              connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
                // When done with the connection, release it
                connection.release();
                if (!err) {
                  res.render('home', { rows });
                } else {
                  console.log(err);
                }
                console.log('The data from user table: \n', rows);
              });
            });
          },
        form:(req, res)=>{
              res.render('addUser')
          }
          ,
        create: (req, res)=>{
            const {first_name, last_name, email, phone, comments}=req.body
            pool.getConnection((err, connection) => {

                if (err) throw err; // not connected!
                console.log('Connected as ID ' + connection.threadId);
               
                // User the connection
                connection.query("INSERT INTO user SET first_name=?, last_name=?, email=?, phone=?, comments=?",
                [first_name, last_name, email, phone, comments] ,(err, rows) => {
                  // When done with the connection, release it
                  connection.release();
                  if (!err) {
                    res.render('addUser', {alert: 'User added successfully'});
                    
                  } else {
                    console.log(err);
                  }
                  console.log('The data from user table: \n', rows);
                });
              });
        },
        edit: (req, res)=>{
             // connection to DB
             pool.getConnection((err, connection)=>{
                if(err) throw err
                console.log('connected as ID'+ connection.threadId);

            //user connection
            connection.query('SELECT * FROM user WHERE id =?',[req.params.id], (err, rows)=>{
                // when done with the connection, release it
                connection.release();
                if(!err){
                    res.render('editUser', {rows})   
                } else{
                    console.log(err);
                }
                
            } )    
            })

            
        },
        update: (req, res)=>{
            const {first_name, last_name, email, phone, comments}=req.body
            // connection to DB
            pool.getConnection((err, connection)=>{
                if(err) throw err
                console.log('connected as ID'+ connection.threadId);

            //user connection
            connection.query('UPDATE user SET first_name=?, last_name=? WHERE id=?',[first_name, last_name, req.params.id], (err, rows)=>{
                // when done with the connection, release it
                connection.release();
                if(!err){
                   
                    pool.getConnection((err, connection)=>{
                        if(err) throw err
                        console.log('connected as ID'+ connection.threadId);
        
                    //user connection
                    connection.query('SELECT * FROM user WHERE id =?',[req.params.id], (err, rows)=>{
                        // when done with the connection, release it
                        connection.release();
                        if(!err){
                            res.render('editUser', {rows})   
                        } else{
                            console.log(err);
                        }
                        
                    } )    
                    })
                    
                } else{
                    console.log(err);
                }
                
            } )    
            })
        }
        
}



module.exports = userCtrl