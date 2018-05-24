<template>
  <div class="informacion ed-item main-center">
    <div class="ed-item s-90 m-85 l-80  ed-container">
      <h1 class="informacion__title main-center ed-item">Información</h1>
      <div class="ed-item ed-container s-50 main-distribute informacion__personal">
        <h2 class="ed-item informacion__principal">NOMBRE:</h2>
        <h3 class="ed-item informacion__secundario">Cristian Ycochea</h3>
        <h2 class="ed-item informacion__principal">CÓDIGO:</h2>
        <h3 class="ed-item informacion__secundario">0201514001</h3>
      </div>

      <div class="ed-item ed-container s-50 main-distribute informacion__recursos">
        <h2 class="ed-item informacion__principal hecho-titulo">HECHO CON:</h2>
        <a href="https://vuejs.org/" target="_blank" class="informacion__link">VueJs</a>
        <a href="https://sass-lang.com/" target="_blank"  class="informacion__link">Sass</a>
        <a href="http://ed-grid.com/" target="_blank"  class="informacion__link">EDgrid</a>
        <a href="http://app.fontastic.me/" target="_blank"  class="informacion__link">Fontastic</a>
        <a href="http://visjs.org/" target="_blank"  class="informacion__link">Vis</a>
      </div>
      <hr class="separador">

      <div class="ed-item s-100 main-center informacion__codigo">
        
        <a href="https://github.com/crismnv/TopicosI" target="_blank" class="informacion__repositorio"><i class="icon-git"></i> Repositorio</a>
      </div>
  
    </div>
  </div>

</template>

<script>
export default {
  name: "informacion"
}
</script>
