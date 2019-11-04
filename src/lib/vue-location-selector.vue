<template>
    <div id="d_map">
        <img class="corss-img" src="./images/cross.png">
        <span id="s_address">{{location.address}}</span>
    </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import "leaflet.chinatmsproviders";
import axios from "axios";
import {wgs2gcj,gcj2wgs} from "./transform"

export default {
    name: 'vue-location-selector',
    props:
    {
        //底图：天地图:tianditu，高德地图:amap
        basemap:{
            type:String,
            default:"tianditu" //amap
        },
        //初始地图中心经度
        initLng:{
            type:Number,
            default:121.5
        },
        //初始地图中心纬度
        initLat:{
            type:Number,
            default:29.3
        },
        //高德底图WEBAPIKEY，用于地理反编码
        amapKey:{
            type:String,
        },
        //位置
        location:{
            type:Object,
            default:()=>{
                return{
                    lng:0,
                    lat:0,
                    address:""
                };
            }
        }
    },
    model: {        
        prop: 'location',
        event: 'change'    
    },
    data(){
        return{
            map:null,
            
        }
    },
    mounted(){
        const vec_c_Layer = L.tileLayer.chinaProvider("TianDiTu.Normal.Map", {maxZoom: 18,minZoom: 0});
        const cva_c_layer = L.tileLayer.chinaProvider("TianDiTu.Normal.Annotion",{ maxZoom: 18, minZoom: 0 });
        const tianditu_layer = L.layerGroup([vec_c_Layer, cva_c_layer]);
        const amap_layer = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {maxZoom: 18,minZoom: 0});
        this.map = L.map("d_map", {
            crs: L.CRS.EPSG3857,
            center: [this.initLat, this.initLng],
            zoom: 10,
            layers: [this.basemap == "amap"?amap_layer:tianditu_layer],
        });
        this.map.on("moveend",this.onMapMoveEnd)
    },
    methods:{
        onMapMoveEnd(e){
            const center = this.map.getCenter();
            let gcjLat = center.lat;
            let gcjLng = center.lng;
            if (this.basemap == "tianditu") {
               let gcjLatLng = wgs2gcj(center.lat,center.lng);
               gcjLat = gcjLatLng.lat;
               gcjLng = gcjLatLng.lng;
            }
            let url = "https://restapi.amap.com/v3/geocode/regeo?location="+gcjLng+","+gcjLat+"&key=" + this.amapKey;
            axios.get(url).then(res=>{
                this.location.address = res.data.regeocode.formatted_address;
                console.log(res.data);
            });
            if(this.basemap == "tianditu")
            {
                let wgsLatLng = gcj2wgs(gcjLat,gcjLng);
                this.location.lng = wgsLatLng.lng;
                this.location.lat = wgsLatLng.lat;
            }
            else
            {
                this.location.lng = center.lng;
                this.location.lat = center.lat;
            }
        },

    }
}
</script>

<style scoped>
#d_map
{
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
}
#s_address
{
    position: absolute;
    bottom: 8px;
    left: 8px;
    font-size: 14px;
    z-index: 9998;
}
.corss-img
{
    position: absolute;
    top:calc(50vh - 24px);
    left: calc(50vw - 24px);
    height: 48px;
    width: 48px;
    z-index: 9999;
}
</style>