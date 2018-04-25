<template>
  <div class="ed-item ed-container main-center main-trabajo--1">
    <div class="ed-item m-60">
        <h2 class="input-text" >Hola, {{nombre}}</h2>
        <input v-model="nombre" type="text">
    </div>
    <hr class="separador">
    <div id="mynetwork" class=" ed-item l-80  main-trabajo--1__grafico"></div>
    <h2 class="ed-item main-center cross-center"> Recorrido: {{recorrido}}</h2>

</div>
</template>


<script>
  import vis from "../../../node_modules/vis/dist/vis.js"
  import Arbol from '../../helpers/Arbol'
  import iniciarVis from '../../helpers/iniciarVis'

export default {
  name: 'Trabajo1',
  data()
  {
      return {
          nombre: "Cris",
          recorrido: '',
      }
  },
  methods:
  {
    iniciarArbol()
    {
        // arbol creado para probar
        // prueba 1
        // let info = ['A','B','C','D','E','F','G']
        // let izq = [-1,  0, 1, -1, 2, -1, -1];
        // let der = [-1, -1, 3, -1, 5,  6, -1];
        // prueba 2
        // let info = ['D',' ','B',' ','A','E','C','F','G',' ','H','K',' ']
        // let izq = [8,-2,0,-2,2,-1,5,-1,-1,-2,-1,-1,-2]
        // let der = [10,-2,-1,-2,6,-1,7,-1,-1,-2,11,-1,-2]
        // prueba3
        let info = ['ella', 'no', 'te', 'ama', 'date', 'por', 'vencido']
        let izq = [-1, 0, -1, 1, -1, 4, -1]
        let der = [-1, 2, -1, 5, -1, 6, -1]
        let a = new Arbol(info, izq, der, 3)
        this.recorrido = a.inOrden()
        this.iniciarVis(info, izq, der,4)
    },
    iniciarVis(nodos, izq, der, raiz)
    {
        // VIS
        // data por defecto de prueba para VIS
        // var nodes = new vis.DataSet([
        //     { id: 1, label: 'Ama' },
        //     { id: 2, label: 'Por' },
        //     { id: 3, label: 'No' },
        //     { id: 4, label: 'Date' },
        //     { id: 5, label: 'Vencido' },
        //     { id: 6, label: 'Ella' },
        //     { id: 7, label: 'Te' },
        // ]);

        // // create an array with edges
        // var edges = new vis.DataSet([
        //     { from: 1, to: 3 },
        //     { from: 1, to: 2 },
        //     { from: 2, to: 4 },
        //     { from: 2, to: 5 },
        //     { from: 3, to: 6 },
        //     { from: 3, to: 7 },
        // ]);
        let arrayNodes = []
        let arrayEdges = []
        // asignamos un objeto para cada elemento del array de nodos, la doc de vis nos pide un array de objetos
        for (let i = 0; i < nodos.length; i++) 
        {
          // aumentamos en 1 los resultados porque la numeracion de vis empieza en 1, no en 0-- creo
          let objetoNode = new Object()
          let objetoEdgeI = new Object()
          let objetoEdgeD = new Object()
          objetoNode.id = i+1
          objetoNode.label = nodos[i]
          arrayNodes.push(objetoNode)
          objetoEdgeI.from = i +1
          objetoEdgeI.to = izq[i] +1
          objetoEdgeD.from = i +1
          objetoEdgeD.to = der[i] +1
          arrayEdges.push(objetoEdgeI)
          arrayEdges.push(objetoEdgeD)

        }
        var nodes = new vis.DataSet(arrayNodes)
        var edges = new vis.DataSet(arrayEdges)
        // seleccionamos el elemento del html donde va a poner el arbol
        var container = document.getElementById('mynetwork');

        // le pasamos la data que necesita vis para su funcionamiento
        var data = {
          nodes,
          edges,
        };
        var options = {
          locale: 'es',
          nodes: {
            color: '#fff',
            font: {
                color: '#015249',
                size: 20, // px
                face: 'arial',
            }
          },
          layout:
          {
            // randomSeed: 1,
            improvedLayout: true,
            hierarchical:
            {
                enabled: true,
                levelSeparation: 150,
                nodeSpacing: 50,
                treeSpacing: 100,
                blockShifting: true,
                edgeMinimization: true,
                parentCentralization: true,
                direction: 'UD',        // UD, DU, LR, RL
                sortMethod: 'directed'   // hubsize, directed
            }
          }
        };

        // iniciamos el network -- red -- en este caso arbol
        var network = new vis.Network(container, data, options);

        // FIN VIS
    }
  },
  mounted()
  {
    this.iniciarArbol()
  }
  
}
</script>

