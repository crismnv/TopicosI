<template>
  <div class="ed-item ed-container main-center main-trabajo2">
      <div class="ed-item main-trabajo2__title main-center cross-center">
          <h2>COLA DE PRIORIDADES</h2>
      </div>
      <div class="ed-item s-40 main-center cross-center">
        <label for="tarjeta">Nuevo Cliente</label>
        <select 
        v-model="tarjetaSeleccionada"
        id="tarjeta"
        >
            <option value="1">Clasica</option>
            <option value="2">Dorada</option>
            <option value="3">Platino</option>
            <option value="4">Maestra</option>
        </select>
      </div>
      <a 
      class="ed-item s-40  main-center button"
      @click="nuevoCliente(tarjetaSeleccionada)"
      >Insertar</a>
      <div class="ed-item s-40 main-center cross-center">
        <label for="ventanilla">Ventanilla</label>
        <select  
        id="ventanilla"
        v-model="ventanillaSeleccionada"
        >
            <option value="0">Ventanilla 1</option>
            <option value="1">Ventanilla 2</option>
            <option value="2">Ventanilla 3</option>
            <option value="3">Ventanilla 4</option>
            <option value="4">Ventanilla 5</option>
        </select>
      </div>
      <a 
      class="ed-item s-40  main-center button"
      @click="saleCliente(ventanillaSeleccionada)"
      >Sale</a>
      <div  class="ed-item m-50 main-distribute">
          <h2>VENTANILLAS</h2>
        <div id="ventanillas" class=" ed-item main-trabajo2__grafico">
        </div>
      </div>
      <div class="ed-item m-50">
          <H2 class="main-distribute">COLA</H2>
        <div id="monticulo" class="ed-item main-trabajo2__grafico">
        </div>

      </div>
  </div>
        
</template>

<script>
import Banco from "../../helpers/ColaPrioridad/Banco"
import vis from "../../../node_modules/vis/dist/vis.js"

export default {
  name: 'Trabajo2',
  data()
  {
      return {
          tarjetaSeleccionada: 1,
          ventanillaSeleccionada: 0,
          banco: new Banco()
      } 
  },
  methods:
  {
    saleCliente(ventanilla)
    {
      this.banco.saleCliente(parseInt(ventanilla))
      let data = this.banco.ventanillaVis()
      this.iniciarVisVentanilla(data)
      this.iniciarVisMonticulo(this.banco.cola.datosVis())
    },
    nuevoCliente(nivelTarjeta)
    {
      this.banco.nuevoCliente(parseInt(nivelTarjeta))
      let data = this.banco.ventanillaVis()
      this.iniciarVisVentanilla(data)
      if(this.banco.cola.cantidadDeClientes() > 0 )  
        this.iniciarVisMonticulo(this.banco.cola.datosVis())
    },
    iniciarVisVentanilla(data)
    {

      // seleccionamos el elemento del html donde va a poner el arbol
      var container = document.getElementById('ventanillas');

      // le pasamos la data que necesita vis para su funcionamiento
      var options = {
      groups:
      {
        0: 
        {
            color: 
            {
            background: 'white'
            },
            font:
            {
            color: 'black',
            
            }
        },
        4: 
        {
            color: 
            {
            background: 'RebeccaPurple'
            },
            font:
            {
            color: 'black',
            
            }
        },
        3: 
        {
            color: 
            {
            background: 'silver'
            },
            font:
            {
            color: 'black',
            
            }
        },
        2: 
        {
            color: 
            {
            background: 'gold'
            },
            font:
            {
            color: 'black',
            
            }
        },
        1: 
        {
            color: 
            {
            background: 'peru'
            },
            font:
            {
            color: 'black',
            
            }
        },
        

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
    },
    iniciarVisMonticulo(data)
    {

      // seleccionamos el elemento del html donde va a poner el arbol
      var container = document.getElementById('monticulo');

      // le pasamos la data que necesita vis para su funcionamiento
        var options = {
        groups:
        {
        666:
        {
            color: 
            {
                background: 'black'
            },
            font:
            {
                color: 'white',
            }
        },
        4: 
        {
            color: 
            {
            background: 'RebeccaPurple'
            },
            font:
            {
            color: 'black',
            
            }
        },
        3: 
        {
            color: 
            {
            background: 'silver'
            },
            font:
            {
            color: 'black',
            
            }
        },
        2: 
        {
            color: 
            {
            background: 'gold'
            },
            font:
            {
            color: 'black',
            
            }
        },
        1: 
        {
            color: 
            {
            background: 'peru'
            },
            font:
            {
            color: 'black',
            
            }
        },


        },
        locale: 'es',
        nodes: {
            color: '#015249',
            font: {
                color: '#000',
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
                levelSeparation: 200,
                nodeSpacing: 450,
                treeSpacing: 500,
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
    
    let data = this.banco.ventanillaVis()
    this.iniciarVisVentanilla(data)

  }
}
</script>
