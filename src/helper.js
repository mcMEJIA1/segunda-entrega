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
        let texto = `<div class="row">`;
        i = 1;
        listaCursos.forEach(curso => {
            if(curso.estadoc == 'disponible'){
                texto = texto + 
                `<div class="col">
                    <div class='accordion' id='accordionExample'>
                        <div class="card"> 
                            <div class="card-header" id="heading${i}"> 
                                <h2 class="mb-0">
                                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                                        Nombre: ${curso.nombrec} <br>
                                        Valor: ${curso.valorc}<br>
                                    </button>
                                </h2>
                            </div>

                            <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
                                <div class="card-body">
                                    Descripcion: ${curso.descripcionc} <br>
                                    Modalidad: ${curso.modalidadc}<br>
                                    Intensidad: ${curso.intensidadc}<br>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
            }else{
                texto=texto;
            }
            i=i+1;
        });
        texto = texto + '</div></div>'
        return texto
    }
})


hbs.registerHelper('cursos', ()=>{
    listaCursos = funciones.listar();
    if(listaCursos.length == 0){
        let texto = ''
        return texto
    }else{
        let texto = "";
        listaCursos.forEach(curso=>{
            texto = texto + `<option value='${curso.idc}'>${curso.nombrec}</option>`
        }) 
        return texto
    }
})

hbs.registerHelper('inscribir',()=>{
    listaCursos = funciones.listar();
    let texto = ' <table class="table table-striped table-hover"> \
                    <thead class="thead-dark">\
                    <th> Id </th>\
                    <th> Nombre </th>\
                    <th> descripcion </th>\
                    <th> valor </th>\
                    <th> modalidad </th>\
                    <th> intensidad </th>\
                    </thead>\
                    <body>';
    
        listaCursos.forEach(curso => {
            if(curso.estadoc == 'disponible'){
                texto =  texto + `<tr><td> <input type="radio" name="cursoid" value="${curso.idc}" required></td>`+
                       '<td>' +curso.nombrec+'</td>' +
                       '<td>' +curso.descripcionc+'</td>' +
                       '<td>' +curso.valorc +'</td>'+
                       '<td>' +curso.modalidadc +'</td>' +
                       '<td>' +curso.intensidadc +'</td>' +
                       '</tr>'
            }else{
                texto = texto
            }
        
    });

    texto = texto +' </tbody> </table> ';

    return texto;

})





