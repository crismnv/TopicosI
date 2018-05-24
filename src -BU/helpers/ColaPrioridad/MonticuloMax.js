import { isNull } from "util";

class MonticuloMax
{
    // se esta trabajando con un monticulo de maximos
    constructor()
    {
        this.datos = []
    }

    añadir(x)
    {
        this.datos.push(x)
        // si no es la raiz comprobamos 
        if (this.datos.length != 1) 
            this.comprobarHaciaArriba(this.datos.length)
        // Comprobaremos si el nuevo elemento esta bien posicionado
    }
    // Los Parametros se estan trabajando como si el array empezara en 1, y en el metodo se cambia
    comprobarHaciaArriba(posNodo)
    {
        if (posNodo == 1)
            return
        console.log('Comprueba ' + this.datos[posNodo - 1]);
        
        let posEval = posNodo - 1
        let posPadre = parseInt(posNodo / 2) - 1 
        // comprueba si es mayor
        if (this.datos[posEval] >= this.datos[posPadre])
        {
            let aux = this.datos[posEval]
            this.datos[posEval] = this.datos[posPadre]
            this.datos[posPadre] = aux
            // hace el cambio y comprueba el padre
            this.comprobarHaciaArriba(posPadre + 1)
        }
    }

    // Los Parametros se estan trabajando como si el array empezara en 1, y en el metodo se cambia
    sacar()
    {
        let r = this.datos[0]
        this.datos[0] = this.datos[this.datos.length - 1]
        this.datos.pop()
        // console.log('Se saca el: ' + r)
        // console.log('Array sin modificar->')
        // console.log(this.datos)

        if(this.datos.length > 1)
            this.comprobarHaciaAbajo(1)
        
        // console.log('Array->')
        // console.log(this.datos)
        
        
        return r
    }
    
    // Los Parametros se estan trabajando como si el array empezara en 1, y en el metodo se cambia
    comprobarHaciaAbajo(posNodo)
    {
        if(posNodo * 2 > this.datos.length)
            return

        console.log('Comprueba ' + this.datos[posNodo - 1]);
        
        let posEval = posNodo - 1
        // hijo 1 = pos * 2 -> se le resta 1 porque el array cuenta en 0
        let posHijo1 = posNodo * 2 - 1
        // comrpueba si es que tiene hijo, si tiene su pos = posNodo * 2 -1 +1, en resumen ->
        let posHijo2 = this.datos.length >= posNodo * 2 ? posNodo * 2 : null
        // si tiene hijo 2
        let posHijoMayor
        if(!isNull(posHijo2))
        
            // elije al mayor de los hijos
            posHijoMayor = this.datos[posHijo1]  > this.datos[posHijo2] ? posHijo1 : posHijo2
            // evalua si es que el nodo a evaluar es mayor al hijo mayor, si es así cambia, sino acaba
        else
            posHijoMayor = posHijo1
            // si es que no hay hijo 2 el hijo mayor es el 1-- ¿No me digas?
            
        if(this.datos[posHijoMayor] > this.datos[posEval] )
        {
            console.log('Cambia');
            
            let aux = this.datos[posEval]
            this.datos[posEval] = this.datos[posHijoMayor]
            this.datos[posHijoMayor] = aux
            // hace el cambio y comprueba al hijo
            this.comprobarHaciaAbajo(posHijoMayor + 1)
        }
    }
}

export default MonticuloMax