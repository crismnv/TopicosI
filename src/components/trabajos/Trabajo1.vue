<template>
  <div class="ed-item ed-container main-center main-trabajo--1">
    <div class="ed-item m-60">
        <h2 class="input-text" >Hola, {{nombre}}</h2>
        <input v-model="nombre" type="text">
    </div>
    <hr class="separador">
    <div id="mynetwork" class=" ed-item m-60  main-trabajo--1__grafico"></div>

</div>
</template>


<script>
      import vis from "../../../node_modules/vis/dist/vis.js";

export default {
  name: 'Trabajo1',
  data()
  {
      return {
          nombre: "Cris"
      }
  },
  mounted()
  {
    // VIS
    var nodes = new vis.DataSet([
            {id: 1, label: 'Ama'},
            {id: 2, label: 'Por'},
            {id: 3, label: 'No'},
            {id: 4, label: 'Date'},
            {id: 5, label: 'Vencido'},
            {id: 6, label: 'Ella'},
            {id: 7, label: 'Te'},
        ]);

        // create an array with edges
        var edges = new vis.DataSet([
            {from: 1, to: 3},
            {from: 1, to: 2},
            {from: 2, to: 4},
            {from: 2, to: 5},
            {from: 3, to: 6},
            {from: 3, to: 7},
        ]);

        // create a network
        var container = document.getElementById('mynetwork');

        // provide the data in the vis format
        var data = {
            nodes,
            edges,
        };
        var options = {
            nodes: {
                color: '#fff',
                font: {
                    color: '#015249',
                    size: 14, // px
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

        // initialize your network!
        var network = new vis.Network(container, data, options);

    // FIN VIS
  }
}
</script>

