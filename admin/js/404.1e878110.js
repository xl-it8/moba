"use strict";(self["webpackChunkadmin"]=self["webpackChunkadmin"]||[]).push([[404],{3149:function(t,i,s){s.d(i,{Z:function(){return m}});s(7658);var e,a,n=s(588),o={data(){return{}},methods:{async onSubmit(t,i){this.id?(console.log(this.form),await(0,n.ht)(t,this.form),this.$mes()):(await(0,n.k4)(t,this.form),this.$mes()),this.$router.push({path:i})},async fetchId(t){return new Promise((async i=>{const s=await(0,n.qC)(t,this.id);this.form=s,i(s)}))},async findCategoryList(t,i=!0){const s=await(0,n.mY)(t,{isOnlyParent:i});if(this.tableData)this.tableData=s;else if(this.formFields)for(let e in this.formFields){const t=this.formFields[e];if(t.hasOwnProperty("options")&&!t.options){t.options=s;break}}},async remove(t,i){await(0,n.uu)(t,i),this.findCategoryList(this.listUrl,!1),this.$mes()}}},r=o,l=s(1001),h=(0,l.Z)(r,e,a,!1,null,null,null),m=h.exports},1507:function(t,i,s){s.r(i),s.d(i,{default:function(){return c}});var e=function(){var t=this,i=t._self._c;return i("div",{staticClass:"main-container"},[i("h3",[t._v(t._s(t.id?"编辑":"新建")+"分类")]),i("IForm",{attrs:{formFields:t.formFields,form:t.form},on:{onSubmit:t.submit}})],1)},a=[],n=s(5256),o=s(3149),r={props:["id"],data(){return{form:{name:"",parent:void 0},formFields:[{type:"select",label:"父级分类",value:"parent",attrs:{placeholder:"请选择"},options:""},{type:"input",label:"分类名称",value:"name",attrs:{placeholder:"请输入内容"}}]}},components:{IForm:n.Z},mixins:[o.Z],created(){this.id&&this.fetchId("category/list/"),this.findCategoryList("category/list")},methods:{submit(){const t=this.id?"category/edit":"category/create";this.onSubmit(t,"/categories/list")}}},l=r,h=s(1001),m=(0,h.Z)(l,e,a,!1,null,null,null),c=m.exports}}]);
//# sourceMappingURL=404.1e878110.js.map