<template>
  <div id="app" class="">
    <nav-bar/>
      <main class="ed-container">
        <transition name="component-fade" mode="out-in">
          <router-view/>
        </transition>
      </main>
  </div>
</template>

<script>
import Vue from "vue"
import VueRouter from "vue-router"
import  NavBar  from "./components/NavBar";
import  Informacion  from "./components/Informacion";
import  Trabajos  from "./components/Trabajos";

Vue.use(VueRouter)

const routes = [
  {path: '/trabajos', component: Trabajos},
  {path: '/informacion', component: Informacion}
]

const router = new VueRouter({
  routes
})

export default {
  name: 'app',
  router,
  components:
  {
    "nav-bar": NavBar,
    'info': Informacion,
    "trabajos": Trabajos
  }
}
</script>


<style lang="scss">
    @import "./scss/main";
  .component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
  }
    .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active for <2.1.8 */ {
      opacity: 0;
  }
</style>
