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
    // insertarNodo()
    // {
    //   this.arbol.insertarNodo(parseInt(this.inputNumero))
    //   // console.log(this.arbol.preOrden())
    //   // console.log((this.arbol.retornarDataVis()))
    //   this.iniciarVis(this.arbol.retornarDataVis())
    //   console.log(this.arbol)
    // },
    insertarNodo()
    {
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
      // console.log((this.arbol.retornarDataVis()))
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
             color: {background: 'red'}
           },
           negro: 
           {
             color: {background: 'black'}
           }
           
         },
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
  }
  ,
  mounted()
  {
    // this.arbol.insertarNodo(5)
    // // console.log(this.arbol.preOrden())
    // this.arbol.insertarNodo(2)
    // // console.log(this.arbol.preOrden())
    // this.arbol.insertarNodo(4)
    // // console.log(this.arbol.preOrden())
    // this.arbol.insertarNodo(1)
    // this.arbol.insertarNodo(3)
    // this.arbol.insertarNodo(6)
    // this.arbol.insertarNodo(8)
    // this.arbol.insertarNodo(10)
    // this.iniciarVis(this.arbol.retornarDataVis())
    // console.log("this.arbol")
    // console.log(this.arbol.preOrden())
    // console.log(this.arbol.preOrden())
    
    // console.log(this.arbol)

    // console.log(this.arbol.retornarDataVis())
  }
  // ,mounted()
  // {
  //   let nodes = new vis.DataSet([
  //       {id: 1, label: 'No hay Informacion'},
  //       {id: 2, label: 'Inserte un numero'},
  //   ]);

  //   // create an array with edges
  //   let edges = new vis.DataSet([
  //       {from: 1, to: 2},
  //   ]);
  //   let data = 
  //   {
  //     nodes,
  //     edges
  //   };
  //   this.iniciarVis(data)
  // }
}
</script>

