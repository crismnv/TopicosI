import vis from "../../../node_modules/vis/dist/vis.js"
class Grafo
{
    // constructor()
    // {
    //     this.nodos = []
    //     this.rutas = []
    //     this.pesos = []
    //     this.rutas = []
    //     this.nombres = []
    // }
    constructor()
    {
        this.nombres = ['R', 'S', 'T', 'U']
        this.nodos = [
            [0, 4, 1, 2],
            [4, 0, 2, 5],
            [1, 2, 0, 6],
            [2, 5, 6, 0],
        ]
        
        this.pesos= [[], [], [], []]
        this.rutas= [[[], [], [], []], [[], [], [], []], [[], [], [], []], [[], [], [], []]]
    }
    // constructor()
    // {
    //     this.nombres = ['A', 'B', 'C', 'D', 'V']
    //     this.nodos = [
    //         [0, 5, 1, 56, 1],
    //         [5, 0, 2, 1, 2],
    //         [1, 2, 0, 6, 5],
    //         [56, 1, 6, 0, 2],
    //         [1, 2, 5, 2, 0],
    //     ]
        
    //     this.pesos= [[], [], [], [], []]
    //     // this.rutas= [['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']]
    //     this.rutas= [[[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []]]
    // }

    datosVis()
    {
        if(this.nodos.length == 0)
            return {}
         
        let arrayNodes = []
        let arrayEdges = []
        for (let i = 0; i < this.nodos.length; i++) 
        {

            let o = new Object()
            o.id = i
            o.label = this.nombres[i]
            arrayNodes.push(o)
        }

        for (let i = 0; i < this.nodos.length; i++) 
        {
            for (let j = 0; j < this.nodos.length; j++)
            {
                if (i >= j || this.nodos[i][j] == 0)
                    continue
                let o2 = new Object()
                o2.to =  i
                o2.from = j
                o2.label = this.nodos[i][j] + ''
                arrayEdges.push(o2)
            }
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
    
    insertarNodo(nodo, enlaces)
    {
        // console.log('insertando: ' + nodo + ' - con enlaces:')
        // console.log(enlaces)
        
        if(this.nombres.length == 0)
        {
            this.nombres.push(nodo)
            this.nodos = [[0]]
            this.rutas = [[nodo]]
            this.pesos[[0]]
            return
        }

        this.nombres.push(nodo)
        
        enlaces.forEach(value => {
            value = parseInt(value)
        })

        this.nodos.push(enlaces)

        for (let i = 0; i < this.nodos.length - 1; i++)
        {
            this.nodos[i].push(parseInt(enlaces[i]))
        }
        this.pesos = []
        this.rutas = []
        for(let i = 0; i < this.nodos.length; i++)
        {
            this.pesos.push([])
            let ruta = []
            for(let j = 0; j < this.nodos.length; j++)
            {
                ruta.push([])
            }
            this.rutas.push(ruta)
        }
        // console.log(this.nodos)

        this.caminoMasCorto()

    }

    caminoMasCorto()
    {
        // this.rutas= [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']]
        // this.pesos = []
        // establecemos el peso inicial
        for (let i = 0; i < this.nodos.length; i++)
        {
            for (let j = 0; j < this.nodos.length; j++)
            {
                // console.log("nombres:")
                // console.log(this.nombres)
                // console.log("Pesos:")
                // console.log(this.pesos)
                // console.log("Rutas:")
                // console.log(this.rutas)
                // console.log("nodos:")
                // console.log(this.nodos)
                
                this.pesos[i][j] = this.nodos[i][j] == 0 ?  Infinity :  this.nodos[i][j]
                // this.rutas[i][j] += this.nombres[i]
                this.rutas[i][j].push(this.nombres[i])
            }
        }
        
        for (let k = 0; k < this.nodos.length; k++)
        {
            for (let i = 0; i < this.nodos.length; i++)
            {
                for (let j = 0; j < this.nodos.length; j++)
                {
                    // se pone el minimo entre this.pesos[i][j] y this.pesos[i][k] + this.pesos[k][j]
                    // si es menor, no pasará nada, por eso se trabaja así la condicion
                    if (this.pesos[i][j] > this.pesos[i][k] + this.pesos[k][j] )
                    {
                        // this.rutas[i][j] += this.nombres[k]
                        if(this.rutas[i][j].length != 1)
                        {
                            this.rutas[i][j].pop()
                        }
                        this.rutas[i][j].push(this.nombres[k] + ',' + this.nombres[j])
                        this.pesos[i][j] = this.pesos[i][k] + this.pesos[k][j]
                    }

                }
                
            }
        }

        // Se colola en la salida los nodos finales
        let nuevasSalidas = []
        for (let i = 0; i < this.nodos.length; i++)
        {
            let ruta = []
            for (let j = 0; j < this.nodos.length; j++)
            {
                ruta.push('')
                // console.log(this.rutas[i][j])
                
                // if(this.rutas[i][j][this.rutas[i][j].length].substring(this.rutas[i][j][this.rutas[i][j].length].length) != this.nombres[j])
                    // this.rutas[i][j].push(this.nombres[j])
                this.rutas[i][j].push( this.nombres[j])

                for (let k = 1; k < this.rutas[i][j].length; k++)
                {
                    if (this.rutas[i][j][k] == this.rutas[i][j][k-1].substring(this.rutas[i][j][k-1].length - 1))
                    {
                        this.rutas[i][j].pop()
                    }
                    
                }
            }
            nuevasSalidas.push(ruta)
        }

        for (let i = 0; i < this.nodos.length; i++)
        {
            let ruta = []
            for (let j = 0; j < this.nodos.length; j++)
            {
                
                
                for (let k = 1; k < this.rutas[i][j].length; k++)
                {
                    nuevasSalidas[i][j] += this.rutas[i][j]+','
                }
            }
        }
        this.rutas = nuevasSalidas



        // // las nuevas salidas son:
        // for (let i = 0; i < this.nodos.length; i++)
        // {
        //     for (let j = 0; j < this.nodos.length; j++)
        //     {
        //         this.rutas.
        //         for (let k = 0; k < this.nodos.length; k++)
        //         {
                    
    
        //         }
        //     }
        // }
    }
}

export default Grafo