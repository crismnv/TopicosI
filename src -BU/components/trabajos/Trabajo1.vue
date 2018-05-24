<template>
  <div class="ed-item ed-container main-center main-trabajo1">
      <div class="ed-item main-trabajo1__title main-center cross-center">
          <h2>ARBOLES <span>ROJI</span><span>NEGROS</span></h2>
      </div>
      <div class="ed-item m-50 main-center cross-center">
        <label for="inputNumero">Información del Arbol</label>
        <input 
        placeholder="28"
        type="number" 
        v-model="inputNumero"
        id="inputNumero">
      </div>
      <a 
      class="ed-item s-80 m-30  main-center button"
      @click="insertarNodo">Insertar</a>
      <div id="arbol-rn" class="ed-item l-70  main-trabajo1__grafico">

      </div>
  </div>
        
</template>


<script>
import vis from "../../../node_modules/vis/dist/vis.js"
import ArbolRN from "../../helpers/ArbolRN/ArbolRN";

export default {
  name: 'Trabajo1',
  data()
  {
    return {
      inputNumero: '',
      datos: []
    }
  },
  methods:
  {
    insertarNodo()
    {
      if (this.inputNumero == '') 
      {
        alert("Ingrese una opción valida")
        return
      }
      // searchIndex- indice de la busqueda
      let sIndex = this.datos.indexOf(parseInt(this.inputNumero))
      if (sIndex != -1) 
      {
        alert("Numero Repetido")
        return  
      }
      this.datos.push(parseInt(this.inputNumero))
      let arbol = new ArbolRN()
      this.datos.forEach(v => {
        arbol.insertarNodo(v)
      });
      // console.log(this.arbol.preOrden())
      console.log((arbol.retornarDataVis()))
      this.iniciarVis(arbol.retornarDataVis())
      // console.log(this.arbol)
    },
    iniciarVis(data)
    {
      

        // seleccionamos el elemento del html donde va a poner el arbol
        var container = document.getElementById('arbol-rn');

        // le pasamos la data que necesita vis para su funcionamiento
        var options = {
         groups:
         {
           rojo: 
           {
            color: 
            {
              background: 'red'
            },
            font:
            {
              color: 'white',
              
            }
           },
           negro: 
           {
             color: 
             {
              background: 'black'
             },
            font:
            {
              color: 'white',
            }
             
           }
           
         },
          locale: 'es',
          nodes: {
            color: '#015249',
            font: {
                color: '#fff',
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
  }
 
}
</script>

