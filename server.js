const express = require('express')
    , volleyball = require('volleyball')
    , exphbs = require('express-handlebars')
    , hbs = require('hbs')
    , path = require('path')

const app = express()
    , port = process.env.PORT || 4321
    , db = require('./db/connection')

// app.engine('exphbs' , exphbs({extname: 'hbs' , defaultLayout:'layout' , layoutsDir: __dirname+'/views/layouts'}) )
// app.set('views' ,path.join(__dirname,'views'))
// app.set('view engine' , 'exphbs')

app.engine('handlebars',exphbs({
    defaultLayout:'layout'
}))

app.set('view engine','handlebars')

app.use(express.static(path.join(__dirname , "public/css/")))

app.get('/', (Req , res ) =>{
    console.log("/:", );
    db.queryRunner('SELECT todo_name FROM `todo` ' , (err , rows , fields) =>{
        if(err){
            console.log(err)
            return res.send("Error at db")
        }
        else{
            console.log(rows)
            return res.render('todos' , {rows})
        }
    })
    
})

app.listen(port , () =>{
    console.log(`Listening You at http://localhost:${port}/`)
    // console.log(__dirname)
})