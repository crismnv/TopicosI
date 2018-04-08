<template>
  <header class="main-header">
      <div class="ed-container">
        <div class="ed-item s-70 l-30 cross-center header-derecha">
            
            <h2 class="main-header__title ed-item "><i class="icon-curso"></i>Tópicos I</h2>
        </div>
        <div class="ed-item s-30 l-70 main-end cross-center header-izquierda">
            <div id="nav-toggle" class="nav-toggle">
             </div>
            <nav id="nav" class="main-nav ">
                <ul id="menu" class="main-menu ">
                    <li class="main-menu__item ">
                        <router-link  to="/trabajos" active-class="active" class="main-menu__link"><i class="icon-trabajos main-menu__icon"></i> Trabajos
                        </router-link>
                    </li>
                    <li class="main-menu__item ">
                        <router-link  to="/informacion" active-class="active" class="main-menu__link"><i class="icon-informacion main-menu__icon"></i> Información
                        </router-link>
                    </li>
                </ul>
            </nav>
        </div>
      </div>
  </header>
</template>

<script>

import edgrid from '../../node_modules/ed-grid/js/ed-grid'

edgrid.menu('nav', 'menu')

export default {
    name: "NavBar",
}
</script>

