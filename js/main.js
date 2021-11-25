//Este script se ejecutará en todas la páginas del proyecto ya que influye en su comportamiento, salvo en el login y registro


//En cada menu de la pagina variará el menu dependiendo si hay un usuario activo o no
//Si no lo esta le aparcerá un boton de Inicar Sesion
//Si sí lo está le aparecerá un boton con el nombre de su perfil y podrá ir a su perfil de usuario

var enlacePerfil = document.createElement("a");
enlacePerfil.setAttribute("class","nav-link");
enlacePerfil.id = "enlacePerfil";
document.getElementById("btnUsuario").appendChild(enlacePerfil);
var usuario = JSON.parse(sessionStorage.getItem("UsuarioActivo"));
if(usuario != null){
    enlacePerfil.innerHTML = usuario.nick;
    enlacePerfil.href = "./perfilUsuario.html";
}else{
    enlacePerfil.innerHTML = "INICIAR SESION";
    enlacePerfil.href = "./login.html";
}



//Si existen peliculas guardadas en el localstorage nos las guardamos en un array
//Si no existen todavía peliculas en el localstorage, llenamos un array con objetos de tipo Pelicula y la guardamos en el local para tener siempre productos
if(localStorage.getItem("Peliculas") != null){
    var listaPeliculas = JSON.parse(localStorage.getItem("Peliculas"));
}else{
    var listaPeliculas = [];
    var listaComentarios = [];
    listaPeliculas.push(new Pelicula("Venom","112 minutos","USA","Terror","20.10.2021",
    "Sam Jones","James Brown","James Brown","Regreso de Eddie Brock (Tom Hardy), el astuto periodista y reportero que, después de quedar infectado, experimentará radicales cambios en su cuerpo y adquirirá los poderes del simbionte Venom, que usa a Brock como huésped y le convertirá en un despiadado y peligroso súpervillano. En esta ocasión, Venom se reencontrará con Cletus Cassady, más conocido como Carnage, el enemigo más sangriento de la historia de Spider-Man. Esta secuela sobre el simbionte de Marvel es la " +
    "continuación de Venom (2018), el spin-off del universo de Spider-Man sobre el personaje de" +
    " Venom, creado a principios de los años 80 por los autores de cómics David Michelinie y Todd McFarlane.","8",listaComentarios,"./imagenes/Cards/caratulaVenom.jpg"));

    listaPeliculas.push(new Pelicula("1917","134 minutos","USA","Drama","10.01.2020","Sam Mendes",
    "Sam Mendes","James Brown","1917 cuenta la historia de dos jóvenes soldados británicos" +
    " en plena guerra, el cabo Schofield y el cabo Blake a los que "+
    "se les encomienda una tarea aparentemente imposible. En" + 
    " una carrera contra el reloj, deberán atravesar el territorio" +
    " enemigo para entregar un mensaje que podría salvar la " +
    "vida de 1600 de sus compañeros soldados, entre ellos el" +
    " propio hermano de Blake. En esta envolvente experiencia"+
    " cinematográfica, Mendes sumerge a los espectadores en" +
    " el peligro inmediato y la gran escala de la Primera Guerra"+
    " Mundial, lo que les permite presenciar el conflicto de una"+
    "manera apremiante y vertiginosa.","6",listaComentarios,"./imagenes/Cards/caratula1917.jpg"));

    listaPeliculas.push(new Pelicula("X-Men","113 minutos","USA","Accion","07.06.2019",
    "Simon Kingberg","Simon Kingberg","James Brown","Durante una misión de rescate en el espacio, Jean Grey"+
    " casi muere al ser alcanzada por una fuerza cósmica cuyos"+
    " poderes superan con creces lo conocido o poseído por los"+
    " mutantes. Cuando regresa a casa, tendrá que hacer frente"+
    " a estas habilidades semi divinas, pero la fuerza que habita"+
    " en su interior es tan poderosa que apenas puede contenerla."+
    " Sumida en una espiral fuera de control, Jean hace daño"+
    " a aquellos que más ama. Sus hechos dividirán a los X-Men"+
    " y los héroes se verán desconcertados en un momento en"+
    " el que deberán hacer frente al enemigo más peligroso de"+
    "todos: uno de los suyos.","8",listaComentarios,"./imagenes/Cards/caratulaXmen.jpeg"));


    listaPeliculas.push(new Pelicula("The Addams Family","111 minutos","USA","Animacion",
    "04.10.2020","Conrad Vernon","Conrad Vernon","James Brown","Secuela de la película de animación La familia Addams (2019), que trae de regreso a la peculiar y "+
    "macabra familia formada por Morticia y Gómez, junto con sus dos hijos, la siniestra adolescente "+
    "Miércoles y Pugsley, un niño aficionado a toda clase de maldades. Además, la familia se completa "+
    "con el alegre y caótico tío Fétido y la abuela Addams. Esta segunda entrega está nuevamente "+
    "basada en las viñetas creadas por Charles Addams en 1933 para la revista The New Yorker...","9",listaComentarios,"./imagenes/Cards/caratulaAddams.jpg"));

    listaPeliculas.push(new Pelicula("Joker","123 minutos","USA","Accion","08.07.2019","Bradeley Cooper","Todd Philips","Hildur","Sinopsis Joker","10",listaComentarios,"./imagenes/Cards/caratulaJoker.jpg"));
    listaPeliculas.push(new Pelicula("Shazam","132 minutos","USA","Accion","05.04.2019","David F.Sandberg","Warner Bros","Marco Beltrani","Sinopsis Shazam","9",listaComentarios,"./imagenes/Cards/caratulaShazam.jpg"));
    listaPeliculas.push(new Pelicula("Animales Fantasticos","122 minutos","USA","Drama","05.08.2016","David Ruself","Warner Bros","Warner Bros","Sinopsis Animales fantasticos","10",listaComentarios,"./imagenes/Cards/caratulaAnimales.jpg"));
    listaPeliculas.push(new Pelicula("Bohemian Rhapsody","114 minutos","USA","Drama","15.08.2019","Bryan May","Warner Bros","Queen","Sinposis Bohemian","8",listaComentarios,"./imagenes/Cards/caratulaBohemian.jpg"));

    localStorage.setItem("Peliculas",JSON.stringify(listaPeliculas));
}


//Si ya existen usuarios en el local se cogen y se guardan en un array
//Si no, siempre cargamos un usuario Adminstrador que es el que va a manejar en la App y un usuario normal
//Para entrar como Administrador hay que loguearse con el nick (Administrador) y contraseña(1234)
if(localStorage.getItem("Usuarios") != null){
    var listaUsuarios = JSON.parse(localStorage.getItem("Usuarios"));
}else{
    var listaUsuarios = [];
    listaUsuarios.push(new Usuario("Administrador","Administrador","Administrador","adminitrador@admin.com","1234"));
    listaUsuarios.push(new Usuario("santiago19","Santiago","Asqui","santiago.asqui@email.com","santiago19"));
    localStorage.setItem("Usuarios",JSON.stringify(listaUsuarios));
}


//Creamos una funcion de fitrar peliculas por genero dependiendo de que genero reciba, filtrará por un genero u otro
function filtrarPeliculas(lista, genero){
    var listaFiltrada = lista.filter(Pelicula => Pelicula.genero == genero);
    return listaFiltrada;
}


//Añadimos al menu las funciones de filtrar dependiendo de a que genero clicke el usuario
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