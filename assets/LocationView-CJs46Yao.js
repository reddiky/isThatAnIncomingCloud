import{m as B,u as b,_ as k,c as y,a as _,w as e,b as v,r as l,o as r,d as t,e as c,F as W,f as P,t as s,g as R}from"./index-BNtQsibn.js";import{g as T}from"./index-Nwv4m2Pn.js";const j={props:["num"],data(){return{skipQuery:!0,valid:!1,locationName:"",location:{},locations:[],lat:null,long:null,displayLocation:!1,locationNameRules:[a=>a?!0:"location is required.",a=>(a==null?void 0:a.length)<=15?!0:"location must be less than 15 characters."]}},apollo:{locations:{query:T`query location($name: String, $lat: Float, $long: Float) {
          location(name: $name, lat: $lat, long: $long) {
            name
            admin1
            admin2
            latitude
            longitude
          }
        }`,variables(){return{name:this.locationName,lat:this.lat,long:this.long}},update(a){return this.skipQuery=!0,a.location},skip(){return this.skipQuery}}},methods:{...B(b,["defineLocation"]),submitLocation(){this.skipQuery=!1},submitFinalLocation(a){this.defineLocation(a,this.num),this.location=a,this.locations=[],this.displayLocation=!0}}};function z(a,i,h,V,o,d){const u=l("v-card-title"),m=l("v-text-field"),p=l("v-col"),x=l("v-row"),C=l("v-container"),w=l("v-form"),N=l("v-card-text"),L=l("v-btn"),g=l("v-card-actions"),f=l("v-card"),q=l("v-list-subheader"),Q=l("v-list-item"),F=l("v-list"),S=l("v-card-subtitle");return r(),y("div",null,[o.displayLocation===!1&&o.locations.length===0?(r(),_(f,{key:0,class:"mx-auto",width:"512"},{default:e(()=>[t(u,null,{default:e(()=>[c("Please submit your location")]),_:1}),t(N,null,{default:e(()=>[t(w,{modelValue:o.valid,"onUpdate:modelValue":i[3]||(i[3]=n=>o.valid=n),class:"location"},{default:e(()=>[t(C,null,{default:e(()=>[t(x,null,{default:e(()=>[t(p,{cols:"12",md:"4"},{default:e(()=>[t(m,{modelValue:o.locationName,"onUpdate:modelValue":i[0]||(i[0]=n=>o.locationName=n),rules:o.locationNameRules,counter:15,label:"Zip or County",required:"","hide-details":""},null,8,["modelValue","rules"])]),_:1}),t(p,{cols:"12",md:"4"},{default:e(()=>[t(m,{modelValue:o.lat,"onUpdate:modelValue":i[1]||(i[1]=n=>o.lat=n),label:"Latitude","hide-details":"",required:""},null,8,["modelValue"])]),_:1}),t(p,{cols:"12",md:"4"},{default:e(()=>[t(m,{modelValue:o.long,"onUpdate:modelValue":i[2]||(i[2]=n=>o.long=n),label:"Longitude","hide-details":"",required:""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}),t(g,null,{default:e(()=>[t(L,{color:"blue",onClick:d.submitLocation},{default:e(()=>[c(" Submit ")]),_:1},8,["onClick"])]),_:1})]),_:1})):v("",!0),o.locations.length>0&&o.displayLocation===!1?(r(),_(f,{key:1,class:"mx-auto",width:"512"},{default:e(()=>[t(F,null,{default:e(()=>[t(q,null,{default:e(()=>[c("Please select your specific location")]),_:1}),(r(!0),y(W,null,P(o.locations,(n,U)=>(r(),_(Q,{key:U,value:n,color:"primary",rounded:"xl",onClick:Z=>d.submitFinalLocation(n)},{default:e(()=>[c(s(n.name)+", "+s(n.admin2)+s(n.admin1&&n.admin2?",":"")+" "+s(n.admin1),1)]),_:2},1032,["value","onClick"]))),128))]),_:1})]),_:1})):v("",!0),o.displayLocation?(r(),_(f,{key:2,class:"mx-auto",width:"512"},{default:e(()=>[t(u,null,{default:e(()=>[c(" Location "+s(h.num),1)]),_:1}),t(S,null,{default:e(()=>[c(s(o.location.name)+", "+s(o.location.admin2)+s(o.location.admin1&&o.location.admin2?",":"")+" "+s(o.location.admin1),1)]),_:1}),t(g,null,{default:e(()=>[t(L,{variant:"text",color:"red",onClick:i[4]||(i[4]=n=>o.displayLocation=!1)},{default:e(()=>[c(" Change Location ")]),_:1})]),_:1})]),_:1})):v("",!0)])}const A=k(j,[["render",z],["__scopeId","data-v-91707eda"]]),D={components:{LocationQuery:A},props:["num"],data(){return{advanceToWeather:!1}},computed:{...R(b,["primaryLocation","secondaryLocation"])},methods:{compareWeather(){this.$router.push("/weather")}}},E={class:"home d-flex align-center justify-center"};function I(a,i,h,V,o,d){const u=l("LocationQuery"),m=l("v-btn");return r(),y("div",E,[t(u,{num:"1",class:"pa-2 ma-2"}),t(u,{num:"2",class:"pa-2 ma-2"}),t(m,{class:"ma-4 pa-4",color:"primary",size:"x-large",onClick:d.compareWeather,active:a.primaryLocation!=null&&a.secondaryLocation!=null},{default:e(()=>[c(" Compare Locations ")]),_:1},8,["onClick","active"])])}const J=k(D,[["render",I]]);export{J as default};