import Pila from './Pila'
import { isNull } from "util";

class Arbol 
{
    
    constructor(nodos, punterosIzquierda, punterosDerecha, raiz)
    {
        this.nodos = nodos
        this.punterosDerecha = punterosDerecha
        this.punterosIzquierda = punterosIzquierda
        this.raiz = raiz 
        this.salida = ''
        this.ptrArbol = raiz
        this.pila = new Pila();
        
    }

    getInOrden()
    {
        this.pila.meter(-1)
        this.inOrden()
        alert(this.salida)

    }
    inOrden()
    {
        
        while (this.ptrArbol >= 0) 
        {
            this.pila.meter(this.ptrArbol)
            this.ptrArbol = this.punterosIzquierda[this.ptrArbol]
            // this.pila.imprimirElementos()
             
        }
        // this.pila.Sacar()
        this.ptrArbol = this.pila.sacar()
        // this.salida += this.nodos[this.ptrArbol] + '-'
        this.inOrdenD()
        // return this.salida;
        
    }
   
    inOrdenD()
    {
        while (this.ptrArbol >= 0) 
        {
            if (this.nodos[this.ptrArbol] === undefined ) {
                return
            }
            this.salida += this.nodos[this.ptrArbol] + '-'
            if (this.punterosDerecha[this.ptrArbol] >= 0) 
            {
                this.ptrArbol = this.punterosDerecha[this.ptrArbol]
            }
            this.ptrArbol = this.pila.sacar()
        }
        this.inOrden()
        
    }

    inOrdenO()
    {
        while (this.ptrArbol != -1) 
        {
            this.pila.meter(this.ptrArbol)
            this.ptrArbol = this.punterosIzquierda[this.ptrArbol]

        }
        this.ptrArbol = this.pila.sacar()
        // this.salida += this.nodos[this.ptrArbol] + '-'
        this.inOrdenD()
        // return this.salida;
    }
    
}
export default Arbol