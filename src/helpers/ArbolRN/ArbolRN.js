import Nodo from "./Nodo"
import { isNull } from "util";
import vis from "../../../node_modules/vis/dist/vis.js"

class ArbolRN
{
    constructor()
    {
        this.raizRecorrido = null
        this.raiz = null
        this.info = []
        this.izq = []
        this.der= []
        this.rojo = []
    }

    retornarDataVis()
    {
        
        let arrayNodes = []
        let arrayEdges = []
        let nodes
        let edges
        let data
        if(this.info.length == 1)
        {
            arrayNodes = [
                {id: 0, label: this.info[0] + '', group: 'negro'}
            ]
            nodes = new vis.DataSet(arrayNodes)
            edges = new vis.DataSet(arrayEdges)
            data =
                {
                    nodes,
                    edges,
                };
            return data
        }else if(this.info.length == 2)
        {
            arrayNodes = [
                { id: 0, label: this.info[0] + '', group: 'negro'},
                { id: 1, label: this.info[1] + '', group: 'rojo'},
            ]

            arrayEdges = [
                {from: 0, to: 1}
            ]
            nodes = new vis.DataSet(arrayNodes)
            edges = new vis.DataSet(arrayEdges)
            data =
                {
                    nodes,
                    edges,
                };
            return data
        }
        
        console.log("preOrden")
        console.log(this.preOrden())
        // console.log("izquierda:")
        // console.log(this.izq)
        // console.log("derecha:")
        // console.log(this.der)
        
        // asignamos un objeto para cada elemento del array de nodos, la doc de vis nos pide un array de objetos
        let contadorNulos = 0
        for (let i = 0; i < this.info.length; i++) 
        {
            // aumentamos en 1 los resultados porque la numeracion de vis empieza en 1, no en 0-- creo
            let objetoNode = new Object()
            let objetoEdgeI = new Object()
            let objetoEdgeD = new Object()
            objetoNode.id = i
            objetoNode.label = this.info[i] + ''
            // grupo del nodo: rojo|negro
            objetoNode.group = this.rojo[i] ? "rojo" : "negro"
            arrayNodes.push(objetoNode)
            console.log(this.izq)
            console.log(this.der)
            console.log(arrayNodes)
            console.log(arrayEdges)

            if(this.izq[i] == -1)
            {
                let auxNodeI =  new Object()
                auxNodeI.id = this.info.length + contadorNulos
                auxNodeI.label = 'NULL'
                auxNodeI.group = 'negro'
                arrayNodes.push(auxNodeI)
                
                objetoEdgeI.from = i
                objetoEdgeI.to = this.info.length + contadorNulos
                contadorNulos++
                arrayEdges.push(objetoEdgeI)

            }else{
                objetoEdgeI.from = i
                objetoEdgeI.to = this.izq[i]
                arrayEdges.push(objetoEdgeI)

                
            }

            if (this.der[i] == -1) {
                let auxNodeD = new Object()
                auxNodeD.id = this.info.length + contadorNulos
                auxNodeD.label = 'NULL'
                auxNodeD.group = 'negro'
                arrayNodes.push(auxNodeD)
                objetoEdgeD.from = i
                objetoEdgeD.to = this.info.length + contadorNulos
                contadorNulos ++
                arrayEdges.push(objetoEdgeD)

                
            } else {
                objetoEdgeD.from = i
                objetoEdgeD.to = this.der[i]
                arrayEdges.push(objetoEdgeD)


            }

        }
        
        nodes = new vis.DataSet(arrayNodes)
        edges = new vis.DataSet(arrayEdges)
        data = 
        {
            nodes,
            edges,
        };
        return data
    }
    añadirVis(nodo)
    {
        
        // se usará este metodo cuando todos la info esté guardada, osea en el recorrido pre-orden
        console.log("añadirVis")
        console.log(nodo)
        let sIndex = this.info.indexOf(nodo.numero)
        this.rojo[sIndex] = nodo.rojo
        if (!isNull(nodo.izquierda))
        {
            let izqIndex = this.info.indexOf(nodo.izquierda.numero) 
            this.izq[sIndex] = izqIndex
        }else{
            this.izq[sIndex] = -1
            
        }
        if (!isNull(nodo.derecha)) 
        {
            let derIndex = this.info.indexOf(nodo.derecha.numero)
            this.der[sIndex] = derIndex
        }else{
            this.der[sIndex] = -1
        }
        
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
        // juntar datos para vis
        this.info.push(numero)
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
            hermanoDePadre.padre = padreDePadre
            hermanoDePadre.izquierda = nodo
            nodo.padre = hermanoDePadre
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
        for (let i = 0; i < this.info.length; i++) {
            this.izq[i] = -1
            this.der[i] = -1
            this.rojo[i] = false

        }
        if(this.info.length  == 1)
        {
            this.rojo[0] = false
            this.izq[0] = -1
            this.der[0] = -1
            return this.raiz.numero + '.' + this.raiz.rojo
        } else if (this.info.length == 2)
        {
            if (this.info[0] >= this.info[1])
            {
                this.izq[0] = -1
                this.izq[1] = -1
                this.der[0] = 1
                this.der[1] = -1
            }else{
                this.izq[0] = 1
                this.izq[1] = -1
                this.der[0] = -1
                this.der[1] = -1
            }
            this.rojo = [false, true] 
            return this.info[0] + '.' + this.rojo[0] + '-' + this.info[1] + '.' + this.rojo[1]
        }else{
            return this.preOrden3()
        }
    }
    preOrden3() 
    {
        this.raizRecorrido = this.raiz
        let aux
        let sup = 0
        let pila = []
        // console.log()
        pila[sup] = this.raizRecorrido
        let salida = this.raizRecorrido.numero + '.' + this.raizRecorrido.rojo + '-'
        this.añadirVis(this.raizRecorrido)
        let contador = 0
        while (true && sup >= 0) {
            
            
            if (pila[sup].numero === this.raizRecorrido.numero) {
                contador++
            }
            if (contador === 3) {
                break
            }
    
            // console.log("pila[sup]")
            // console.log(pila[sup])
            // console.log("pila")
            // console.log(pila)
            // console.log(salida)
            // si la izquierda no es nula - si tiene hijos izq
            if (!isNull(pila[sup].izquierda) || !pila[sup].izquierda === undefined) {
                aux = pila[sup].izquierda
                this.añadirVis(aux)
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
                    this.añadirVis(aux)
                    
                    sup++
                    pila[sup] = aux

                    // si no hay hijos a la der - nodo hoja
                } else {
                    // retrocedemos en la pila
                    let a = pila.pop()
                    


                    sup--
                    // if (pila[sup] === undefined)
                    // {
                    //     let s = salida.split('-')
                    //     s.pop()
                    //     let p = s.join('-')
                    //     return p
                    // }
                    // console.log(" sup")
                    // console.log( sup)
                    // console.log(!pila[sup] === undefined)
                    // if(!pila[sup] === undefined && sup >= 0)
                    // {
                    console.log(salida)
                    if (isNull(pila[sup].izquierda)) 
                    {
                        pila[sup].derecha = null
                    }
                    pila[sup].izquierda = null
                    // }
                    
                
                    // pila[sup].derecha = null
                    // console.log("superior: " + sup)
                    // console.log("Estamos en:" + pila[sup].numero)
                    
                }
            }
            // console.log("-----------------------------------------")
        }
        // salida pre-orden -> se quita el ultimo guion de mas
        let nsalida = salida.split('-')
        nsalida.pop()
        let preOrden = nsalida.join('-')
        this.raizRecorrido = this.raiz
        return preOrden
    }
}

export default ArbolRN