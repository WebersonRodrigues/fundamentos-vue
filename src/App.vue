<template>
  <div id="app">
    <Menu v-if="this.$router.currentRoute.name != 'Login'"></Menu>
    <router-view/>
  </div>
</template>
<script>

import Menu from "@/components/menu/Menu.vue";

export default {
  components:{
    Menu
  }
}
</script>

<style>

  @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

  :root{
    --cor-primaria: #FF3D00;
    --cor-secundaria: #FF6E40;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Quicksand', sans-serif;
  }

  .titulo {
    font-weight: 600;
    color: #363636;
    font-size: 25px;
    margin-top: 10px;
  }
  /* Override */
  .btn-primary,
  .btn-primary:active
  .btn-primary:focus,
  .btn-primary:focus-visible,
  .btn-primary:visited,
  .btn-primary:not(:disabled):not(.disabled):active{
    color: #fff;
    background-color: var(--cor-primaria);
    border: var(--cor-primaria);
    outline: none;
    box-shadow: none;
    min-width: 90px;
  }

  .btn-primary:hover{
    color: #fff;
    background-color: var(--cor-secundaria);
    border-color: var(--cor-secundaria);
  }

</style>
