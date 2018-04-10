<template>
  <div class="ed-item ed-container main-center">
    <div class="ed-item m-60">
        <h2 class="input-text" >Hola, {{nombre}}</h2>
        <input v-model="nombre" type="text">
    </div>
    <hr class="separador">
</div>
</template>


<script>
export default {
  name: 'Trabajo1',
  data()
  {
      return {
          nombre: "Cris"
      }
  }
}
</script>

