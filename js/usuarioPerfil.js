//Cgemos el usuario activo
var usuario = JSON.parse(sessionStorage.getItem("UsuarioActivo"));
var listaUsuarios = JSON.parse(localStorage.getItem("Usuarios"));


//Mostramos al usuario sus datos
function mostrarDatosUsuario(Usuario){
    var divInfo = document.createElement("div");
    document.getElementById("perfil").appendChild(divInfo);
    divInfo.id = "perfilInfo";
    divInfo.setAttribute("class","col-lg-12 col-md-12 col-sm-12");

    var divDatos = document.createElement("div");
    divInfo.appendChild(divDatos);
    var nombreUsuario = document.createElement("h2");
    divDatos.appendChild(nombreUsuario);
    divDatos.id = "perfilDatos";
    nombreUsuario.innerHTML = `Bienvenido a CINETEX, ${Usuario.nick}<br> <h4>Informacion acerca de ti: </h4>`;
    for(propiedad in Usuario){
        var p = document.createElement("p");
        divDatos.appendChild(p);
        p.innerHTML = `<b>${propiedad.toUpperCase()}</b> : ${Usuario[propiedad]}`;
    }
    var btnEditar = document.createElement("button");
    divDatos.appendChild(btnEditar);
    btnEditar.setAttribute("class","btn btn-primary");
    if(Usuario.nick == "Administrador"){
      btnEditar.innerText = "EDITAR APP";
      btnEditar.onclick = () => location.href = "../administracion.html";
    }else{
      btnEditar.innerText = "EDITAR DATOS";
      btnEditar.setAttribute("data-bs-toggle","modal");
      btnEditar.setAttribute("data-bs-target","#modalModificar");
      btnEditar.addEventListener("click",function(){
        guardarUsuarioModificar(Usuario);
        mostrarModal(Usuario,listaUsuarios);
      });
    }
    var btnCerrarSesion = document.createElement("button");
    divDatos.appendChild(btnCerrarSesion);
    btnCerrarSesion.setAttribute("class","btn btn-primary");
    btnCerrarSesion.innerText = "CERRAR SESION";
    btnCerrarSesion.onclick = function(){
        sessionStorage.removeItem("UsuarioActivo");
        location.href = "./index.html";
    } 
}

mostrarDatosUsuario(usuario);

//Editamos el modal en funcion del objeto al que queremos modificar, para que nos aparezca la informacion
//del objeto pulsado 
function mostrarModal(usuario,lista){
  var tituloModal = document.getElementById("exampleModalLabel");
  tituloModal.innerHTML = usuario.nick;

  document.getElementById("btnModificar").addEventListener("click",function(){
      modificarUsuario(usuario,lista);
  });

  //Para que en el input se vea el valor de las propiedades que quiere cambiar
  document.getElementById("nuevoNick").value = usuario.nick;
  document.getElementById("nuevoNombre").value = usuario.nombre;
  document.getElementById("nuevoApellido").value = usuario.apellido;
  document.getElementById("nuevoEmail").value = usuario.email;
  document.getElementById("nuevaContrasena").value = usuario.contrasena;

}


//Añadimos una funcion para que el usuario pueda modificar sus datos
function modificarUsuario(usuario,lista){
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
      
  //Para que los cambios se vean al instante
  document.getElementById("perfilInfo").remove();
  mostrarDatosUsuario(usuario);

}

function guardarUsuarioModificar(usuario){
  localStorage.setItem("UsuarioModificar",JSON.stringify(usuario));
}

//Para "adornar", debajo de su perfil le mostramos peliculas de la app por si le intersa alguna
function mostrarPeliculasPerfil(lista){
    var divPeliculas = document.createElement("div");
    divPeliculas.setAttribute("class","row");
    divPeliculas.id = "peliculasPerfil";
    document.body.appendChild(divPeliculas);
    for(var i = 0; i<=3;i++){
      var divCol = document.createElement("div");
      divPeliculas.appendChild(divCol);
      divCol.setAttribute("class","col-lg-3 col-md-3 col-sm-12");
      var imagen = document.createElement("img");
      divCol.appendChild(imagen);
      var numeroLista = Math.round(Math.random() * (lista.length - 1));
      imagen.src = lista[numeroLista].imagen;  
      imagen.style.width = "250px";
      imagen.style.borderRadius = "10px";
      imagen.onclick = function(){
        sessionStorage.setItem("PeliculaActiva",JSON.stringify(lista[numeroLista]));
        location.href = "./paginaPelicula.html";
      };
    }
}

mostrarPeliculasPerfil(listaPeliculas);


