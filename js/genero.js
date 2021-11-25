//Recibimos la lista filtrada dependiendo de que genero haya pulsado el usuario en el menu y que está guardado en el session storage
var listaGeneroFiltrada = JSON.parse(sessionStorage.getItem("Genero"));


//Vemos la lista filtrada
function verPeliculasGenero(lista){

    var divRow = document.createElement("div");
    document.getElementById("principal").appendChild(divRow);
    divRow.setAttribute("class","peliculasGenero row");
    document.getElementById("principal");
    lista.forEach(element => {
        var divCard = document.createElement("div");
        divRow.appendChild(divCard);
        divCard.setAttribute("class","card col-lg-5 col-md-5 col-md-12");
        divCard.style.display = "inline-block";
        var row = document.createElement("div");
        divCard.appendChild(row);
        row.setAttribute("class","row");
        var divColImagen = document.createElement("div");
        row.appendChild(divColImagen);
        divColImagen.setAttribute("class","col-lg-3 col-md-3 col-sm-12");
        var imagen = document.createElement("img");
        divColImagen.appendChild(imagen);    
        imagen.src = element.imagen;
        imagen.onclick = function(){
            guardarPeliculaActiva(element);
            location.href = "./paginaPelicula.html";
        };
        imagen.setAttribute("class","img-fluid rounded-start");
        var divColInfo = document.createElement("div");
        row.appendChild(divColInfo);
        divColInfo.setAttribute("class","col-lg-9 col-md-9 col-sm-12");
        var divCardBody = document.createElement("div");
        divColInfo.appendChild(divCardBody);
        divCardBody.setAttribute("class","card-body");
        var titulo = document.createElement("h5");
        divCardBody.appendChild(titulo);
        titulo.setAttribute("class","card-title");
        titulo.innerText = element.titulo;
        var info = document.createElement("ul");
        divCardBody.appendChild(info);
        for(propiedad in element){
            if(propiedad == "titulo" || propiedad == "duracion" || propiedad == "pais" || propiedad == "genero" || propiedad == "estreno"){
                var li = document.createElement("li");
                info.appendChild(li);
                li.innerHTML = `<b>${propiedad}: </b>${element[propiedad]}`;
            }
        }
    });

}

onload = function(){
    verPeliculasGenero(listaGeneroFiltrada);
    document.getElementById("ordenarAlfabetico").addEventListener("click",function(){
        ordenarPeliculasAlfabetico(listaGeneroFiltrada);
    });
    document.getElementById("ordenarValoracion").addEventListener("click",function(){
        ordenarPeliculasValoracion(listaGeneroFiltrada);
    });
}

function guardarPeliculaActiva(Pelicula){
    sessionStorage.setItem("PeliculaActiva",JSON.stringify(Pelicula));
}


//Funcion de ordenar Alfabeticamente
function ordenarPeliculasAlfabetico(lista){
    var listaOrdenada = lista.sort((a,b)=>(a.titulo > b.titulo)? 1: -1);
    borrarVerPeliculas();
    verPeliculasGenero(listaOrdenada);
}

//Funcion de ordenar por valoracion de peliculas
//Parseint para que me transforme la valoracion que es texto a un numero entero
//ya que sino no ordenar bien los numeros de dos cifras como el 10
function ordenarPeliculasValoracion(lista){
    var listaOrdenada = lista.sort((a,b) => (parseInt(a.valoracion) < parseInt(b.valoracion)) ? 1: -1);
    borrarVerPeliculas();
    verPeliculasGenero(listaOrdenada);
}

//Funcion que borra las tablas para visualizar las listas ordenadas sin que se acumulen
function borrarVerPeliculas(){
    document.getElementsByClassName("row")[1].remove();
}