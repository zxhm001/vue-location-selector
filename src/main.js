import Vue from 'vue'
import App from './App.vue'
import LocationSelector from "./lib/index"

Vue.use(LocationSelector)

new Vue({
  el: '#app',
  render: h => h(App)
})
