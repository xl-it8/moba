"use strict";(self["webpackChunkadmin"]=self["webpackChunkadmin"]||[]).push([[472],{7428:function(t,e,i){i.d(e,{Z:function(){return c}});i(7658);var l=function(){var t=this,e=t._self._c;return e("el-table",t._b({attrs:{data:t.tableData}},"el-table",t.$attrs,!1),[t._l(t.tableFields,(function(i,l){return e("el-table-column",t._b({key:l,attrs:{prop:i.prop,label:i.label},scopedSlots:t._u([i.isDefine?{key:"default",fn:function(t){return[e("img",{staticStyle:{width:"45px"},attrs:{src:t.row[i.prop],alt:""}})]}}:null],null,!0)},"el-table-column",i.props,!1))})),e("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.$router.push({path:t.editUrl,query:{id:i.row._id}})}}},[t._v("编辑")]),e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.remove(i.row._id)}}},[t._v("删除")])]}}])})],2)},r=[],a=i(7675),n={props:{tableData:{type:Array,default:()=>[]},editUrl:{type:String,default:null},tableFields:{type:Array,default:()=>[]}},components:{ISelect:a.Z},methods:{remove(t){this.$emit("remove",t)}}},s=n,o=i(1001),u=(0,o.Z)(s,l,r,!1,null,null,null),c=u.exports},3149:function(t,e,i){i.d(e,{Z:function(){return c}});i(7658);var l,r,a=i(588),n={data(){return{}},methods:{async onSubmit(t,e){this.id?(console.log(this.form),await(0,a.ht)(t,this.form),this.$mes()):(await(0,a.k4)(t,this.form),this.$mes()),this.$router.push({path:e})},async fetchId(t){return new Promise((async e=>{const i=await(0,a.qC)(t,this.id);this.form=i,e(i)}))},async findCategoryList(t,e=!0){const i=await(0,a.mY)(t,{isOnlyParent:e});if(this.tableData)this.tableData=i;else if(this.formFields)for(let l in this.formFields){const t=this.formFields[l];if(t.hasOwnProperty("options")&&!t.options){t.options=i;break}}},async remove(t,e){await(0,a.uu)(t,e),this.findCategoryList(this.listUrl,!1),this.$mes()}}},s=n,o=i(1001),u=(0,o.Z)(s,l,r,!1,null,null,null),c=u.exports},5472:function(t,e,i){i.r(e),i.d(e,{default:function(){return d}});var l=function(){var t=this,e=t._self._c;return e("div",{staticClass:"main-container"},[e("ITable",{staticStyle:{width:"100%"},attrs:{tableData:t.tableData,editUrl:"/article/create",tableFields:t.tableFields},on:{remove:function(e){return t.remove(e,"article/delete/")}}})],1)},r=[],a=i(7428),n=i(3149),s={data(){return{listUrl:"",tableData:[],tableFields:[{prop:"_id",label:"id",props:{width:"220"}},{prop:"title",label:"标题",props:{width:"220"}}]}},components:{ITable:a.Z},created(){this.listUrl="article/list",this.findCategoryList(this.listUrl,!1)},mixins:[n.Z],methods:{}},o=s,u=i(1001),c=(0,u.Z)(o,l,r,!1,null,null,null),d=c.exports}}]);
//# sourceMappingURL=472.959633d2.js.map