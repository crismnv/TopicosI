class Pila
{
    constructor(elementos)
    {
        this.elementos = elementos || []
    }
    
    sacar() 
    {
        return this.elementos.pop()    
    }

    meter(elemento) 
    {
        this.elementos.push(elemento)
        // alert(elemento)
    }

    tieneElementos()
    {
        return size() > 0
    }
    

    tamaño()
    {
        return this.elementos.size()
    }
    
    imprimirElementos()
    {
        console.log("Elementos de la pila")
        this.elementos.forEach(v => {
            console.log(v)
        });
    }

}

export default Pila
