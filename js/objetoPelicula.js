//objeto creado mediante class
class Pelicula{
    constructor(titulo,duracion,pais,genero,estreno,
        director,productor,musica,sinopsis,valoracion,comentarios,imagen){
        this.titulo = titulo;
        this.duracion = duracion;
        this.pais = pais;
        this.genero = genero;
        this.estreno = estreno;
        this.director = director;
        this.productor = productor;
        this.musica = musica;
        this.valoracion = valoracion;
        this.sinopsis = sinopsis;
        this.comentarios = comentarios;
        this.imagen = imagen;
    }
    obtenerTitulo(){
        return this.titulo;
    }
    obtenerImagen(){
        return this.imagen;
    }
    cambiarTitulo(nuevoTitulo){
        this.titulo = nuevoTitulo;
    }
}

