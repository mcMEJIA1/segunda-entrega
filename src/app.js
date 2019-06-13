const express = require('express')
const app = express()
const path = require('path')
const hbs =  require('hbs')
const bodyParser = require('body-parser')
require('./helper.js')
const funciones  = require('./funciones')
var session = require('express-session')


const directoriopubico =  path.join(__dirname,'../public')
const directiriopartials =  path.join(__dirname,'../partials')
app.use(express.static(directoriopubico))
hbs.registerPartials(directiriopartials)
app.use(bodyParser.urlencoded({extended : false}))

app.set('view engine','hbs')

app.get('/', (req,res)=>{
    res.render('index',{
        titulo: 'Inincio'
    })
})


app.get('/cursosdisponibles',(req,res)=>{
    res.render('cursosdisponibles',{
        titulo: 'Cursos disponibles'
    })
})
app.get('/crear',(req,res)=>{
    console.log(req.query)
    res.render('crear',{
        titulo: 'Crear nuevo curso'
    })
})

app.post('/curso',(req,res)=>{
    res.render('curso',{
        id: parseInt(req.body.id),
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        valor: parseInt(req.body.valor),
        modalidad: req.body.modalidad,
        intensidad: parseInt(req.body.intensidad)
    })
})

app.get('/cursos',(req,res)=>{
    funciones.modificar(req.query.id,req.query.estado)
    res.render('cursos',{
        titulo: 'Ver cursos como Administrador',
        
    })
})

app.get('/inscribircurso',(req,res)=>{
    funciones.inscripcion(req.query.cursoid, req.query.id)
    res.render('inscribircurso',{
        titulo: 'Matricular curso'
    })
})

app.get('/registro',(req,res)=>{
    let respuesta = funciones.registrar(req.query.id, req.query.nombre, req.query.mail, req.query.numero)
    res.render('registro',{
        titulo: 'Registrar',
        res: respuesta
    })
})

console.log(__dirname)

app.listen(4000,()=>{
    console.log('Escuchando por el puerto 4000')
})