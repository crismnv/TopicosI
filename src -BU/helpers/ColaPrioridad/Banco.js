import ColaPrioridad from "./ColaPrioridad"
import Cliente from "./Cliente"
import { isNull } from "util";
import vis from "../../../node_modules/vis/dist/vis.js"

class Banco
{
    constructor()
    {
        this.ventanillas = [null, null, null, null, null]
        this.contadorPersonas = 1
        this.lugaresDisponibles = 5
        // this.tarjeta = new Map()
        // this.tarjeta.set('clasica', 1)
        // this.tarjeta.set('dorada', 2)
        // this.tarjeta.set('platino', 3)
        // this.tarjeta.set('maestra', 4)
        this.cola = new ColaPrioridad()
    }

    nuevoCliente(nivelTarjeta)
    {
        let cliente = new Cliente(this.contadorPersonas, nivelTarjeta)
        this.contadorPersonas++
        if (this.cola.cantidadDeClientes() == 0 && this.lugaresDisponibles > 0)
        {
            for (let i = 0; i < 5; i++) 
            {
                if(isNull(this.ventanillas[i]))
                {
                    this.ventanillas[i] = cliente
                    this.lugaresDisponibles--
                    break
                }
            }
            // if(this.ventanillas.length == 5)
            //     this.lugaresDisponible = false
        }
        else{
            this.cola.añadir(cliente)
        }
    }

    saleCliente(nroVentanilla)
    {
        if(isNull(this.ventanillas[nroVentanilla]))
        {
            alert("No hay nadie en esa ventanilla")
            return
        }
        this.ventanillas[nroVentanilla] = null
        let cliente = this.cola.sacar()
        if(isNull(cliente)) 
            this.lugaresDisponibles++
        else
            this.ventanillas[nroVentanilla] = cliente
    }

    ventanillaVis()
    {
        let arrayNodes = []
        let arrayEdges = []
        for (let i = 0; i < 5; i++) 
        {
            let o = new Object()
            o.id = i
            // if (isNull(this.ventanillas[i]))
            if (i + 1 > this.ventanillas.length || this.ventanillas[i] == null)
            {
                o.label = 'Vacio'
                o.group = 0
            }else{
                let tarjeta
                switch (this.ventanillas[i].nivelTarjeta) {
                    case 1:
                        tarjeta = 'Clásica'       
                        break;
                    case 2:
                        tarjeta = 'Dorada'       
                        break;
                    case 3:
                        tarjeta = 'Platino'       
                        break;
                    case 4:
                        tarjeta = 'Maestra'       
                        break;
                
                }
                o.label = 'Llegada: ' + this.ventanillas[i].nroLlegada + ' Tarjeta ' + tarjeta
                o.group = this.ventanillas[i].nivelTarjeta
            }
            arrayNodes.push(o)
            let o2 = new Object()
            o2.from = i
            o2.to =  i + 1
            arrayEdges.push(o2)
        }
        let nodes = new vis.DataSet(arrayNodes)
        let edges = new vis.DataSet(arrayEdges)
        let data = 
        {
            nodes,
            edges,
        };
        return data

    }
}

export default Banco