//Recogemos la lista de usuarios para comprobar si el usuario al loguearse existe o no
var listaUsuarios;

if(localStorage.getItem("Usuarios") == null){
    listaUsuarios = [];
}else{
    listaUsuarios = JSON.parse(localStorage.getItem("Usuarios"));
}

onload = function(){
    document.getElementById("btnLoguear").addEventListener("click",comprobarUsuario);
}


//Validamos que nos introduzca caracteres validos
function validar(patron,valor){
    var validacion = false;
    if(patron.test(valor)){
        validacion = true;
    }
    return validacion;
}


//Comprobamos la existencia del usuario en la app o no
function comprobarUsuario(){
    const nickUsuario = document.getElementById("nickUsuario");
    const contrasenaUsuario = document.getElementById("contrasenaUsuario");

    if(validar(/^\S+$/,nickUsuario.value) && contrasenaUsuario.value != ""){
        var encontrado = false;
        listaUsuarios.forEach(Usuario => {
            if(nickUsuario.value == Usuario['nick'] && contrasenaUsuario.value == Usuario['contrasena']){ //Usuario.nick
                encontrado = true;
                guardarUsuarioActivo(Usuario);
            }
        });
        if(encontrado){
            if(nickUsuario.value == "Administrador"){
                location.href = "./administracion.html";
            }else{
                location.href = "./index.html";
            }
            //mostrarAlerta("success","Bienvenido de nuevo a la app " + nickUsuario.value);
        }else{
            mostrarAlerta("danger","Datos incorrectos");
        }
    }else{
        mostrarAlerta("danger","Introduce datos validos");
        $("input").css("border","1px solid red");
    }
}

function guardarUsuariosLocal(){
    localStorage.setItem("Usuarios",JSON.stringify(listaUsuarios));
}


//Creamos alertas para informar de los errores
function mostrarAlerta(tipo,txtAlerta){
    const divPrincipal = document.getElementById("login");
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

//Guardamos el usuario que se ha logueado en el session para saber que usuario es el que está activo en la app y mostrar sus propiedades
function guardarUsuarioActivo(usuario){
    sessionStorage.setItem("UsuarioActivo",JSON.stringify(usuario));
}
