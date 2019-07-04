const mysql = require('mysql'); 
 
const pool  = mysql.createPool({
    connectionLimit: 10, //important
    host: 'localhost',
    user: 'root',
    database: 'todo_app',
    debug: false
});

// a query runner function
function queryRunner( query , cb ){
    pool.getConnection((err , connection) =>{
        if(err){
            connection.release()
            next(err)
        }
        else{
            connection.query(query , (err , rows , fields) =>{
                connection.release()
                cb(err , rows , fields)
            })
        }
    })
}



module.exports = {pool , queryRunner }



