class Usuario{
    constructor(nick,nombre, apellido, email,contrasena){
        this.nick = nick;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.contrasena = contrasena;
    }
    obtenerNick(){
        return this.nick;
    }
    cambiarNick(nuevoNick){
        this.nick = nuevoNick;
    }
    obtnerContrasena(){
        return this.contrasena;
    }
}