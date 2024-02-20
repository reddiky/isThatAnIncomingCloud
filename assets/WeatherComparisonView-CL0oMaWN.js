import{g as x,u as M,_ as b,a as p,w as n,b as _,r,o as c,d as a,e as d,t as i,h as z,c as I,f as B,F as G,i as V}from"./index-CrEXYwK0.js";import{g as W}from"./index-CfRsfGzq.js";const $={0:{des:"Clear sky",icon:"day.svg"},1:{des:"Mainly clear",icon:"day.svg"},2:{des:"Partly cloudy",icon:"cloudy.svg"},3:{des:"Overcast",icon:"cloudy-day-1.svg"},45:{des:"Fog",icon:"cloudy-day-2.svg"},48:{des:"Depositing rime fog",icon:"cloudy-day-3.svg"},51:{des:"Light drizzle",icon:"rainy-1.svg"},53:{des:"Moderate drizzle",icon:"rainy-2.svg"},55:{des:"Intense drizzle",icon:"rainy-3.svg"},56:{des:"Light freezing drizzle",icon:"rainy-1.svg"},57:{des:"Intense freezing drizzle",icon:"rainy-3.svg"},61:{des:"Light rain",icon:"rainy-4.svg"},63:{des:"Moderate rain",icon:"rainy-5.svg"},65:{des:"Heavy rain",icon:"rainy-6.svg"},66:{des:"Light freezing rain",icon:"rainy-4.svg"},67:{des:"heavy freezing rain",icon:"rainy-6.svg"},71:{des:"Light snow",icon:"snowy-1.svg"},73:{des:"Moderate snow",icon:"snowy-2.svg"},75:{des:"Heavy snow",icon:"snowy-3.svg"},77:{des:"Snow grains",icon:"snowy-1.svg"},80:{des:"Light rain showers",icon:"rainy-5.svg"},81:{des:"Moderate rain showers",icon:"rainy-6.svg"},82:{des:"Violent rain showers",icon:"rainy-7.svg"},85:{des:"Light snow showers",icon:"snowy-4.svg"},86:{des:"Heavy snow showers",icon:"snowy-6.svg"},95:{des:"Light thunderstorms",icon:"thunder.svg"},96:{des:"Thunderstorms with hail",icon:"thunder.svg"},99:{des:"Severe thunderstorms with hail",icon:"thunder.svg"}},D=$,N={props:["weather","location"],data(){return{skipQuery:!1,dates:[],codes:D,expand:!1}},computed:{...x(M,["primaryLocation","secondaryLocation"])},methods:{iconImage(u){let g=D[`${u}`].icon;return`${new URL("@/assets/icons/",import.meta.url)}/${g}`}}},q=["name","src"],H={class:"d-flex"};function A(u,g,o,F,s,f){var C;const w=r("v-card-item"),h=r("v-col"),m=r("v-row"),L=r("v-card-text"),v=r("v-list-item-subtitle"),l=r("v-list-item"),y=r("v-list"),T=r("v-card");return(C=o.weather)!=null&&C.current?(c(),p(T,{key:0,class:"mx-auto displayWeather","min-width":"400"},{default:n(()=>[a(w,{title:`${o.location.name}, ${o.location.admin2}${o.location.admin1&&o.location.admin2?",":""} ${o.location.admin1}`},{subtitle:n(()=>{var t,e;return[d(i((e=(t=o.weather)==null?void 0:t.current)==null?void 0:e.weatherDescription),1)]}),_:1},8,["title"]),a(L,{class:"py-0"},{default:n(()=>[a(m,{align:"center","no-gutters":""},{default:n(()=>[a(h,{class:"text-h6",cols:"4"},{default:n(()=>{var t,e;return[d(i(Math.floor((e=(t=o.weather)==null?void 0:t.current)==null?void 0:e.temperature))+"°F ",1)]}),_:1}),a(h,{cols:"8",class:"text-right"},{default:n(()=>{var t,e,S,k;return[z("img",{class:"logo",name:(e=(t=o.weather)==null?void 0:t.current)==null?void 0:e.weatherDescription,src:f.iconImage((k=(S=o.weather)==null?void 0:S.current)==null?void 0:k.weatherCode)},null,8,q)]}),_:1})]),_:1})]),_:1}),z("div",H,[a(l,{class:"no-border",density:"compact"},{default:n(()=>[a(v,null,{default:n(()=>{var t,e;return[d("wind speed "+i(Math.floor((e=(t=o.weather)==null?void 0:t.current)==null?void 0:e.windSpeed))+" mph",1)]}),_:1})]),_:1}),a(l,{class:"no-border",density:"compact"},{default:n(()=>[a(v,null,{default:n(()=>{var t,e;return[d(i(Math.round(((e=(t=o.weather)==null?void 0:t.current)==null?void 0:e.precipitation)*100)/100)+" inches of precipitation",1)]}),_:1})]),_:1})]),a(y,{class:"bg-transparent"},{default:n(()=>{var t;return[(c(!0),I(G,null,B((t=o.weather)==null?void 0:t.forecast,e=>(c(),p(l,{key:e==null?void 0:e.time,title:new Date(parseInt(e==null?void 0:e.time)).toDateString(),subtitle:`${Math.floor(e==null?void 0:e.minTemp)}°F / ${Math.floor(e==null?void 0:e.maxTemp)}°F`,prependAvatar:f.iconImage(e==null?void 0:e.weatherCode)},{default:n(()=>[a(m,{align:"center","no-gutters":""},{default:n(()=>[d(i(e.weatherDescription)+" with a "+i(Math.floor(e==null?void 0:e.precipitationChance))+"% chance of "+i(Math.round((e==null?void 0:e.precipitationSum)*100)/100>0?`${Math.round((e==null?void 0:e.precipitationSum)*100)/100} inches of precipitation`:"precipitation"),1)]),_:2},1024)]),_:2},1032,["title","subtitle","prependAvatar"]))),128))]}),_:1})]),_:1})):_("",!0)}const O=b(N,[["render",A],["__scopeId","data-v-d6048f19"]]),j={components:{DisplayWeather:O},data(){return{comparison:null}},computed:{...x(M,["primaryLocation","secondaryLocation"]),...x(V,["temp","description"])},apollo:{comparison:{query:W`query comparison($loc1: GeoInput, $loc2: GeoInput, $survey: SurveyInput) {
          comparison(loc1: $loc1, loc2: $loc2, survey: $survey) {
            weather1 {
              current {
                time
                temperature
                precipitation
                rain
                showers
                snowfall
                weatherCode
                weatherDescription
                cloudCover
                windSpeed
                windGusts
              }
              forecast {
                time
                weatherCode
                weatherDescription
                maxTemp
                minTemp
                precipitationSum
                precipitationLength
                precipitationChance
                windSpeed
                windGusts
              }
            }
            weather2 {
              current {
                time
                temperature
                precipitation
                rain
                showers
                snowfall
                weatherCode
                weatherDescription
                cloudCover
                windSpeed
                windGusts
              }
              forecast {
                time
                weatherCode
                weatherDescription
                maxTemp
                minTemp
                precipitationSum
                precipitationLength
                precipitationChance
                windSpeed
                windGusts
              }
            }
            prediction
          }
        }`,variables(){return{loc1:{name:this.primaryLocation.name,lat:parseFloat(this.primaryLocation.latitude),long:parseFloat(this.primaryLocation.longitude)},loc2:{name:this.secondaryLocation.name,lat:parseFloat(this.secondaryLocation.latitude),long:parseFloat(this.secondaryLocation.longitude)},survey:{temp:Math.round(this.temp*100)/100,description:this.description}}}}}},E={class:"d-flex justify-space-between mb-6"};function P(u,g,o,F,s,f){var l,y;const w=r("v-skeleton-loader"),h=r("DisplayWeather"),m=r("v-card-title"),L=r("v-card-text"),v=r("v-card");return c(),I("div",E,[s.comparison===null?(c(),p(w,{key:0,class:"pa-2","min-width":"400",type:"card"})):_("",!0),s.comparison!==null?(c(),p(h,{key:1,class:"pa-2",weather:(l=s.comparison)==null?void 0:l.weather1,location:u.primaryLocation},null,8,["weather","location"])):_("",!0),a(v,{class:"bg-surface-variant","min-width":"300"},{default:n(()=>[a(m,null,{default:n(()=>[d(" Cloudy, your virtual travel assistant recommends ")]),_:1}),a(L,null,{default:n(()=>[d(i(s.comparison===null?"Outside looking at the weather, one moment please":s.comparison.prediction),1)]),_:1})]),_:1}),s.comparison===null?(c(),p(w,{key:2,type:"card",class:"pa-2","min-width":"400"})):_("",!0),s.comparison!==null?(c(),p(h,{key:3,weather:(y=s.comparison)==null?void 0:y.weather2,location:u.secondaryLocation},null,8,["weather","location"])):_("",!0)])}const U=b(j,[["render",P],["__scopeId","data-v-137f786f"]]);export{U as default};
