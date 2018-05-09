import ColaPrioridad from "./ColaPrioridad";
class Banco
{
    constructor()
    {
        this.ventanillas = []
        this.lugarDisponible = true
        this.tarjeta = new Map()
        this.tarjeta.set('clasica', 1)
        this.tarjeta.set('dorada', 2)
        this.tarjeta.set('platino', 3)
        this.tarjeta.set('maestra', 4)
    }

    nuevoCliente(cliente)
    {
        
    }
}

export default Banco