<template>
  <div class="ed-item ed-container main-center main-trabajo5">
      <div class="ed-item main-trabajo5__cifrar main-distribute cross-center">
        <h1 class="ed-item main-center ">RSA</h1>
        <h2 class="ed-item main-center ">Descifrar</h2>
        <div class="ed-item m-50">
          <label for="textoCifrar">Texto</label>
          <textarea 
          v-model="textoInput"
          class="main-trabajo5__inputs"
          placeholder=""
          rows="3"
          type="text" 
          id="textoInput"/>
        </div>
        <div class="ed-item m-50 cross-start">
          <label for="frase">Frase</label>
          <input 
          v-model="frase"
          class="main-trabajo5__inputs"
          placeholder=""
          type="text" 
          id="frase">
        </div>
        <div class="ed-item  cross-start">
          <label id="labelTexto" for="texto">{{TextoResultado}}</label>
          <textarea 
          class="main-trabajo5__inputs"
          v-model="textoOutput"
          placeholder=""
          type="text" 
          disabled
          rows="3"
          id="texto"/>
        </div>

        <div class="ed-item cross-start">
          <label for="clavePublica">Clave Publica</label>
          <textarea 
          class="main-trabajo5__inputs"
          v-model="clavePublica"
          placeholder=""
          type="text" 
          disabled
          rows="3"
          id="clavePublica"/>
        </div>
         <a 
          class="ed-item s-40  main-center button"
          @click="cifrar"
          >Cifrar</a>
         <a 
          class="ed-item s-40  main-center button"
          @click="descifrar"
          >Descifrar</a>

      </div>

      <div class="ed-item cross-start main-end">
        <!-- <label for="clavePublica">Integrantes</label> -->
        <ul>
          <li>Jahir Moncada</li>
          <li>Cristian Ycochea</li>
        </ul>

    </div>
      
      

  </div>
        
</template>


<script>
import RSA from "../../helpers/RSA/RSA";

export default {
  name: 'Trabajo5',
  data()
  {
    return {
      textoInput: '',
      textoOutput: '',
      frase: '',
      clavePublica: '',
      TextoResultado: 'Texto Cifrado'
    }
  },
  methods:
  {
    cifrar()
    {
      let rsa = new RSA(this.frase)
      this.clavePublica = rsa.clavePublica
      this.textoOutput = rsa.encriptarMensaje(this.textoInput)
      document.getElementById('labelTexto')
      this.TextoResultado = 'Texto Cifrado'
    },
    descifrar()
    {
      let rsa = new RSA(this.frase)
      let resultado = rsa.desencriptarMensaje(this.textoInput)
      this.TextoResultado = 'Texto Descifrado'
      this.clavePublica = rsa.clavePublica
      if(resultado)
      {
        this.textoOutput = resultado
      }else{
        this.textoOutput = 'Error al descifrar'

      }
    }
  }

}
</script>

