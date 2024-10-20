const express = require('express')
const app = express()
const path=require('path')
const fs = require('fs')
const { isUtf8 } = require('buffer')


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('view engine','ejs')

app.use(express.static(path.join(__dirname,'public')))

app.get('/',function(req,res){
    fs.readdir('./files',function(err,files){
        // console.log(files)
        res.render('index',{files:files})
    })
})

app.post('/create',function(req,res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,`${req.body.details}`,function(err){
        res.redirect('/')

    })
})

app.get('/read/:filename',function(req,res){
    fs.readFile(`./files/${req.params.filename}`,'Utf8',function(err,data){
        res.render('show',{filename:req.params.filename , data:data})
    })
})

app.get('/edit/:filename',function(req,res){
    res.render('edit',{filename:req.params.filename})
})

app.post('/edit',function(req,res){
    fs.rename(`./files/${req.body.old}`,`./files/${req.body.new}.txt`,function(err){
        res.redirect('/')
    })
    // console.log(req.body)
})

app.listen(2000)