class KMP
{

    crearTabla(patron)
    {
    let tabla = []
    let pos = 2
    let cnd = 0

    tabla[0] = -1
    tabla[1] = 0

    while (pos < patron.length) 
    {
        if(patron[pos - 1] == patron[cnd])
        {
            cnd++
            tabla[pos] = cnd
            pos++
        }else if(cnd > 0)
            cnd = tabla[cnd]
        else
        {
            tabla[pos] = 0
            pos ++
        }

    }

    return tabla
    }
    busca(cadena, patron)
    {
        // indice del inicio de la busqueda
        let m = 0 
        // posicion del caracter actual en el patron
        let i = 0

        let tabla = this.crearTabla(cadena)

        let r = new Object()
        r.posicion = -1
        r.tabla = tabla
        while (m+i < cadena.length) 
        {
            if(patron[i] == cadena[m + i])
            {
                if(i == patron.length - 1)
                {
                    r.posicion = m
                    break
                }
                i ++
            }else{
                m += i - tabla[i]
                if(tabla[i] > -1)
                    i = tabla[i]
                else
                    i = 0
            }
        }
        return r
    }
}

export default KMP