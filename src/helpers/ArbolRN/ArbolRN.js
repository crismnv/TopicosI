import Nodo from "./Nodo"
import { isNull } from "util";
import { SIGABRT } from "constants";

class ArbolRN
{
    constructor()
    {
        this.raiz = null
    }

   

    insertarNodo(numero)
    {
        let nuevoNodo
        let esHijoDer
        
        if (isNull(this.raiz) ) 
        {
            nuevoNodo = new Nodo(numero, false)
            this.raiz = nuevoNodo
        }else{
            nuevoNodo = new Nodo(numero, true)
            nuevoNodo.padre = this.raiz
            while(true)
            {
                // recorre los nodos que existan para buscar el lugar del nuevo nodo en base a su numero

                if(numero < nuevoNodo.padre.numero)
                {
                    if(nuevoNodo.padre.izquierda != null)
                    {
                        nuevoNodo.padre = nuevoNodo.padre.izquierda
                    }else
                    {
                        nuevoNodo.padre.izquierda = nuevoNodo
                        esHijoDer = false
                        break
                    }
                }else{
                    if(nuevoNodo.padre.derecha != null)
                    {
                        nuevoNodo.padre = nuevoNodo.padre.derecha
                    }else{
                        nuevoNodo.padre.derecha = nuevoNodo
                        esHijoDer = true
                        break
                    }
                }
            }
            // en caso de que se presente que el padre del nuevo nodo es rojo envia al metodo que soluciona esto
            if (nuevoNodo.padre.rojo) 
            {
                this.casoRojoRojo(nuevoNodo.padre, esHijoDer)    
            }
        }
    }

    casoRojoRojo(nodo, esHijoDer)
    {
        
        let padreDePadre = nodo.padre
        let hermanoDePadre
        let temporal
        if(!isNull(padreDePadre.izquierda) && !isNull(padreDePadre.derecha))
        {
            if( nodo == padreDePadre.izquierda)
            hermanoDePadre = padreDePadre.derecha
            else
            hermanoDePadre = padreDePadre.izquierda
            
            if(hermanoDePadre.rojo)
            {
                hermanoDePadre.rojo = false
                nodo.rojo  = false
                if(padreDePadre != this.raiz)
                    padreDePadre.rojo = true
                
                if (!isNull(padreDePadre.padre))
                {
                    if(padreDePadre.padre.rojo)
                    this.casoRojoRojo(padreDePadre.padre, padreDePadre.padre.izquierda != padreDePadre)
                }
                return 
            }
        }
        
        if(!esHijoDer && padreDePadre.izquierda == nodo)
        {
            nodo.rojo = false
            padreDePadre.rojo = true
            temporal = nodo.derecha
            nodo.derecha = padreDePadre
            nodo.padre = padreDePadre.padre
            padreDePadre.padre = nodo
            padreDePadre.izquierda = temporal
            if(!isNull(temporal))
                temporal.padre = padreDePadre
            
                
            if(!isNull(nodo.padre))
            {
                temporal = nodo.padre
                if(temporal.izquierda == nodo.derecha)
                    temporal.izquierda = nodo
                else
                    temporal.derecha = nodo
            }else{
                this.raiz = nodo
            }
        }
        
        else if(esHijoDer && padreDePadre.derecha == nodo)
        {
            nodo.rojo = false
            padreDePadre.rojo = true
            temporal = nodo.izquierda
            nodo.izquierda = padreDePadre
            nodo.padre = padreDePadre.padre
            padreDePadre.padre = nodo
            padreDePadre.derecha = temporal

            if(!isNull(temporal))
                temporal.padre = padreDePadre

            if(!isNull(nodo.padre))
            {
                temporal = nodo.padre
                if(temporal.izquierda == nodo.izquierda)
                {
                    temporal.izquierda = nodo
                }else{
                    temporal.derecha = nodo
                }
            }else{
                this.raiz = nodo
            }
            
        }
        else if(esHijoDer && padreDePadre.izquierda == nodo)
        {
            
            hermanoDePadre = nodo.derecha
            temporal = hermanoDePadre.izquierda
            padreDePadre.izquierda = hermanoDePadre
            nodo.derecha = temporal
            if(!isNull(temporal))
            {
                temporal.padre = nodo
            }
            this.casoRojoRojo(hermanoDePadre, false)
        }
        else if(!esHijoDer && padreDePadre.derecha == nodo)
        {
            // alert("Llega")
            
            hermanoDePadre = nodo.izquierda
            temporal = hermanoDePadre.derecha
            padreDePadre.derecha = hermanoDePadre
            hermanoDePadre.padre = padreDePadre
            hermanoDePadre.derecha = nodo
            nodo.padre = hermanoDePadre
            nodo.izquierda=temporal
            if(!isNull(temporal))
            {
                temporal.padre = nodo
            }
            this.casoRojoRojo(hermanoDePadre, true)
        }        
    }
    preOrden() 
    {
        let aux
        let sup = 0
        let pila = []
        // console.log()
        pila[sup] = this.raiz
        let salida = this.raiz.numero + '.' + this.raiz.rojo + '-'
        let contador = 0
        while (true) {
            
            if (pila[sup].numero === this.raiz.numero) {
                contador++
            }
            if (contador === 3) {
                break
            }
    
            console.log("pila[sup]")
            console.log(pila[sup])
            console.log("pila")
            console.log(pila)
            console.log(salida)
            // si la izquierda no es nula - si tiene hijos izq
            if (!isNull(pila[sup].izquierda) || !pila[sup].izquierda === undefined) {
                aux = pila[sup].izquierda
                salida += aux.numero + '.' + aux.rojo + '-'

                sup++
                // console.log(pila[sup-1].izquierda)

                pila[sup] = aux
                // cuando ya  no hay mas descendientes  a la izquierda
            } else {
                // si hay hijos a la der
                if (!isNull(pila[sup].derecha) || !pila[sup].derecha === undefined) {
                    aux = pila[sup].derecha
                   
                    salida += aux.numero + '.' + aux.rojo + '-'
                    sup++
                    pila[sup] = aux

                    // si no hay hijos a la der - nodo hoja
                } else {
                    // retrocedemos en la pila
                    let a = pila.pop()
                    


                    sup--
                    if (isNull(pila[sup].izquierda)) {
                        pila[sup].derecha = null
                    }
                    pila[sup].izquierda = null
                    // pila[sup].derecha = null
                    console.log("superior: " + sup)
                    // console.log("Estamos en:" + pila[sup].numero)

                }
            }
            console.log("-----------------------------------------")
        }
        // salida pre-orden -> se quita el ultimo guion de mas
        let nsalida = salida.split('-')
        nsalida.pop()
        let preOrden = nsalida.join('-')

        return preOrden
    }
}

export default ArbolRN