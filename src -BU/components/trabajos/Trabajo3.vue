<template>
  <div class="ed-item ed-container main-center main-trabajo1">
      <div class="ed-item main-trabajo1__title main-center cross-center">
          <h2>EL CAMINO MAS CORTO</h2>
      </div>

       <div 
       v-if="g.nombres.length == 0"
       class="ed-item main-center cross-center">
        <label for="inputNumero">Insertar Nodo</label>
        <input 
        placeholder="V"
        type="text" 
        v-model="inputNodo"
        id="inputNodo">
      </div>
       <div 
       class="ed-item l-50 main-center cross-center"
       v-else>
        <label for="inputNumero">Insertar Nodo</label>
        <input 
        placeholder="V"
        type="text" 
        v-model="inputNodo"
        id="inputNodo">
      </div>
      <div class="ed-item ed-container l-50">
        <div 
        class="ed-item ed-container m-50 l-1-3"
        v-for="(nombre, key) in g.nombres" :key = "key"
        v-if="g.nodos.length > 0"
        >
          <label :for="key">Peso desde {{inputNodo}} a {{nombre}}</label>
          <input type="number" :placeholder="key" id="key" v-model="inputEnlaces[key]">
        </div>
      </div>
      <div class="ed-item ed-container main-center">
      <a 
      class="ed-item m-40 l-50 main-center button"
      @click="insertarNodo(inputNodo, inputEnlaces)"
      >Insertar Nodo</a>

      </div>
      <div id="grafo" class="ed-item l-50  main-trabajo1__grafico">

      </div>
      <div class="ed-item l-50 main-left">
        <ul>
          <div
          v-for="(linea, key) in g.nodos" :key ="g.nombres[key]"
          >
            <div
            v-for="(item, key2) in linea" :key = "key2"
            >
              <li
              v-if="key != key2 && key < key2">
                <h3
                v-if="g.pesos[key][key2] == Infinity"
                >No existe camino de {{g.nombres[key]}} a {{g.nombres[key2]}}</h3>
                <h3
                v-else
                >El camino mas corto de {{g.nombres[key]}} a {{g.nombres[key2]}} es: {{g.rutas[key][key2]}} con peso: {{g.pesos[key][key2]}}</h3>
              </li>
            </div>
          </div>
        </ul>
      </div>
  </div>
        
</template>


<script>
import vis from "../../../node_modules/vis/dist/vis.js"
import Grafo from "../../helpers/Dijkstra/Grafo";

export default {
  name: 'Trabajo3',
  data()
  {
    return {
      g: new Grafo(),
      inputNodo: '',
      inputEnlaces: [],
      insertados: []
    }
  },
  beforeMount()
  {
    this.g.caminoMasCorto()
    // console.log(this.g.nodos)
    // console.log(this.g.rutas)
    // console.log(this.g.pesos)
    
  },
  mounted()
  {
    this.iniciarVis(this.g.datosVis())
      
  },
  methods:
  {
    insertarNodo(inputNodo, inputEnlaces)
    {
      // console.log(inputNodo, inputEnlaces)
      // console.log(this.insertados.indexOf(inputNodo) )
      if (inputNodo == '')
      {
        alert("Se necesita un nombre de nodo") 
        return
      }
      if(this.inputEnlaces.length  != this.g.nombres.length)
      {
        alert("Enlaces Imcompletos")
        return
      }
      if(this.insertados.indexOf(inputNodo) != -1 )
      {
        alert("Nombre del nodo Repetido") 
        return
      }
      this.insertados.push(inputNodo)
      let nodosInsertar = []
      inputEnlaces.forEach(element => 
      {
        nodosInsertar.push(parseInt(element))
      })
        nodosInsertar.push(0)
      // console.log(nodosInsertar)
      this.g.insertarNodo(this.inputNodo, nodosInsertar)
      this.iniciarVis(this.g.datosVis())
      // restablecer valores en la vista
      this.inputNodo = ''
      this.inputEnlaces.forEach(element => {
        element = ''
      });
    },
    iniciarVis(data)
    {
      

        // seleccionamos el elemento del html donde va a poner el arbol
        var container = document.getElementById('grafo');

        // le pasamos la data que necesita vis para su funcionamiento
        var options = {
          locale: 'es',
          nodes: {
            color: '#015249',
            font: {
                color: '#fff',
                size: 20, // px
                face: 'arial',
            }
          },
          edges:
          {
            color: 
            {
              color:'#fff',
              highlight:'#eff',
            },
            font: 
            {
              color: '#015249',
            }
          },
          layout:
          {
            // randomSeed: 1,
            improvedLayout: true,
            hierarchical: false
            // {
            //     enabled: true,
            //     levelSeparation: 300,
            //     nodeSpacing: 150,
            //     treeSpacing: 540,
            //     blockShifting: true,
            //     edgeMinimization: true,
            //     parentCentralization: true,
            //     direction: 'UD',        // UD, DU, LR, RL
            //     sortMethod: 'directed'   // hubsize, directed
            // }
          }
        };

        // iniciamos el network -- red -- en este caso arbol
        var network = new vis.Network(container, data, options);

        // FIN VIS
    }
  }
 
}
</script>

