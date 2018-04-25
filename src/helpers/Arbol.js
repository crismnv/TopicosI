class Arbol {

    constructor(nodos, punterosIzquierda, punterosDerecha, raiz) 
    {
        this.nodos = nodos
        this.punterosDerecha = punterosDerecha
        this.punterosIzquierda = punterosIzquierda
        this.raiz = raiz
        this.salida = ''
        this.ptrArbol = raiz
        this.sup = 0
        this.pila = []    
        this.pila[0] = -1 
    }

    inOrden()
    {
        while (this.ptrArbol >= 0) 
        {
            this.sup++
            this.pila[this.sup] = this.ptrArbol
            this.ptrArbol = this.punterosIzquierda[this.ptrArbol]
        }
        this.ptrArbol = this.pila[this.sup]
        this.sup--
        this.inOrdenD()
        return this.salida.substring(0, this.salida.length - 1)
    }

    inOrdenD()
    {
        while (this.ptrArbol >= 0) 
        {
           this.salida += this.nodos[this.ptrArbol] + '-'
            if (this.punterosDerecha[this.ptrArbol] >= -1)
            {
                this.ptrArbol = this.punterosDerecha[this.ptrArbol]    
                this.inOrden()
            }
            this.ptrArbol = this.pila[this.sup]
            this.sup--
        }
    }
}

export default Arbol