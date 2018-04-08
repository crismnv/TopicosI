<template>
    <!-- vista provisional -->
    <div class="trabajos ed-item">
        <div class="ed-item ed-container main-center">
            <div class="ed-item m-60">
                <h2 class="input-text" >Hola, {{nombre}}</h2>
                <input v-model="nombre" type="text">
            </div>
            <hr class="separador">
            <h2 class="ed-item m-60 provisional">Esta es una vista provisional</h2>
        </div>
    </div>
</template>

<script>
export default {
  name: "Trabajos",
  data()
  {
      return {
          nombre: "Cris"
      }
  }
}
</script>

<style>
.input-text,
.provisional
{
    text-align: center;
}
</style>


