const fs =  require('fs')
listaCursos = []

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
        return('Curso creado')
    }else{
        return('No se pueden crear dos cursos iguales')
    }
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


const guardar =()=>{
    let datos = JSON.stringify(listaCursos)
    fs.writeFile('src/lista-cursos.json',datos,(error)=>{
        if(error)throw(error)
        console.log('Archivo creado')
    })
}


module.exports={
    crear,
    listar
}