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
import Trabajo0 from './components/trabajos/Trabajo0.vue';
import Trabajo1 from './components/trabajos/Trabajo1.vue';
import Trabajo2 from './components/trabajos/Trabajo2.vue';
import { isNull } from "util";
import ColaPrioridad from "./helpers/ColaPrioridad/ColaPrioridad";
import MonticuloMax from "./helpers/ColaPrioridad/MonticuloMax";
import Cliente from "./helpers/ColaPrioridad/Cliente";
import Banco from "./helpers/ColaPrioridad/Banco";

Vue.use(VueRouter)

function homeGuard(to,  from, next) 
{
    next('/trabajos')
}
const routes = [
  {path: '/', component: Informacion, beforeEnter: homeGuard},
  {path: '/informacion', component: Informacion},
  {path: '/trabajos', component: Trabajos, children: [
    {path: 'trabajo0', component: Trabajo0},
    {path: 'trabajo1', component: Trabajo1},
    {path: 'trabajo2', component: Trabajo2}
  ]}
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
//   ,
//  mounted()
//  {
  
//  }
}
</script>


<style lang="scss">
    @import "./scss/main";
  .component-fade-enter-active, .component-fade-leave-active 
  {
    transition: opacity .4s ease-in-out;
  }
  .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active for <2.1.8 */
  {
      opacity: 0;
  }
</style>
