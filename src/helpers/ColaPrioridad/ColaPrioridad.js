import { isNull } from "util";

class ColaPrioridad
{
    // se esta trabajando con un monticulo de maximos
    constructor()
    {
        this.clientes = []
    }

    añadir(cliente)
    {
        this.clientes.push(cliente)
        // si no es la raiz comprobamos 
        if (this.clientes.length != 1) 
            this.comprobarHaciaArriba(this.clientes.length)
        // Comprobaremos si el nuevo elemento esta bien posicionado
    }
    // Los Parametros se estan trabajando como si el array empezara en 1, y en el metodo se cambia
    comprobarHaciaArriba(posNodo)
    {
        if (posNodo == 1)
            return
        console.log('Comprueba ' + this.clientes[posNodo - 1]);
        
        let posEval = posNodo - 1
        let posPadre = parseInt(posNodo / 2) - 1 
        // comprueba si es de mayor prioridad

        if (this.clientes[posEval].nivelTarjeta > this.clientes[posPadre].nivelTarjeta)
        {
            let aux = this.clientes[posEval]
            this.clientes[posEval] = this.clientes[posPadre]
            this.clientes[posPadre] = aux
            // hace el cambio y comprueba el padre
            this.comprobarHaciaArriba(posPadre + 1)
        }
        if(this.clientes[posEval].nivelTarjeta == this.clientes[posPadre].nivelTarjeta)
        {
            if(this.clientes[posEval].nroLlegada < this.clientes[posPadre].nroLlegada)
            {
                let aux = this.clientes[posEval]
                this.clientes[posEval] = this.clientes[posPadre]
                this.clientes[posPadre] = aux
                // hace el cambio y comprueba el padre
                this.comprobarHaciaArriba(posPadre + 1)
            }
        }
    }

    // Los Parametros se estan trabajando como si el array empezara en 1, y en el metodo se cambia
    sacar()
    {
        if(this.clientes.length <= 0)
        {
            alert("Ya no hay mas clientes en la cola")
            return
        }
        let r = this.clientes[0]
        this.clientes[0] = this.clientes[this.clientes.length - 1]
        this.clientes.pop()
        console.log('Se saca el lvl de tarjeta: ' + r.nivelTarjeta + " con entrada: " + r.nroLlegada)
        // console.log('Array sin modificar->')
        // console.log(this.datos)

        if(this.clientes.length > 1)
            this.comprobarHaciaAbajo(1)
        
        // console.log('Array->')
        // console.log(this.datos)
        
        
        return r
    }
    
    // Los Parametros se estan trabajando como si el array empezara en 1, y en el metodo se cambia
    comprobarHaciaAbajo(posNodo)
    {
        if(posNodo * 2 > this.clientes.length)
            return

        // console.log('Comprueba ' + this.clientes[posNodo - 1]);
        
        let posEval = posNodo - 1
        // hijo 1 = pos * 2 -> se le resta 1 porque el array cuenta en 0
        let posHijo1 = posNodo * 2 - 1
        // comrpueba si es que tiene hijo, si tiene su pos = posNodo * 2 -1 +1, en resumen ->
        let posHijo2 = this.clientes.length > posNodo * 2 ? posNodo * 2 : null
        // console.log("ZZZZZZZZZZZZZZZ" + posHijo2 + "y el tamaño del array: " + this.clientes.length)
        // si tiene hijo 2
        let posHijoMayor
        if(!isNull(posHijo2))
        {
            // elije al mayor de los hijos
            if(this.clientes[posHijo1].nivelTarjeta > this.clientes[posHijo2].nivelTarjeta)
                posHijoMayor = posHijo1
            else
                posHijoMayor = posHijo2

            if(this.clientes[posHijo1].nivelTarjeta == this.clientes[posHijo2].nivelTarjeta)
            {

                if(this.clientes[posHijo1].nroLlegada < this.clientes[posHijo2].nroLlegada)
                    posHijoMayor = posHijo1
                else
                    posHijoMayor = posHijo2
            }

        }else
            posHijoMayor = posHijo1
            // si es que no hay hijo 2 el hijo mayor es el 1-- ¿No me digas?
            
        if(this.clientes[posHijoMayor].nivelTarjeta > this.clientes[posEval].nivelTarjeta )
        {
            console.log('Cambia');
            
            let aux = this.clientes[posEval]
            this.clientes[posEval] = this.clientes[posHijoMayor]
            this.clientes[posHijoMayor] = aux
            // hace el cambio y comprueba al hijo
            this.comprobarHaciaAbajo(posHijoMayor + 1)
        }else{
            if(this.clientes[posHijoMayor].nivelTarjeta == this.clientes[posEval].nivelTarjeta)
            {
                if(this.clientes[posHijoMayor].nroLlegada < this.clientes[posEval].nroLlegada )
                {
                    let aux = this.clientes[posEval]
                    this.clientes[posEval] = this.clientes[posHijoMayor]
                    this.clientes[posHijoMayor] = aux
                    // hace el cambio y comprueba al hijo
                    this.comprobarHaciaAbajo(posHijoMayor + 1)
                }
            }
        }
    }
}

export default ColaPrioridad