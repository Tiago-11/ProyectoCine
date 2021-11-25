//Recogemos la pelicula que ha pulsado el usuario para mostrar su informacion en la pagina
onload = function(){
    var pelicula = JSON.parse(sessionStorage.getItem("PeliculaActiva"));
    verPelicula(pelicula);
    verComentarios(pelicula);
    document.getElementById("btnGuardarComentario").addEventListener("click",function(){
        guardarComentario(listaPeliculas,pelicula);
        verComentarios(pelicula);
    });
    comprobarUsuarioActivo();

}

//Vemos la pelicula que ha pulsado el usuario y que tenemos guardada
function verPelicula(Pelicula){
    var principal = document.getElementById("principalPelicula");
    var informacion = document.createElement("div");
    principal.appendChild(informacion);
    informacion.innerHTML = `<div class="row">
        <div class="col-lg-3 col-md-3 col-sm-12">
            <div class="imagenSinopsis">
                <img src="${Pelicula.imagen}" class="img-fluid" alt="...">
            </div>
        </div>
        <div class="col-lg-9 col-md-9 col-sm-12">
            <div class="informacionPelicula">
                <h2>${Pelicula.titulo}</h2>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><b>Duracion</b> : ${Pelicula.duracion}</li>
                    <li class="list-group-item"><b>País</b> : ${Pelicula.pais}</li>
                    <li class="list-group-item"><b>Género</b> : ${Pelicula.genero}</li>
                    <li class="list-group-item"><b>Estreno</b> : ${Pelicula.estreno}</li>
                    <li class="list-group-item"><b>Directores</b>: ${Pelicula.director}</li>
                    <li class="list-group-item"><b>Productores</b> : ${Pelicula.productor}</li>
                    <li class="list-group-item"><b>Música</b> : ${Pelicula.musica}</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12">
            <div class="informacionSinopsis">
                <h3>SINOPSIS</h3>
                <p>${Pelicula.sinopsis}</p>
            </div>
        </div>
    </div>
    <div class="row" style="border: none;">
        <div class="col-lg-12 col-md-12 col-sm-12" style="padding: 0;">
            <div class="informacionEntradas">
                <div class="d-grid gap-2">
                    <button class="botonesInformacion btn btn-primary" type="button" id="enlaceComprar">COMPRAR ENTRADAS</button>
                </div>
            </div>
        </div>
    </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Comentario</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h5>Escriba el comentario que desea publicar:</h5>
                    <br>
                    <textarea rows="6" cols="60" placeholder="Escriba su comentario..."></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" id="btnGuardarComentario" class="btn btn-primary">Guardar Comentario</button>
                </div>
            </div>
        </div>
    </div>
    <div class="puntuacionPelicula">
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12" style="text-align: center;">
                <h5>VALORACION DE ${Pelicula.titulo}</h5>
                <span style="font-size: 3.25rem; vertical-align: middle;">${Pelicula.valoracion} estrellas</span>
            </div>
        </div>
    </div>
    `;
}

//Para añadir comentarios a una pelicula necesitamos saber el indice de la pelicula al que se comenta para añadirlo directamente a la pelicula y no tener que recorrer toda la lista
function cogerIndicePelicula(lista){
    var indice = lista.findIndex((Element) => Element.titulo === JSON.parse(sessionStorage.getItem("PeliculaActiva")).titulo);
    return indice;
}


//Guardamos el comentario en la lista de comentarios de la pelicula activa directamente mediante su indice
function guardarComentario(lista,Pelicula){
    var comentario = document.getElementsByTagName("textarea")[0].value;
    if(comentario == ""){
        alert("Debe introducir un comentario");
    }else{
        var indicePelicula = cogerIndicePelicula(lista);
        listaPeliculas[indicePelicula].comentarios.push(comentario);
        localStorage.setItem("Peliculas",JSON.stringify(listaPeliculas));
        $("#comentarios .row").remove();
        sessionStorage.setItem("PeliculaActiva",JSON.stringify(Pelicula));
    }
}


//Cremos una funcion que recorra la lista de comentarios de la pelicula activa para ver esos comentarios
function verComentarios(Pelicula){

    for(var i = 0; i<(Pelicula.comentarios).length;i++){
        var divRowComentario = document.createElement("div");
        document.getElementById("comentarios").appendChild(divRowComentario);
        divRowComentario.innerHTML = `<div class="row">
        <div class="col-lg-3 col-md-3 col-sm-12">
            <center>
                <img src="../imagenes/usericon.png" class="img-fluid" width="200px" height="200px">
            </center>
        </div>
        <div class="col-lg-9 col-md-9 col-sm-12">
            <h5>Comentario</h5>
            <p>${Pelicula.comentarios[i]}</p>
        </div>
        </div>`;
    }

}


//Para que el usuario pueda comprar entradas para la pelicula necesira estar logueda, sí lo está puede comprar sino se le redirige al login para que se registre
function comprobarUsuarioActivo(){
    var enlaceCompra = document.getElementById("enlaceComprar");
    enlaceCompra.onclick = function(){
        if(JSON.parse(sessionStorage.getItem("UsuarioActivo")) != null){
            location.href = "./compra.html";
        }else{
            location.href = "./login.html";
        }
    }
}
