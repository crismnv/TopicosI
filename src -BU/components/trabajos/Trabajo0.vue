<template>
  <div class="ed-item ed-container main-center main-trabajo0">
    <div class="ed-item m-60">
        <select 
        name="elegirArbol" 
        id="elegirArbol"
        @change="actualizarOpcion">
          <option value="0"  disabled>Elija una opcion</option>
          <option value="1">Modelo 1</option>
          <option value="2">Modelo 2</option>
          <option value="3">Personalizado</option>
        </select>
    </div>
    <div 
    class="ed-item ed-container main-center cross-center  main-trabajo0__ingreso-datos"
    v-if="arbolElegido==3" ma>
      <h2 class="ed-item  main-center cross-center main-trabajo0__instrucciones">Ingrese la información separada por comas(,) y sin espacios</h2>
      <div class="ed-item m-50 l-25">
        <label for="nodos">Información del Arbol</label>
        <input 
        placeholder="1,2,3"
        type="text" 
        id="nodos"
        v-model="inputNodos">
      </div>
      <div class="ed-item m-50 l-25">
        <label for="punterosIzquierda">Punteros de la Izquierda</label>
        <input 
        placeholder="1,2,3"
        type="text" 
        id="punterosIzquierda"
        v-model="inputIzq">
      </div>
      <div class="ed-item m-50 l-25">
        <label for="punterosDerecha">Punteros de la Derecha</label>
        <input 
        placeholder="1,2,3"
        type="text" 
        id="punterosDerecha"
        v-model="inputDer">
      </div>
      <div class="ed-item m-50 l-25">
        <label for="raiz">Raíz</label>
        <input 
        placeholder="1"
        type="number" 
        id="raiz"
        v-model="inputRaiz"
        min="1">
      </div>
      <a href="#" 
      class="ed-item s-80 m-60 l-50 main-center  cross-center button"
      @click="dibujarArbol">Dibujar</a>
    </div>
    <hr class="separador">
    <div 
    id="mynetwork" 
    class=" ed-item l-70  main-trabajo0__grafico"
    ></div>
    <div class="main-recorridos ed-item main-center">
      <h2 class="ed-item main-center cross-center main-recorridos__title"> RECORRIDOS</h2>
      <div class=" ed-item main-recorrido__contenedor l-50 main-start">

        <h3 class=" main-recorridos__recorrido">
        <i class="icon-lista"></i> <span>INORDEN: </span>{{recorridoIn}}
        </h3>
      
        <h3 class=" main-recorridos__recorrido">
          <i class="icon-lista"></i> <span>PREORDEN: </span>{{recorridoPre}}
        </h3>
        <h3 class=" main-recorridos__recorrido">
          <i class="icon-lista"></i> <span>POSTORDEN: </span>{{recorridoPost}}
        </h3>
      </div>

    </div>
    

</div>
</template>


<script>
  import vis from "../../../node_modules/vis/dist/vis.js"
  import Arbol from '../../helpers/Arbol'

export default {
  name: 'Trabajo0',
  data()
  {
      return {
          arbolElegido: 1,
          recorridoIn: '',
          recorridoPost: '',
          recorridoPre: '',
          inputNodos: '',
          inputIzq: '',
          inputDer: '',
          inputRaiz: '',
          arbolListo: true,
      }
  },
  methods:
  {
    dibujarArbol()
    {
      let info = this.inputNodos.split(',')
      let izq = this.inputIzq.split(',')
      let der = this.inputDer.split(',')
      let raiz = parseInt(this.inputRaiz)
      let nInfo = []
      let nIzq = []
      let nDer = []
      
      izq.forEach( (v) => 
      {
        nIzq.push(parseInt(v))
      })
      der.forEach( (v) => 
      {
        nDer.push(parseInt(v))
      })
      this.iniciarArbol(info, nIzq, nDer, raiz)
      
    },
    actualizarOpcion(e)
    {
      let eleccion = e.target.selectedIndex
      this.arbolElegido = eleccion
      let info = []
      let izq = []
      let der = []
      let raiz = 0
      switch (eleccion) 
      {
        case 1:
          this.arbolListo= true
        
          info = ['ella', 'no', 'te', 'ama', 'date', 'por', 'vencido']
          izq = [-1, 0, -1, 1, -1, 4, -1]
          der = [-1, 2, -1, 5, -1, 6, -1]
          raiz = 3
          this.inputRaiz = raiz
          this.inputNodos = info.join(',')
          this.inputDer = der.join(',')
          this.inputIzq = izq.join(',')
          this.iniciarArbol(info, izq, der, raiz)
          break
      
        case 2:
          this.arbolListo= true
        
          // arbol creado para probar
          // prueba 1
          info = ['A','B','C','D','E','F','G']
          izq = [-1,  0, 1, -1, 2, -1, -1];
          der = [-1, -1, 3, -1, 5,  6, -1];
          raiz = 4
          this.inputRaiz = raiz
          this.inputNodos = info.join(',')
          this.inputDer = der.join(',')
          this.inputIzq = izq.join(',')
          this.iniciarArbol(info, izq, der, raiz)
          break
        case 3: 
          this.arbolListo = false
          alert("Coloca con cuidado los valores, podría haber un bucle infinito")
          
          break     
      }
    },
    iniciarArbol(info, izq, der, raiz)
    {
  
        let a = new Arbol(info, izq, der, raiz)
        // this.recorrido = a.getPreOrden()
        this.recorridoIn = a.rInOrden
        this.recorridoPost = a.rPostOrden
        this.recorridoPre = a.rPreOrden
        this.iniciarVis(info, izq, der,4)
    },
    iniciarVis(nodos, izq, der, raiz)
    {
        let arrayNodes = []
        let arrayEdges = []
        // asignamos un objeto para cada elemento del array de nodos, la doc de vis nos pide un array de objetos
        for (let i = 0; i < nodos.length; i++) 
        {
          // aumentamos en 1 los resultados porque la numeracion de vis empieza en 1, no en 0-- creo
          let objetoNode = new Object()
          let objetoEdgeI = new Object()
          let objetoEdgeD = new Object()
          objetoNode.id = i
          objetoNode.label = nodos[i]
          arrayNodes.push(objetoNode)
          objetoEdgeI.from = i 
          objetoEdgeI.to = izq[i] 
          objetoEdgeD.from = i 
          objetoEdgeD.to = der[i] 
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
    let raiz = 3
    this.inputRaiz = raiz
    this.inputNodos = info.join(',')
    this.inputDer = der.join(',')
    this.inputIzq = izq.join(',')

    this.iniciarArbol(info, izq, der, raiz)
    // alert("El arbol va a cambiar")
  }
  
}
</script>

