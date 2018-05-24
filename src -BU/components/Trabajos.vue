<template>

    <!-- vista provisional -->
    <div class="trabajos ed-item ed-container main-center cross-center">
        <div class="ed-item ed-container indice-trabajos s-50 l-40">
            
            <router-link to="/trabajos/trabajo0" active-class="indice-trabajos__link--active" class="indice-trabajos__link ed-item m-50">Trabajo 0</router-link>
            <router-link to="/trabajos/trabajo1" active-class="indice-trabajos__link--active" class="indice-trabajos__link ed-item m-50">Trabajo 1</router-link>      
            <router-link to="/trabajos/trabajo2" active-class="indice-trabajos__link--active" class="indice-trabajos__link ed-item m-50">Trabajo 2</router-link>      
            <router-link to="/trabajos/trabajo3" active-class="indice-trabajos__link--active" class="indice-trabajos__link ed-item m-50">Trabajo 3</router-link>      
        </div>
        <transition name="component-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
  name: "Trabajos"
}
</script>

<style>
.input-text,
.provisional
{
    text-align: center;
}
</style>


