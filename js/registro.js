//Recogemos la lista de usuarios para comprobar la existencia de usuarios
var listaUsuarios;
if(localStorage.getItem("Usuarios") == null){
    listaUsuarios = [];
}else{
    listaUsuarios = JSON.parse(localStorage.getItem("Usuarios"));
}

onload = function(){
    document.getElementById("btnRegistrarUsuario").addEventListener("click",crearUsuario);
}


//Recogemos los datos que se introduce en el formulario, comprobamos que son correctos, comprobamos que no eixste otro igual y lo creamos
function crearUsuario(){
    const nickUsuario = document.getElementById("nickUsuario");
    const nombreUsuario = document.getElementById("nombre");
    const apellidoUsuario = document.getElementById("apellido");
    const emailUsuario = document.getElementById("email");
    const contrasenaUsuario = document.getElementById("contrasena");

    if(validar(/^\S+$/,nickUsuario.value) && validar(/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/,nombreUsuario.value) && validar(/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/,apellidoUsuario.value) && validar(/^[\w]+@{1}[\w]+\.[a-z]{2,3}$/,emailUsuario.value)){
        if(comprobarUsuario(nickUsuario.value,listaUsuarios)){
            crearAlerta("danger","Ya existe ese usuario registrado");
        }else{
            let nuevoUsuario = new Usuario(nickUsuario.value,nombreUsuario.value,apellidoUsuario.value,
                emailUsuario.value, contrasenaUsuario.value);
            crearAlerta("success","Usuario registrado exitosamente");
            listaUsuarios.push(nuevoUsuario);
            //Guardamos en el local la nueva lista con el nuevo usuario 
            localStorage.setItem("Usuarios",JSON.stringify(listaUsuarios));
            guardarUsuarioActivo(nuevoUsuario);
            location.href = "./index.html";
        }
    }else{
        crearAlerta("danger","Escribe datos validos");
        $("input").css("border","1px solid red");
    }
}



//SI TODO ESTA CORRECTO GUARDAMOS EL USUARIO EN EL LOCAL COMO ACTIVO EN LA APP
function guardarUsuarioActivo(usuario){
    sessionStorage.setItem("UsuarioActivo",JSON.stringify(usuario));
}


//Comprobamos que si ya existe un usuario con ese nick ya que es la clave principal del usuario
function comprobarUsuario(nickUsuario,lista){
    var encontrado = false;
    lista.forEach(element => {
        if(element['nick'].toLowerCase() == nickUsuario.toLowerCase() || nickUsuario == "Administrador"){
            encontrado = true;
        }
    });
    return encontrado;
}



function validar(patron,valor){
    var validacion = false;
    if(patron.test(valor)){
        validacion = true;
    }
    return validacion;
}





function crearAlerta(tipo,txtAlerta){
    const divPrincipal = document.getElementById("principalFormulario");
    let divAlerta = document.createElement("div");
    //importante insertamos el div de alerta como primer hijo del div principal
    divPrincipal.insertAdjacentElement("afterbegin",divAlerta);
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



// var listaUsuarios = [];
// listaUsuarios.push(new Usuario("tiago-11","santiago","asqui","santiago@emial.com","santiago11"));
// listaUsuarios.push(new Usuario("Administrador","","","sdfdsf","1234"));
// localStorage.setItem("Usuarios",JSON.stringify(listaUsuarios));