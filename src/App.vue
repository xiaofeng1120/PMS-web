<template>
  <div id="app">
    <div id="nav">
      <keep-alive>
          <Header />
      </keep-alive>
    </div>
    <div class="view">
      <router-view/>
    </div>
  </div>
</template>
<script>
import Header from './components/header'
import './assets/css/init.css'
export default {
    components:{
      Header
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
</style>
