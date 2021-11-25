//Segun cargue la página visualizamos las peliculas que se encuantran en el local
//Y añadimos las funciones de ordenar y filtrar a sus respectivos botones
onload = function(){
    verPeliculas(listaPeliculas);
    document.getElementById("ordenarAlfabetico").addEventListener("click",function(){
        ordenarPeliculasAlfabetico(listaPeliculas);
    });
    document.getElementById("ordenarValoracion").addEventListener("click",function(){
        ordenarPeliculasValoracion(listaPeliculas);
    });
    
    document.getElementsByClassName("genero")[0].addEventListener("click",function(){
        sessionStorage.setItem("Genero",JSON.stringify(filtrarPeliculas(listaPeliculas,"Accion")));
    });

    document.getElementsByClassName("genero")[1].addEventListener("click",function(){
        sessionStorage.setItem("Genero",JSON.stringify(filtrarPeliculas(listaPeliculas,"Drama")));
    });

    document.getElementsByClassName("genero")[2].addEventListener("click",function(){
        sessionStorage.setItem("Genero",JSON.stringify(filtrarPeliculas(listaPeliculas,"Animacion")));
    });

    document.getElementsByClassName("genero")[3].addEventListener("click",function(){
        sessionStorage.setItem("Genero",JSON.stringify(filtrarPeliculas(listaPeliculas,"Terror")));
    })
}

//Creamos la tabla de las peliculas
function verPeliculas(lista){
    var divCartas = document.getElementById("cartas");
    //creamos un div de clase row (bootstrap) que englobara todo los objetos
    var divRow = document.createElement("div");
    divCartas.appendChild(divRow);
    //no tanto css
    divRow.setAttribute("class","row");
    divRow.style.margin = "20px 0px";
    lista.forEach(element => {
        var divCol = document.createElement("div");
        divRow.appendChild(divCol);
        divCol.setAttribute("class","col-lg-3 col-md-6 col-sm-12");
        divCol.style.paddingRight = "0px";
        var divCard = document.createElement("div");
        divCol.appendChild(divCard);
        divCard.setAttribute("class","card");
        divCard.style.width = "18rem";
        var imagen = document.createElement("img");
        divCard.appendChild(imagen);
        imagen.src = element['imagen'];
        imagen.setAttribute("class","card-img-top");
        var divCardBody = document.createElement("div");
        divCard.appendChild(divCardBody);
        divCardBody.setAttribute("class","card-body");
        var tituloPelicula = document.createElement("h5");
        divCardBody.appendChild(tituloPelicula);
        tituloPelicula.setAttribute("class","card-title");
        tituloPelicula.innerHTML = element['titulo'];
        var botonAccederPelicula = document.createElement("a");
        divCardBody.appendChild(botonAccederPelicula);
        botonAccederPelicula.setAttribute("class","btn");
        botonAccederPelicula.innerText = "ACCEDER PELICULA";
        botonAccederPelicula.addEventListener("click",function(){
            guardarPeliculaActiva(element);
        });
        botonAccederPelicula.href = "./paginaPelicula.html";
    });
}



//Funcion que ordena peliculas por propiedad
function ordenarPeliculasAlfabetico(lista){
    var listaOrdenada = lista.sort((a,b)=>(a.titulo > b.titulo)? 1: -1);
    borrarVerPeliculas();
    verPeliculas(listaOrdenada);
}

//Funcion que ordena las peliculas por valoracion
//Parseint para que me transforme la valoracion que es texto a un numero entero
//ya que sino no ordenar bien los numeros de dos cifras como el 10
function ordenarPeliculasValoracion(lista){
    var listaOrdenada = lista.sort((a,b) => (parseInt(a.valoracion) < parseInt(b.valoracion)) ? 1: -1);
    borrarVerPeliculas();
    verPeliculas(listaOrdenada);
}

//Funcion que borra las listas ordenadas para que no se acumulen
function borrarVerPeliculas(){
    document.getElementsByClassName("row")[0].remove();
}

//Funcion que guarda la pelicula en la que se pulse en el session storage para que sepamos que se está actuando sobre ella 
function guardarPeliculaActiva(Pelicula){   
    sessionStorage.setItem("PeliculaActiva",JSON.stringify(Pelicula));
}

//Funcion que filtra segun el genero que pulse
function filtrarPeliculas(lista, genero){
    var listaFiltrada = lista.filter(Pelicula => Pelicula.genero == genero);
    return listaFiltrada;
}

