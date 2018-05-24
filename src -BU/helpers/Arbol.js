class Arbol {

    constructor(nodos, punterosIzquierda, punterosDerecha, raiz) 
    {
        this.nodos = nodos
        this.punterosDerecha = punterosDerecha
        this.punterosIzquierda = punterosIzquierda
        this.raiz = raiz
        this.rInOrden = ''
        this.rPostOrden = ''
        this.rPreOrden = ''
        this.ptrArbol = raiz
        this.sup = 0
        this.pila = []
        this.pila[0] = -1 
        this.rInOrden = this.getInOrden()
        this.rPostOrden = this.getPostOrden()
        this.rPreOrden = this.getPreOrden()
    }
    
    // El algoritmos de in-orden se separó en 3 ya que no se pudo aplicar recursividad
    // por el seguimiento en js(muchas llamadas a si mismo)
    // Se subdividió en busqueda de la izquierda(inOrden) e izquierda(inOrdenD)
    getInOrden()
    {
        this.ptrArbol = this.raiz        
        this.sup = 0
        this.pila = []
        this.pila[0] = -1 
        return this.inOrden()
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
        return this.rInOrden.substring(0, this.rInOrden.length - 1)
    }

    inOrdenD()
    {
        while (this.ptrArbol >= 0) 
        {
           this.rInOrden += this.nodos[this.ptrArbol] + ' '
            if (this.punterosDerecha[this.ptrArbol] >= -1)
            {
                this.ptrArbol = this.punterosDerecha[this.ptrArbol]    
                this.inOrden()
            }
            this.ptrArbol = this.pila[this.sup]
            this.sup--
        }
    }

    getPostOrden() 
    {
        this.ptrArbol = this.raiz 
        this.sup = 0
        this.pila = []
        this.pila[0] = -1
        return this.postOrden()
    }

    postOrden()
    {
        while (this.ptrArbol != -1) 
        {
            this.sup++
            this.pila[this.sup] = this.ptrArbol
            if (this.punterosDerecha[this.ptrArbol] != -1) 
            {
                this.sup++
                this.pila[this.sup] = this.punterosDerecha[this.ptrArbol] * -1
            }
            this.ptrArbol = this.punterosIzquierda[this.ptrArbol]
        }
        this.ptrArbol = this.pila[this.sup]
        this.sup--
        this.postOrden2()
        return this.rPostOrden
    }

    postOrden2()
    {
        while (this.ptrArbol > -1) 
        {
            this.rPostOrden += this.nodos[this.ptrArbol] + ' '
            this.ptrArbol = this.pila[this.sup]
            this.sup--    
        }

        if (this.ptrArbol < -1 ) 
        {
            this.ptrArbol *= -1 
            this.postOrden()   
        }
    }
    
    
    getPreOrden()
    {
        this.ptrArbol = this.raiz
        this.sup = 0
        this.pila = []
        this.pila[0] = -1
        while (this.ptrArbol != -1) 
        {
            this.rPreOrden += this.nodos[this.ptrArbol] + ' '
            if (this.punterosDerecha[this.ptrArbol] != -1) 
            {
                this.sup++
                this.pila[this.sup] = this.punterosDerecha[this.ptrArbol]    
            }
            
            if (this.punterosIzquierda[this.ptrArbol] != -1) 
            {
                this.ptrArbol = this.punterosIzquierda[this.ptrArbol]    
            }else{
                this.ptrArbol = this.pila[this.sup]
                this.sup--
            }
        }
        return this.rPreOrden
    }
}

export default Arbol