/*! kcharts - v1.3 - 2014-07-29 5:28:13 PM
* Copyright (c) 2014 伯才; Licensed  */
KISSY.add("gallery/kcharts/1.3/datetime/theme",function(){var t="{COLOR}",e={"ks-chart-default":{lineType:"arc",anim:!1,title:{content:"",css:{"text-align":"center","font-size":"16px","font-weight":"bold",color:"#666"},isShow:!0},subTitle:{content:"",css:{"text-align":"center","font-size":"12px",color:"#666"},isShow:!0},line:{attr:{"stroke-width":1},hoverAttr:{"stroke-width":1}},points:{isShow:!1,attr:{type:"circle",stroke:"#fff",r:0,"stroke-width":1.5,fill:t},hoverAttr:{type:"circle",stroke:"#fff",r:5,fill:t,"stroke-width":0}},xGrids:{isShow:!1,css:{color:"#eee"}},yGrids:{css:{color:"#eee"}},yAxis:{isShow:!1,css:{color:"#000"}},xAxis:{css:{color:"#000"}},xLabels:{css:{color:"#666","font-size":"12px"}},yLabels:{css:{color:"#666","font-size":"12px",marginLeft:-10}},pointLine:{css:{color:"#aaa"}},tip:{css:{border:"1px solid {COLOR}"},alignX:"right",css:{"border-color":"{COLOR}"},offset:{y:-10,x:-10}}}};return e}),KISSY.add("gallery/kcharts/1.3/datetime/cfg",function(){var t="ks-chart-",e=t+"default",r="{COLOR}";return{themeCls:e,autoRender:!0,comparable:!1,lineType:"straight",colors:[],title:{content:"",css:{"text-align":"center","font-size":"16px"},isShow:!0},subTitle:{content:"",css:{"text-align":"center","font-size":"12px"},isShow:!0},points:{isShow:!1,attr:{type:"circle",stroke:"#fff",r:0,"stroke-width":1.5,fill:r},hoverAttr:{type:"circle",stroke:"#fff",r:3,fill:r,"stroke-width":1}},xLabels:{isShow:!0,css:{color:"#666","font-size":"12px","white-space":"nowrap",position:"absolute"}},yLabels:{isShow:!0,css:{color:"#666","font-size":"12px","white-space":"nowrap",position:"absolute"}},xAxis:{isShow:!0,css:{zIndex:10}},yAxis:{isShow:!0,css:{zIndex:10},num:5},xGrids:{isShow:!1,css:{}},yGrids:{isShow:!0,css:{}},areas:{isShow:!0,attr:{fill:"90-#fff-"+r,"stroke-width":0,opacity:.5}},line:{isShow:!0,attr:{"stroke-width":"3px"},hoverAttr:{"stroke-width":"4px"}},pointLine:{isShow:!1,css:{}},legend:{isShow:!1},tip:{isShow:!0,clsName:"",template:"",css:{},offset:{x:0,y:0},boundryDetect:!0}}}),KISSY.add("gallery/kcharts/1.3/datetime/index",function(t,e,r,a,i,n,s,o,c,l,d,f,h,u,p,x,g,y){t.all;var _,m={init:function(){var e=this;e.chartType="datetime";var r=t.clone(y);e._cfg=t.mix(r,e.userConfig,void 0,void 0,!0),c.prototype.init.call(e,e._cfg),e._cfg.autoRender&&e.render()}};return i.extend?_=s.extend(m):(_=function(t){var e=this;e.userConfig=t,e.init()},t.extend(_,s,m)),_},{requires:["dom","event","node","base","gallery/template/1.0/index","gallery/kcharts/1.3/linechart/index","gallery/kcharts/1.3/raphael/index","gallery/kcharts/1.3/basechart/index","gallery/kcharts/1.3/tools/color/index","gallery/kcharts/1.3/tools/htmlpaper/index","gallery/kcharts/1.3/legend/index","./theme","gallery/kcharts/1.3/tools/touch/index","gallery/kcharts/1.3/tip/index","gallery/kcharts/1.3/animate/index","gallery/kcharts/1.3/tools/graphtool/index","./cfg"]});