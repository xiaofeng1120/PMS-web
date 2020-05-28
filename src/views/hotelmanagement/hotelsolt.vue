<template>
  <div id="app">
    <div id="nav">
      <hotelMenu />
    </div>
    <div class="view">
      <router-view/>
    </div>
  </div>
</template>
<script>
import hotelMenu from "../../components/hotel_menu";
export default {
    components:{
      hotelMenu
    },
    data() {
        return {

        };
    },
    created(){},
    mounted() {

    },
    methods: {

    }
};
</script>
<style lang="scss">
#app{
  width:100%;
  height:100%;
}
.view{
    width:100%;
    height: calc(100% - 60px);
    margin: 0px auto;
  }
#nav {

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
