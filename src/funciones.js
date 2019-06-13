const fs =  require('fs')
listaCursos = []
listaUsers =[]
listaInscripciones = []

const crear = (id,nombre,descripcion,valor,modalidad,intensidad)=>{
    listar()
    let cur ={
        idc: id,
        nombrec: nombre,
        descripcionc: descripcion,
        valorc: valor,
        modalidadc: modalidad,
        intensidadc: intensidad,
        estadoc: 'disponible'
    }
    let duplicado =  listaCursos.find(id => id.idc == cur.idc)
    if(!duplicado){
        listaCursos.push(cur)
        console.log(listaCursos)
        guardar()
        return('<a class="text">Curso creado</a>')
    }else{
        return('<a class="text">No se pueden crear dos cursos iguales</a>')
    }
}

const registrar =(id,nombre,mail,numero)=>{
    listarUser()
    let usr = {
        idu: id,
        nombreu: nombre,
        mailu: mail,
        numerou: numero,
        rol: 'aspirante'
    }
    let duplicado = listaUsers.find(id=> id.idu == usr.idu)
    if(!duplicado){
        listaUsers.push(usr)
        console.log(listaUsers)
        guardarUser()
        
    }else{
        console.log('error')
    }
}

const inscripcion =(cursoid, id)=>{
    listar()
    listarUser()
    listaI()

    let curso = crearc(cursoid)
    let alumns
    let ins = listaInscripciones.filter(ins=> ins.idci == cursoid)
    if(ins.length > 0){
        alumns =ins[0].estudiantes
    }

    let array = [alumns]
    let duplicado = array.find(ida=> ida == id)
    console.log(alumns)
    let alum =  listaUsers.find(usr=> usr.idu == id)
    if(!alum){
        console.log('Alumno no existe' + id)
    }else{
        if(!duplicado){
            if(ins.length > 0){
                array.push(id)
            }else{
                let newI = crearI(alum, curso)
                listaInscripciones.push(newI)
                console.log('inscripcion creada')
                
            }
            guardarI()
        }else{
            console.log('No se puede matricular 2 veces')
        }
    }
}

const crearI =(user, curso)=>{
    let insc = {
        idci: curso.idc,
        nombreci: curso.nombrec,
        estudiantes: [user.idu]
    }
    return(insc)
}

const crearc = (id)=>{
    let curso =  listaCursos
                    .filter(curso => curso.id === id);
    return curso[0];
}

const listar =()=>{
    try{
        listaCursos = JSON.parse(fs.readFileSync('./src/lista-cursos.json'))
        return (listaCursos)
    }catch(error){
        listaCursos =[]
        return(listaCursos)
    }
}

const listarUser=()=>{
    try{
        listaUsers = JSON.parse(fs.readFileSync('./src/lista-users.json'))
        return (listarUser)
    }catch(error){
        listaUsers =[]
        return(listaUsers)
    }
}

const listaI = ()=>{
    try{
        listaInscripciones = JSON.parse(fs,readFileSync('./src/lista-inscripciones.json'))
        return(listaInscripciones)
    }catch(error){
        listaInscripciones = []
        return(listaInscripciones)
    }
}

const guardar =()=>{
    let datos = JSON.stringify(listaCursos)
    fs.writeFile('src/lista-cursos.json',datos,(error)=>{
        if(error)throw(error)
        console.log('Archivo creado')
    })
}

const guardarUser =()=>{
    let users = JSON.stringify(listaUsers)
    fs.writeFile('src/lista-users.json',users,(error)=>{
        if(error)throw(error)
        console.log('Archivo creado')
    })
}

const guardarI =() =>{
    let ins = JSON.stringify(listaInscripciones)
    fs.writeFile('src/lista-inscripciones.json',ins,(error)=>{
        if(error)throw(error)
        console.log('Archivo creado')
    })
}

let modificar =(id, estado)=>{
    listar()
    let curso = listaCursos.find(curso=> curso.idc == id)
    if(!curso){
        return('')
    }else{
        curso['estadoc']= estado
        guardar()
        return('')
    }
}



module.exports={
    crear,
    listar,
    modificar,
    registrar,
    inscripcion
}