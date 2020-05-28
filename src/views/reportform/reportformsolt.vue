<template>
  <div id="app">
    <div id="nav">
      <reportForm />
    </div>
    <div class="view">
      <router-view/>
    </div>
  </div>
</template>
<script>
import reportForm from "../../components/report_form";
export default {
    components:{
      reportForm
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
