import Vue from 'vue';
import VueLocationSelector from './vue-location-selector.vue';

const locationSelectorPlugin = {
    install(Vue, options){
        Vue.component('LocationSelector', VueLocationSelector)    
    }
}

export default locationSelectorPlugin;

