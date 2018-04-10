<template>
  <header class="main-header">
      <div class="ed-container">
        <div class="ed-item s-1-3 cross-center header-derecha">
            
            <h2 class="main-header__title ed-item "><i class="icon-curso"></i>Tópicos I</h2>
        </div>
        <div class="ed-item s-1-3 l-1-3 main-header__autor main-center cross-start">
                <img class="" src="../static/img/logo-c3.png"   width="130"> 
        </div>
        <div class="ed-item  s-2-3 m-1-3 main-end cross-center header-izquierda">
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


export default {
    name: "NavBar",
}
</script>

