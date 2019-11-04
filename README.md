# vue-location-selector

> A Vue plugin to select location on map

## Usage

### 1. install

```shell
npm install git+https://git@git.ljnewmap.cn:CC/vue-location-selector.git --save
```

### 2. in main.js

```js
import locationSelector from 'vue-location-selector'
Vue.use(locationSelector)
```

### 3. in .vue

```html
<location-selector basemap="tianditu" @change="handleChange" amapKey="$amapKEY"/>
<script>
  export default {
    ...
    methods:{
      handleChange(position){
        console.log('position:', position)
      }
    }
    ...
  }
</script>
```

The location result will be returned by the variable "location" which you bind.The data structure look like beblow.

```js
{
  address: '浙江省宁波市宁海县茶院乡科技路',
  lat: 29.28025612868752,
  lng: 29.28025612868752
}
```

## Props

prop    |type   |value        |  descrption
:---|:---|:---|:---
basemap |String |tianditu,amap|the type of the base map
initLng |Number | - | the langitude of the center in the inited map
initLat |Number | - | the latitude of the center in the inited map
amapKey |String | - | 高德底图WEBAPIKEY，用于地理反编码，需要自行申请

## Events

event name  | event value             | description
change      |Object,{address,lat,lng} | the result of the choosen position

## Demo

![demo][1]

## Contributors

- zxh
- dicl

How to contribute?

Contact with the author "zxh" and the maintainer "dicl" to get the permission.

## Licence

MIT

[1]: ./example/images/demo.jpg "have a look of demo"