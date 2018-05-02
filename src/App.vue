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
import Trabajo1 from './components/trabajos/Trabajo1.vue';
import Trabajo2 from './components/trabajos/Trabajo2.vue';
import ArbolRN from "./helpers/ArbolRN/ArbolRN";
import Nodo from "./helpers/ArbolRN/Nodo";
import { isNull } from "util";

Vue.use(VueRouter)

function homeGuard(to,  from, next) 
{
    next('/trabajos')
}
const routes = [
  {path: '/', component: Informacion, beforeEnter: homeGuard},
  {path: '/informacion', component: Informacion},
  {path: '/trabajos', component: Trabajos, children: [
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
  },
 
  mounted()
  {
    let a = new ArbolRN
    // for (let i = 0; i < 200; i++) {
    //   a.insertarNodo(i+1)
      
    // }
    // a.insertarNodo(5)
    // a.insertarNodo(3)
    // a.insertarNodo(6)
    // a.insertarNodo(7)
    // a.insertarNodo(2)
    // a.insertarNodo(4)
    // a.insertarNodo(1)

    // a.insertarNodo(10)
    // a.insertarNodo(9)
    // a.insertarNodo(5)
    // a.insertarNodo(4)
    // a.insertarNodo(6)
    // a.insertarNodo(7)
    // a.insertarNodo(12)
    // a.insertarNodo(11)
    // a.insertarNodo(13)


    a.insertarNodo(8)
    a.insertarNodo(90)
    a.insertarNodo(12)
    a.insertarNodo(60)
    a.insertarNodo(3)
    a.insertarNodo(23)


    console.log(a)
    console.log(a.preOrden())
    // a.vis()
    // console.log(a.visNodos)
  }
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
