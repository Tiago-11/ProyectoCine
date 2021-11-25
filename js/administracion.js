//Añadimos a los botones sus correspondientes funciones de CRUD

onload = function(){
    document.getElementById("btnVerUsuarios").addEventListener("click",verUsuarios);
    document.getElementById("btnVerPeliculas").addEventListener("click",verPeliculas);
    document.getElementById("btnAnadirPeliculas").addEventListener("click",verFormulario);
}


//Cuando el Administrador pinche en VER USUARIOS, automáticamente le aparecerán todos los usuario de la app
//Las clases que se les añaden a los div son de Bootstrap para que se vean mejor
function verUsuarios(){
    if(listaUsuarios.length == 0){
        var divInfo = document.createElement("div");
        document.getElementById("administracion").appendChild(divInfo);
        divInfo.innerHTML = "<h3>No tenemos usuarios :(</h3>"
    }else{
        eliminarVistaElementos();
        var divBody = document.createElement("div");
        document.getElementById("administracion").appendChild(divBody);
        divBody.id= "vistaElementos";
        var texto = document.createElement("h3");
        divBody.appendChild(texto);
        texto.innerText = "Usuarios en la App";
        listaUsuarios.forEach(Usuario => {
            var divCol = document.createElement("div");
            divBody.appendChild(divCol);
            divCol.setAttribute("id",Usuario.nick);
            divCol.setAttribute("class","col-lg-6 col-md-6 col-sm-12");
            var divCard = document.createElement("div");
            divCol.appendChild(divCard);
            divCard.setAttribute("class","card");
            var divCardBody = document.createElement("div");
            divCard.appendChild(divCardBody);
            divCardBody.setAttribute("class","card-body");
            var nickUsuario = document.createElement("h5");
            divCardBody.appendChild(nickUsuario);
            nickUsuario.setAttribute("class","card-title");
            nickUsuario.innerText = Usuario['nick'];
            nickUsuario.style.borderBottom = "1px solid black";
            nickUsuario.style.paddingBottom = "8px";
            var listaPropiedades = document.createElement("ul");
            divCardBody.appendChild(listaPropiedades)
            for(propiedad in Usuario){
                var li = document.createElement("li");
                listaPropiedades.appendChild(li);
                li.innerHTML = `<b>${propiedad}: </b>` + Usuario[propiedad];
            }

            //creamos un boton para eliminar usuario
            var btnEliminarUsuario = document.createElement("button");
            divCardBody.appendChild(btnEliminarUsuario);
            btnEliminarUsuario.type = "button";
            btnEliminarUsuario.setAttribute("class","btn btn-primary");
            btnEliminarUsuario.innerText = "ELIMINAR";
            btnEliminarUsuario.onclick = () => eliminarElemento(divCol.getAttribute("id"),listaUsuarios,"Usuarios");
            
            //creamos un boton para modificar usuario
            var btnModificarUsuario = document.createElement("button");
            divCardBody.appendChild(btnModificarUsuario);
            btnModificarUsuario.type = "button";

            //Añadimos la funcion de guardar al usuario al que quier modificar cuando
            //pulse el boton para que quede guardado cual quiero cambiar
            btnModificarUsuario.addEventListener("click",function(){
                guardarUsuarioModificar(Usuario);
                mostrarModal(Usuario,listaUsuarios);
            });
            btnModificarUsuario.setAttribute("class","btn btn-primary");
            btnModificarUsuario.innerText = "MODIFICAR";
            btnModificarUsuario.setAttribute("data-bs-toggle","modal");
            btnModificarUsuario.setAttribute("data-bs-target","#exampleModal");
        });
    }
}

function modificarUsuario(usuario,lista){
    //Recogemos todos lo valores del formulario
    var nuevoNick = document.getElementById("nuevoNick").value;
    var nuevoNombre = document.getElementById("nuevoNombre").value;
    var nuevoApellido = document.getElementById("nuevoApellido").value;
    var nuevoEmail = document.getElementById("nuevoEmail").value;
    var nuevaContrasena = document.getElementById("nuevaContrasena").value;
    
    usuario.nick = nuevoNick;
    usuario.nombre = nuevoNombre;
    usuario.apellido = nuevoApellido;
    usuario.email = nuevoEmail;
    usuario.contrasena = nuevaContrasena;

    //guardamos en en local la nueva lista de usuarios con el usuario modificado
    localStorage.setItem("Usuarios",JSON.stringify(lista));
        
    //para que los cambios se vean al instante
    eliminarVistaElementos();
    verUsuarios();

}

//Guardamos en el local el usuario que queremos modificar
function guardarUsuarioModificar(usuario){
    localStorage.setItem("UsuarioModificar",JSON.stringify(usuario));
}

//Editamos el modal en funcion del objeto al que queremos modificar, para que nos aparezca la informacion del objeto pulsado 
function mostrarModal(usuario,lista){
    var tituloModal = document.getElementById("exampleModalLabel");
    tituloModal.innerHTML = usuario.nick;

    document.getElementById("btnModificar").addEventListener("click",function(){
        modificarUsuario(usuario,lista);
    });

    //Para que en los input se vea el valor de las propiedades que quiere cambiar
    document.getElementById("nuevoNick").value = usuario.nick;
    document.getElementById("nuevoNombre").value = usuario.nombre;
    document.getElementById("nuevoApellido").value = usuario.apellido;
    document.getElementById("nuevoEmail").value = usuario.email;
    document.getElementById("nuevaContrasena").value = usuario.contrasena;

}

//Cuando el Administrador pulse en VER PELICULAS, se ejecutará esta función que muestra todas las peliculas de la APP
function verPeliculas(){
    //Antes eliminamos lo que haya antes
    eliminarVistaElementos();
    var divBody = document.createElement("div");
    document.getElementById("administracion").appendChild(divBody);
    divBody.id= "vistaElementos";
    var texto = document.createElement("h3");
    divBody.appendChild(texto);
    texto.innerText = "Peliculas en la App";

    listaPeliculas.forEach(Pelicula => {
        var divCol = document.createElement("div");
        divBody.appendChild(divCol);
        divCol.setAttribute("class","col-sm-6");
        divCol.setAttribute("id",Pelicula.titulo);
        var divCard = document.createElement("div");
        divCol.appendChild(divCard);
        divCard.setAttribute("class","card");
        var divCardBody = document.createElement("div");
        divCard.appendChild(divCardBody);
        divCardBody.setAttribute("class","card-body");

        var row = document.createElement("div");
        row.setAttribute("class","row");
        divCardBody.appendChild(row);
    
        var divCol2 = document.createElement("div");
        divCol2.setAttribute("class","col-lg-5 col-md-6 col-sm-12");
        row.appendChild(divCol2);
    
        var divCol3 = document.createElement("div");
        divCol3.setAttribute("class","col-lg-7 col-md-6 col-sm-12");
        row.appendChild(divCol3);
    
        var tituloPelicula = document.createElement("h5");
        divCol2.appendChild(tituloPelicula);
        tituloPelicula.setAttribute("class","card-title");
        tituloPelicula.innerText = Pelicula['titulo'];
    
        var listaPropiedades = document.createElement("ul");
        divCol2.appendChild(listaPropiedades);

        //No quiero que se vea la sinopsis de las peliculas puesto que sería muy largo
        for(propiedad in Pelicula){
            if(propiedad != "sinopsis"){
                var li = document.createElement("li");
                listaPropiedades.appendChild(li);
                if(propiedad != "imagen"){
                    li.innerHTML = `<b>${propiedad.toUpperCase()}: </b>${Pelicula[propiedad]}`;
                }else{
                    var imagen = document.createElement("img");
                    divCol3.appendChild(imagen);
                    imagen.src = Pelicula.imagen;
                }
                }
            }
        
        //Creamos un boton de elimar para que cuando el Administrador se elimine la pelicula
        var botonEliminar = document.createElement("button");
        divCol2.appendChild(botonEliminar);
        botonEliminar.innerText = "ELIMINAR";
        botonEliminar.setAttribute("class","btn btn-primary");
        botonEliminar.onclick = () => eliminarElemento(divCol.getAttribute("id"),listaPeliculas,"Peliculas");

    });
}


//Funcion que elimina usuarios y peliculas
function eliminarElemento(id,lista,claveLocal){
    var indice = lista.findIndex((Element) => Element.id === id); //encuentra el indice necesario para eliminar el elemento de su array
    document.getElementById(id).remove(); //elimina el div que contiene el elemento para la parte visual
    lista.splice(indice,1); // lo elimina de la lista 
    localStorage.setItem(claveLocal,JSON.stringify(lista)); // lo elimina del local, es decir, mandamos al local la nueva lista con el elemento eliminado
}

//Funcion que elimina la tabla que se encuentre abierta para que no se acumulen
function eliminarVistaElementos(){
    if(document.getElementById("vistaElementos") != undefined){
        document.getElementById("vistaElementos").remove();
    }
}

//Creacion de formulario para añadir peliculas
function verFormulario(){
    eliminarVistaElementos();
    var divFormulario = document.createElement("div");
    document.getElementById("administracion").appendChild(divFormulario);
    divFormulario.innerHTML = `<div id="vistaElementos">
    <div class="form-floating">
      <input type="text" class="form-control" id="tituloPelicula" placeholder="name@example.com">
      <label for="floatingInput">Titulo</label>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" id="duracionPelicula" placeholder="Password">
      <label for="floatingPassword">Duracion</label>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" id="paisPelicula" placeholder="Password">
      <label for="floatingPassword">Pais</label>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" id="generoPelicula" placeholder="Password">
      <label for="floatingPassword">Genero</label>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" id="estrenoPelicula" placeholder="Password">
      <label for="floatingPassword">Estreno</label>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" id="directorPelicula" placeholder="Password">
      <label for="floatingPassword">Director</label>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" id="productorPelicula" placeholder="Password">
      <label for="floatingPassword">Productor</label>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" id="musicaPelicula" placeholder="Password">
      <label for="floatingPassword">Musica</label>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" id="sinopsisPelicula" placeholder="Password">
      <label for="floatingPassword">Sinopsis</label>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" id="valoracionPelicula" placeholder="Password">
      <label for="floatingPassword">Valoracion</label>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" id="imagenPelicula">
      <label for="floatingPassword">Imagen (url)</label>
    </div>
    <button type="button" id="anadirPelicula" class="btn btn-primary">AÑADIR PELICULA</button>
  </div>`;

    document.getElementById("anadirPelicula").addEventListener("click",function(){
        anadirPelicula(listaPeliculas);
    });

}

//Funcion que añade peliculas y comprueba que no existe otra con el mismo titulo
function anadirPelicula(lista){
    var tituloPelicula = document.getElementById("tituloPelicula").value;
    var duracionPelicula = document.getElementById("duracionPelicula").value;
    var paisPelicula = document.getElementById("paisPelicula").value;
    var generoPelicula = document.getElementById("generoPelicula").value;
    var estrenoPelicula = document.getElementById("estrenoPelicula").value;
    var directorPelicula = document.getElementById("directorPelicula").value;
    var productorPelicula = document.getElementById("productorPelicula").value;
    var musicaPelicula = document.getElementById("musicaPelicula").value;
    var sinopsisPelicula = document.getElementById("sinopsisPelicula").value;
    var valoracionPelicula = document.getElementById("valoracionPelicula").value;
    var imagenPelicula = document.getElementById("imagenPelicula").value;

    var encontrado = false;

    lista.forEach(element => {
        if(element.titulo == tituloPelicula){
            encontrado = true;
        }  
    });

    if(encontrado){
        eliminarVistaElementos();
        mostrarAlerta("danger","No fue posible crear la pelicula");
    }else{
        //no va a tener comentarios
        var listaComentarios = [];
        var nuevaPelicula = new Pelicula(tituloPelicula,duracionPelicula,paisPelicula,generoPelicula,estrenoPelicula,
            directorPelicula,productorPelicula,musicaPelicula,sinopsisPelicula,valoracionPelicula,listaComentarios,imagenPelicula);
        lista.push(nuevaPelicula);
        localStorage.setItem("Peliculas",JSON.stringify(lista));
        eliminarVistaElementos();
        mostrarAlerta("success","Pelicula creada exitosamente");
    }
}


//Cremos una alerta para avisar de errores o aciertos y le añadimos un timeout para que deje de ser visible cada 4 segundos
function mostrarAlerta(tipo,txtAlerta){
    const divPrincipal = document.getElementById("administracion");
    let divAlerta = document.createElement("div");
    //importante insertamos el div de alerta como primer hijo del div principal
    divPrincipal.appendChild(divAlerta);
    if(tipo == "success"){
        divAlerta.setAttribute("class","alert alert-success");
        divAlerta.setAttribute("role","alert");
        divAlerta.innerText = txtAlerta;
    }else{
        divAlerta.setAttribute("class","alert alert-danger");
        divAlerta.setAttribute("role","alert");
        divAlerta.innerText = txtAlerta;
    }
    setTimeout(function(){
        divAlerta.remove();
    },4000);
}
