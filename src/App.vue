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
import { isNull } from "util";
import ColaPrioridad from "./helpers/ColaPrioridad/ColaPrioridad";
import MonticuloMax from "./helpers/ColaPrioridad/MonticuloMax";
import Cliente from "./helpers/ColaPrioridad/Cliente";

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
    {path: 'trabajo1', component: Trabajo1}
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
  //  let m = new MonticuloMax()
  //  m.añadir(1)
  //  m.añadir(4)
  //  m.añadir(2)
  //  m.añadir(3)
  //  m.añadir(5)
  //  m.añadir(6)
  //  m.sacar()
  //  m.sacar()
   let c = new ColaPrioridad()
   
   c.añadir(new Cliente(1,1))
   console.log(c.clientes);
   c.añadir(new Cliente(2,1))
   console.log(c.clientes);
   c.añadir(new Cliente(3,2))
   console.log(c.clientes);
   c.añadir(new Cliente(4,4))
   console.log(c.clientes);
   c.añadir(new Cliente(5,1))
   console.log(c.clientes);
   c.añadir(new Cliente(6,4))
   console.log(c.clientes);
  //  console.log('Se saco:' )
   c.sacar()
   console.log(c.clientes);
   c.sacar()
   console.log(c.clientes);
   c.sacar()
   console.log(c.clientes);
   c.sacar()
   console.log(c.clientes);
   c.sacar()
   console.log(c.clientes);
   c.sacar()
   console.log(c.clientes);
  //  c.sacar()
  //  console.log(c.clientes);
  //  c.sacar()
  //  console.log(c.clientes);
  //  c.sacar()
  //  console.log(c.clientes);
  //  c.sacar()
  //  console.log(c.clientes);
   

  //  c.sacar()
  //  console.log(c.datos);
  //  c.sacar()
  //  console.log(c.datos);
  //  c.sacar()
  //  console.log(c.datos);
  //  c.sacar()
  //  console.log(c.datos);
  //  c.sacar()
  //  console.log(c.datos);
  //  c.sacar()
  //  console.log(c.datos);
  //  c.sacar()
  //  console.log(c.datos);
  //  c.sacar()
  //  console.log(c.datos);
  //  c.sacar()
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
