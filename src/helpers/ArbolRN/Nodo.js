class Nodo
{
    constructor(numero, texto, rojo)
    {
        this.numero = numero
        this.texto = texto
        this.rojo = rojo
        this.izquierdo = null
        this.derecho = null
        this.padre = null

    }
}

export default Nodo