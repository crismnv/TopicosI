<template>
  <div class="ed-item ed-container main-center main-trabajo4">
      <div class="ed-item main-trabajo4__title main-distribute cross-center">
          <h2 class="ed-item main-center">BUSQUEDA DE CADENAS</h2>
          <div class="ed-item m-40">
            <label for="cadena">Cadena</label>
            <input 
            v-model="cadena"
            placeholder=""
            type="text" 
            id="cadena">
          </div>
          <div class="ed-item m-40">
            <label for="patron">Patron</label>
            <input 
            v-model="patron"
            placeholder=""
            type="text" 
            id="patron">
          </div>
      </div>
      <div class="main-trabajo4__rabin ed-item s-100 m-50 main-center">
        <h2 class="ed-item main-center">RABIN KARP</h2>
        <div class="ed-item m-60">
          <select  
          @change="actualizarOpcion"
          id="hash" class="main-trabajo4__select">
          <option value="0" disabled selected>Elija un hash</option>
          <option value="1">Hash 1</option>
          <option value="2">Hash 2</option>
          </select>
        </div>
        <div class="main-trabajo4__explicacion-hash ed-item m-80">
          <p 
          v-if="hashElegido==1"
          >Es un una funcion hash muy simple, consiste en la suma de los numeros de su codificación ascii.</p>
          <p 
          v-if="hashElegido==2"
          >Esta función hash consiste la suma de los resultados de multiplicar la codificación ascii de un caracter con el siguiente, si es el ultimo, se multiplicará por el primero.</p>
        </div>
        <div class="main-trabajo4__resultados ed-item ed-container main-distribute cross-center m-80">
          <h3 class="ed-item cross-center m-40">Hash del patron:</h3>
          <h3  class="ed-item cross-center m-40">{{respuestaRK.valorHash}}</h3>
          <h3 class="ed-item cross-center m-40">Posicion:</h3>
          <h3 v-if="respuestaRK.posicion == -1" class="ed-item cross-center m-40">No Encontrado</h3>
          <h3 v-else class="ed-item cross-center m-40">{{respuestaRK.posicion}}</h3>
          <h3 class="ed-item cross-center m-40">Falsos Positivos:</h3>
          <h3  class="ed-item cross-center m-40">{{respuestaRK.falsoPositivo}}</h3>
          <!-- <h3 class="ed-item m-40">Posicion:</h3>
          <h3  class="ed-item m-40">{{posicion}}</h3> -->
        </div>
          
      </div>
      <div class="main-trabajo4__kmp ed-item s-100 m-50 main-center">
        <h2 class="ed-item main-center">KMP</h2>
        <div class="main-trabajo4__explicacion-hash ed-item m-80">
          <p>La tabla se usa para saber a que caracter salataremos, y se usará de esta forma: caracterEvaluar += caracter del patron evaluado - tabla[caracter del patron evaluado] </p>
          
        </div>
        <h3 class="ed-item cross-center m-40">Posicion:</h3>
          <h3 v-if=" respuestaKMP.posicion== -1" class="ed-item cross-center m-40">No Encontrado</h3>
          <h3 v-else class="ed-item cross-center m-40">{{respuestaKMP.posicion}}</h3>        
          <h3 class="ed-item cross-center m-40">Tabla:</h3>
          <h3  class="ed-item cross-center m-40">{{respuestaKMP.tabla}}</h3>
      </div>


  </div>
        
</template>


<script>
import vis from "../../../node_modules/vis/dist/vis.js"
import RK from "../../helpers/BuscaCadenas/RK"
import KMP from "../../helpers/BuscaCadenas/KMP"

let busquedaRK = new RK()
let busquedaKMP = new KMP()
export default {
  name: 'Trabajo4',
  data()
  {
    return {
      cadena:'',
      patron: '',
      hashElegido: '',
      respuestaRK: {},
      respuestaKMP: {}
      // hashPatron: 0,
      // posicion: 0
    }
  },
  methods:
  {
    actualizarOpcion(e)
    {
      this.hashElegido = e.target.selectedIndex
      if (this.hashElegido == 1) 
      {
        this.respuestaRK = busquedaRK.buscaHash1(this.cadena, this.patron)  
      }else{
        this.respuestaRK = busquedaRK.buscaHash2(this.cadena, this.patron)  
      }
    }
  },
  watch:
  {
    cadena: function(newCadena) 
    {
      this.respuestaKMP = busquedaKMP.busca(newCadena, this.patron)
      if (this.hashElegido == 0)
        return
      if (this.hashElegido == 1) 
      {
        this.respuestaRK = busquedaRK.buscaHash1(newCadena, this.patron)  
      }else{
        this.respuestaRK = busquedaRK.buscaHash2(newCadena, this.patron)  
      }

      
    },
    patron: function(newPatron) 
    {
      this.respuestaKMP = busquedaKMP.busca(this.cadena, newPatron)
      if (this.hashElegido == 0) 
        return
      if (this.hashElegido == 1) 
      {
        this.respuestaRK = busquedaRK.buscaHash1(this.cadena, newPatron)  
      }else{
        this.respuestaRK = busquedaRK.buscaHash2(this.cadena, newPatron)  
      }

    }
  }

  


}
</script>

