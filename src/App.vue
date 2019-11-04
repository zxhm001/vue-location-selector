<template>
  <div id="app">
    <location-selector basemap="tianditu" v-model="location" amapKey="cd478721dd024af8b182361833236ea9"/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      location:{
        lng:0,
        lat:0,
        address:""
      }
    }
  },
  watch:{
    location:{
      handler:function(nv){
        console.warn('the curren position', nv)
      },
      deep:true
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
