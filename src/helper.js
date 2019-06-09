const hbs = require('hbs')
const funciones  = require('./funciones')

hbs.registerHelper('crearCurso', (id,nombre,descripcion,valor, modalidad, intensidad)=>{
    let respuesta = funciones.crear(id,nombre,descripcion,valor,modalidad,intensidad);
    return(respuesta)
})

hbs.registerHelper('listar',()=>{
    listaCursos = funciones.listar();
    if(listaCursos.length == 0){
        let texto = '<a class="text">No hay cursos</a>'
        return texto
    }else{
        let texto = ' <table class="table table-striped table-hover"> \
                    <thead class="thead-dark">\
                    <th> Id </th>\
                    <th> Nombre </th>\
                    <th> descripcion </th>\
                    <th> valor </th>\
                    <th> modalidad </th>\
                    <th> intensidad </th>\
                    <th> Estado </th>\
                    </thead>\
                    <body>'
        listaCursos.forEach(curso => {
            texto = texto + 
            '<tr>' +
            ' <td> ' + curso.idc + '</td>' +
            ' <td> ' + curso.nombrec + '</td>' + 
            ' <td> ' + curso.descripcionc + '</td>' +
            ' <td> ' + curso.valorc + '</td>' +
            ' <td> ' + curso.modalidadc + '</td>' +
            ' <td> ' + curso.intensidadc + '</td>' +
            ' <td> ' + curso.estadoc + '</td></tr>'
        });
        texto = texto + '</body></table>'
        return texto
    }
})

hbs.registerHelper('listar2',()=>{
    listaCursos = funciones.listar();
    if(listaCursos.length == 0){
        let texto = '<a class="text">No hay cursos</a>'
        return texto
    }else{
        let texto = "<div class='accordion' id='accordionExample'>";
        i = 1;
        listaCursos.forEach(curso => {
            if(curso.estadoc == 'disponible'){
                texto = texto + 
                `<div class="card"> 
                    <div class="card-header" id="heading${i}"> 
                    <h2 class="mb-0">
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                            ${curso.nombrec}
                        </button>
                    </h2>
                    </div>

                    <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
                        <div class="card-body">
                            Descripcion: ${curso.descripcionc} <br>
                            Valor: ${curso.valorc}<br>
                            Modalidad: ${curso.modalidadc}<br>
                            Intenidad: ${curso.intensidadc}<br>
                        </div>
                    </div>
                </div>`
            }else{
                texto=texto;
            }
            i=i+1;
        });
        texto = texto + '</div>'
        return texto
    }
})

