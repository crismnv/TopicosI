class RK
{
    
    // cadena es la cadena pero convertida a array
    hash(cadena) 
    {
        let hash = 0
        for(let k=0; k<cadena.length; k++)
        {
            hash += cadena[k].charCodeAt()
        }
        return hash
    }

    hash2(cadena) 
    {
        let hash = 0
        for(let k=0; k<cadena.length; k++)
        {
            if (k < cadena.length -1) {
                hash += cadena[k].charCodeAt() * cadena[k+1].charCodeAt()
                // hash += Math.pow(cadena[k].charCodeAt(), 1/cadena[k+1].charCodeAt())
            }else{
                hash += cadena[k].charCodeAt() * cadena[0].charCodeAt()
                // hash += Math.pow(cadena[k].charCodeAt(), 1/cadena[0].charCodeAt())
                
            }
        }
        return hash
    }

    buscaHash1(cadena, patron)
    {
        let tamañoPatron = patron.length
        let falsoPositivo = 0
        if(tamañoPatron == 0)
            return {
                posicion: -1,
                valorHash: 0,
                falsoPositivo: 0
            }  
        for (let i = 0; tamañoPatron + i < cadena.length + 1 ; i++) 
        {
            let comparar = cadena.substr(i, tamañoPatron)
            console.log('Comparando ' + this.hash(comparar)+ ' con ' + this.hash(patron))
            if (this.hash(comparar) == this.hash(patron)) 
            {
                if (comparar === patron) 
                {
                    console.log('Encontrado en:' +i)
                    return {
                        posicion: i,
                        valorHash: this.hash(patron),
                        falsoPositivo
                    } 
                }else
                    falsoPositivo++
            }
        }
        return {
            posicion: -1,
            valorHash: 0,
            falsoPositivo: 0
        }
        
    }
    buscaHash2(cadena, patron)
    {
        let tamañoPatron = patron.length
        let falsoPositivo = 0
        if(tamañoPatron == 0)
            return {
                posicion: -1,
                valorHash: 0,
                falsoPositivo: 0
            }  
        for (let i = 0; tamañoPatron + i < cadena.length + 1 ; i++) 
        {
            let comparar = cadena.substr(i, tamañoPatron)
            console.log('Comparando ' + this.hash2(comparar)+ ' con ' + this.hash2(patron))
            if (this.hash2(comparar) == this.hash2(patron)) 
            {
                if (comparar === patron) 
                {
                    console.log('Encontrado en:' +i)
                    return {
                        posicion: i,
                        valorHash: this.hash2(patron),
                        falsoPositivo
                    } 
                }else
                falsoPositivo++
            }
        }
        return {
            posicion: -1,
            valorHash: this.hash2(patron),
            falsoPositivo
        } 
    }

}

export default RK