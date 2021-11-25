//Obtenemos la pelicula que el usuario quiere comprar
var peliculaComprada = JSON.parse(sessionStorage.getItem("PeliculaActiva"));

//Visualizamos la pelicula que quiere comprar
function verPeliculaComprada(Pelicula){
    var imagenPelicula = document.createElement("img");
    imagenPelicula.src = Pelicula.imagen;
    document.getElementById("imagenPelicula").appendChild(imagenPelicula);
    var tituloPelicula = document.createElement("h3");
    document.getElementById("imagenPelicula").appendChild(tituloPelicula);
    tituloPelicula.innerText = Pelicula.titulo;

}

onload = function(){
    verPeliculaComprada(peliculaComprada);
}

//Funcion que calcula el precio total de la compra y en numero de entradas que puede elegir
function cargarPrecioPelicula(){
    const precio = 10.5;
    var precioTotal = 10.5;
    var btnSuma = document.querySelectorAll(".row button")[0];

    var vistaNumeroEntradas = document.createElement("p");
    document.getElementById("imagenPelicula").appendChild(vistaNumeroEntradas);
    vistaNumeroEntradas.innerHTML = `Tu numero de entradas: ${document.querySelectorAll(".row button")[2].innerHTML}`;
    var vistaPrecio = document.createElement("p");
    document.getElementById("imagenPelicula").appendChild(vistaPrecio);
    vistaPrecio.innerHTML = "<b>Precio: </b>" + precioTotal + " €";
   
    
    btnSuma.onclick = function(){
        if(parseInt(document.querySelectorAll(".row button")[2].innerHTML) < 0 || parseInt(document.querySelectorAll(".row button")[2].innerHTML) > 8){
            document.querySelectorAll(".row button")[2].innerHTML = 0;
            precioTotal = 0;
        }
        document.querySelectorAll(".row button")[2].innerHTML = parseInt(document.querySelectorAll(".row button")[2].innerHTML) + 1;
        var numeroEntradas = parseInt(document.querySelectorAll(".row button")[2].innerHTML);
        precioTotal += precio;
        if(precioTotal <= 0){
            precioTotal = precio;
        }
        vistaNumeroEntradas.innerHTML = `Tu numero de entradas: ${document.querySelectorAll(".row button")[2].innerHTML}`;
        vistaPrecio.innerHTML = "<b>Precio: </b>" + precioTotal + " €";
        
    };
    var btnResta = document.querySelectorAll(".row button")[1];
    btnResta.onclick = function(){
        if(parseInt(document.querySelectorAll(".row button")[2].innerHTML) < 2){
            document.querySelectorAll(".row button")[2].innerHTML = 2;
        }
        document.querySelectorAll(".row button")[2].innerHTML = parseInt(document.querySelectorAll(".row button")[2].innerHTML) - 1; 
        var numeroEntradas = parseInt(document.querySelectorAll(".row button")[2].innerHTML);
        precioTotal -= precio;
        if(precioTotal <= 0){
            precioTotal = precio;
        }
        vistaNumeroEntradas.innerHTML = `Tu numero de entradas: ${document.querySelectorAll(".row button")[2].innerHTML}`;
        vistaPrecio.innerHTML = "<b>Precio: </b>" + precioTotal + " €";
    };
}

cargarPrecioPelicula();


//Cuando el usuario realize la compra le aparacerá un mensaje de acierto y se le redirigirá al inicio 
document.getElementById("btnComprar").addEventListener("click",function(){
    document.getElementById("compra").remove();
    document.getElementsByTagName("h2")[0].innerHTML = "COMPRA REALIZADA CORRECTAMENTE";
    var contador = 4;
    setInterval(function(){
        document.getElementsByTagName("h2")[0].innerHTML = "COMPRA REALIZADA CORRECTAMENTE <br> Se te redirigirá al inicio en " + contador;
        contador--;
        if(contador < 0){
            location.href = "./index.html";
        }
    },1000);
})

