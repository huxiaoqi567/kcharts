/*! kcharts - v1.3 - 2014-07-29 5:28:13 PM
* Copyright (c) 2014 伯才; Licensed  */
KISSY.add("gallery/kcharts/1.3/basechart/common",function(t,e){function r(e,r){if(e._cfg.title.isShow){var a=e.htmlPaper,n=r+"-title",i=e._cfg,o=e.getInnerContainer(),s=.6*o.y;e._title=a.rect(o.x,0,o.width,s).addClass(n).css(t.mix({"line-height":s+"px"},i.title.css)).html(i.title.content)}}function a(e,r){if(e._cfg.subTitle.isShow){var a=e.htmlPaper,n=r+"-subtitle",i=e._cfg,o=e.getInnerContainer(),s=.4*o.y;e._subTitle=a.rect(o.x,.6*o.y,o.width,s).addClass(n).css(t.mix({"line-height":s+"px"},i.subTitle.css)).html(i.subTitle.content)}}function n(t){if(t._cfg.xAxis.isShow){var e=t.getInnerContainer(),r=e.bl,a=e.width,n=t.htmlPaper,i=t._cfg.themeCls+"-axisx";return t._axisX=n.lineX(r.x,r.y,a).addClass(i).css(t._cfg.xAxis.css||{}),t._axisX}}function i(t){if(t._cfg.yAxis.isShow){var e=t.getInnerContainer(),r=e.tl,a=e.height,n=t.htmlPaper,i=t._cfg.themeCls+"-axisy";return t._axisY=n.lineY(r.x,r.y,a).addClass(i).css(t._cfg.yAxis.css||{}),t._axisY}}function o(t){if(t._cfg.yGrids.isShow){var e=t.getInnerContainer(),r=e.x,a=t._pointsY;t._cfg.yGrids.template;for(var n=0,i=a.length;i>n;n++)t._gridsY[n]={0:l(t,{x:r,y:a[n].y,index:n}),x:r,y:a[n].y,num:a[n].number}}}function s(t){if(t._cfg.xGrids.isShow){var e,r=t._points[0],a=t.getInnerContainer();if(t._gridsX=[],"x"==t._cfg.zoomType){e=function(){var t=r.length,e=[];if(t>1){var a=(r[1].x-r[0].x)/2;e.push({x:r[0].x-a});for(var n in r)e.push({x:r[n].x- -a})}return e}();for(var n=0,i=e.length;i>n;n++)t._gridsX[n]={0:c(t,{index:n,x:e[n].x}),x:e[n].x,y:a.bl.y,index:n,num:t.coordNum[n]}}else for(var n in t._pointsX)t._gridsX[n]={index:n,0:c(t,{index:n,x:t._pointsX[n].x}),x:t._pointsX[n].x,y:a.bl.y,num:t.coordNumX[n]};return t._gridsX}}function c(r,a,n){if(r._cfg.xGrids.isShow){var i=r.getInnerContainer(),n=n||r._cfg.xGrids.css,o=r.htmlPaper,s=r._cfg.themeCls+"-gridsx",c=r._cfg.xGrids.template,l={index:a.index,paper:o,x:a.x,y:i.tl.y,height:i.height,css:n,className:s,chart:r};return c?t.isFunction(c)?c(l):e(c).render({data:l}):o.lineY(a.x,i.tl.y,i.height).addClass(s).css(n)}}function l(r,a,n){if(r._cfg.yGrids.isShow){var i=r.getInnerContainer(),n=n||r._cfg.yGrids.css,o=r.htmlPaper,s=r._cfg.themeCls+"-gridsy",c=r._cfg.yGrids.template,l={index:a.index,paper:o,x:i.x,y:a.y,width:i.width,css:n,className:s,chart:r};return c?t.isFunction(c)?c(l):e(c).render({data:l}):o.lineX(i.x,a.y,i.width).addClass(s).css(n)}}function f(t){if(t._cfg.yLabels.isShow){var e=t.getInnerContainer();for(var r in t._pointsY)t._labelY[r]={0:p(t,r,t._pointsY[r].number),num:t._pointsY[r].number,x:e.x,y:t._pointsY[r].y};return t._labelY}}function d(t){if(t._cfg.xLabels.isShow)for(var e in t._pointsX)t._labelX[e]={0:u(t,e,t._pointsX[e].number),num:t._pointsX[e].number,x:t._pointsX[e].x,y:t._pointsX[e].y}}function u(r,a,n){if(r._cfg.xLabels.isShow){var i,o=r.htmlPaper,s=r._pointsX.length||0,c=r._cfg.themeCls+"-xlabels",l="{{data}}",f="";return s>a?(l=r._cfg.xLabels.template||l,f=t.isFunction(l)?l(a,n):e(l).render({data:n}),f&&(i=o.text(r._pointsX[a].x,r._pointsX[a].y,"<span class="+c+">"+f+"</span>","center"),i.children().css(r._cfg.xLabels.css)),i):void 0}}function p(r,a,n){if(r._cfg.yLabels.isShow&&n){var i,o=r.htmlPaper,s=r._cfg.themeCls+"-ylabels",c="{{data}}",l="";return c=r._cfg.yLabels.template||c,l=t.isFunction(c)?c(a,n):e(c).render({data:n}),l&&(i=o.text(r._pointsY[a].x,r._pointsY[a].y,"<span class="+s+">"+l+"</span>","right","middle"),i.children().css(r._cfg.yLabels.css)),i}}function h(t){function e(e,r,a,n,i){for(var o="_grids"+e,d="_label"+e,h=Math.max.apply(null,[t[d].length,t[o].length]),x=function(){t[o]=[],t[d]=[];for(var e in r)t[o][e]={0:r[e].grid,y:a[e].y,x:a[e].x,num:r[e].num},t[d][e]={0:r[e].lbl,y:a[e].y,x:a[e].x,num:r[e].num};for(var e in n)n[e].remove()},g=0;h>g;g++)(function(c){var l=t[d][c]?t[d][c].num:t[o][c].num,u=v(l,a,i);if(u&&void 0!==u.x&&void 0!==u.y){var p="Y"==e?{top:u.y+"px"}:{left:u.x+"px"};r.push({num:l,lbl:t[d][c]&&t[d][c][0]&&t[d][c][0].stop().animate(p,s,f),grid:t[o][c]&&t[o][c][0]&&t[o][c][0].stop().animate(p,s,f)})}else{var p="Y"==e?{top:t[d][c]&&b(t[d][c]).y+"px",opacity:0}:{left:t[d][c]&&b(t[d][c]).x+"px",opacity:0};t[d][c]&&t[d][c][0]&&n.push(t[d][c][0].stop().animate(p,s,f)),t[o][c]&&t[o][c][0]&&n.push(t[o][c][0].stop().animate(p,s,f))}})(g);for(var g in a)if(!_(a[g].number,i)){var y="Y"==e?b(a[g]).y+"px":b(a[g]).x+"px",m="Y"==e?{top:y,opacity:0}:{left:y,opacity:0},w="Y"==e?{top:a[g].y,opacity:1}:{left:a[g].x,opacity:1};if("Y"==e){var C=p(t,g,a[g].number),A=l(t,b(a[g]).y);r.push({num:a[g].number,lbl:C&&C.css(m).stop().animate(w,s,f),grid:A&&A.css(m).stop().animate(w,s,f)})}else{var C=u(t,g,a[g].number),A=c(t,b(a[g]).x);r.push({num:a[g].number,lbl:C&&C.css(m).stop().animate(w,s,f),grid:A&&A.css(m).stop().animate(w,s,f)})}}Array.prototype.sort.call(r,function(t,e){return t.num-e.num}),x()}var r=t._cfg,a=r.zoomType,n=t._pointsY,i=t._pointsX,o=t.getInnerContainer(),s=.5,f="easeout",d=[],h=[],x=[],g=[],y=[],m=[],v=function(t,e,r){for(var a in e)if(t===e[a].number)return r.push(t),e[a]},b=function(t){if(t){var e=Math.min.apply(null,[r.canvasAttr.x,r.canvasAttr.y])/2,n=o.y+o.height/2,i=o.x+o.width/2;switch(a){case"x":return{y:t.y>n?o.bl.y+e:o.y-e,x:t.x};case"y":return{x:t.x>i?o.br.x+e:o.x-e,y:t.y};case"xy":return{y:t.y>n?o.bl.y+e:o.y-e,x:t.x>i?o.br.x+e:o.x-e}}}};switch(a){case"x":e("Y",y,n,x,d);break;case"y":e("X",m,i,g,h);break;case"xy":e("X",m,i,g,h),e("Y",y,n,x,d)}}function x(t){var e=0;for(var r in t)t[r].x&&t[r].y&&e++;return e}function g(t,e){var r="",a=(t._innerContainer.bl.y,x(e)),n=0;if(!e)return"";if(n=function(){for(var r in e)if(!t.isEmptyPoint(e[r]))return Math.round(r)}(),r+="M"+e[n].x+","+e[n].y,"arc"==t._cfg.lineType&&a>2){r+=" R";for(var i=n+1,a=e.length;a>i;i++)e[i].x&&e[i].y&&(r+=e[i].x+","+e[i].y+" ")}else for(var i=n+1,a=e.length;a>i;i++)e[i].x&&e[i].y&&(r+=" L"+e[i].x+","+e[i].y);return r}function _(t,e){for(var r in e)if(e[r]===t)return!0;return!1}return{drawTitle:r,drawSubTitle:a,drawAxisX:n,drawAxisY:i,drawGridsX:s,drawGridX:c,drawGridY:l,drawGridsY:o,drawLabelsX:d,drawLabelsY:f,drawLabelX:u,drawLabelY:p,getRealPointsNum:x,animateGridsAndLabels:h,getLinePath:g,isInArray:_}},{requires:["gallery/template/1.0/index"]}),KISSY.add("gallery/kcharts/1.3/basechart/index",function(t,e,r,a){var n,i=t.all,o={init:function(e){e||(e=this.userConfig);var r=this,a=r._cfg;if(e&&e.renderTo){if(!r.__isInited){a=r._cfg=t.mix({autoRender:!0,zIndex:0,yAxis:{spacing:{top:0,bottom:0}},xAxis:{spacing:{left:0,right:0}},canvasAttr:{x:60,y:60},zoomType:"x"},e,void 0,void 0,!0),r._$ctnNode=i(e.renderTo),r._$ctnNode.css({position:"relative","-webkit-text-size-adjust":"none","-webkit-tap-highlight-color":"rgba(0,0,0,0)"}),r.createContainer(),t.mix(r,{_datas:{cur:{},total:{}},_points:{},_centerPoints:[],_pointsX:[],_pointsY:[],_gridsX:[],_gridsY:[],_areas:[],_axisX:null,_axisY:null,_labelX:[],_labelY:[],_evtEls:[],_gridPoints:[],stackable:!1});for(var n in Array.prototype)delete Array.prototype[n]}"barchart"==r.chartType&&(a.xAxis.min=0,a.yAxis.min=0),r.__setData(),r.__isInited=1}},__setData:function(){var t=this,e=t._cfg.series;if(e&&!(0>=e.length)&&e[0].data)for(var r in e)t._datas.total[r]={index:r,data:e[r].data},t._datas.cur[r]={index:r,data:e[r].data}},dataFormat:function(){var t,e,r,a,n,i,o,s=this,c=s._cfg,l=c.zoomType,f=s._innerContainer,d=c.xAxis.spacing?s.px2num(c.xAxis.spacing.left):0,u=c.xAxis.spacing?s.px2num(c.xAxis.spacing.right):0,p=c.yAxis.spacing?s.px2num(c.yAxis.spacing.top):0,h=c.yAxis.spacing?s.px2num(c.yAxis.spacing.bottom):0,x=f.width-d-u,g=f.height-p-h,_=f.x/1+d,y=f.y/1+p;switch(s._pointsY=[],s._pointsX=[],l){case"x":t=s.getAllDatas(),o=r=s.coordNum=s._getScales(t,c.yAxis),n=s.data2GrapicData(r,!1,!0);break;case"y":e=s.getAllDatas(),o=a=s.coordNumX=s._getScales(e,c.xAxis),i=s.data2GrapicData(a,!0,!1);break;case"xy":t=s.getAllDatas(0),e=s.getAllDatas(1),o=r=s.coordNum=s._getScales(t,c.xAxis),a=s.coordNumX=s._getScales(e,c.yAxis),n=s.data2GrapicData(r,!1,!1),i=s.data2GrapicData(a,!0,!0)}var m=function(t,e,r){var a=c.series[e],n=Math.max.apply(null,r),i=Math.min.apply(null,r),o=[];switch(s.getDataType(),l){case"x":for(var f in s._pointsX)o[f]=""===t[f]||null===t[f]?{x:s._pointsX[f].x,index:Math.round(f)}:{x:s._pointsX[f].x,y:s.data2Grapic(t[f],n,i,g,y,!0),dataInfo:{y:t[f],x:c.xAxis.text[f]},index:Math.round(f)};break;case"y":for(var f in s._pointsY)o[f]={x:s.data2Grapic(t[f],n,i,x,_),y:s._pointsY[f].y,dataInfo:{y:t[f],x:c.yAxis.text[f]},index:Math.round(f)};break;case"xy":var d=s.data2GrapicData(s.getArrayByKey(a.data,0)),u=s.data2GrapicData(s.getArrayByKey(a.data,1),!0,!0);for(var f in a.data)o[f]={x:d[f],y:u[f],dataInfo:{y:t[f]},index:Math.round(f)}}return o};switch(l){case"x":for(var v in n)s._pointsY[v]={number:r[v]+"",y:n[v],x:_};try{s._gridPoints=s.getSplitPoints(_,y+g,_+x,y+g,c.xAxis.text.length,!0),s._pointsX=s.getCenterPoints(s._gridPoints);for(var v in c.xAxis.text)s._pointsX[v].number=c.xAxis.text[v]}catch(b){throw Error("未配置正确的xAxis.text数组")}break;case"y":for(var v in i)s._pointsX[v]={number:a[v]+"",y:y+g,x:i[v]};try{s._pointsY=s.getSplitPoints(_,y,_,y+g,c.yAxis.text.length+1);for(var v in c.yAxis.text)s._pointsY[v].number=c.yAxis.text[v]}catch(b){throw Error("未配置正确的yAxis.text数组")}break;case"xy":for(var v in i)s._pointsY[v]={number:a[v]+"",y:i[v],x:_};for(var v in n)s._pointsX[v]={number:r[v]+"",y:y+g,x:n[v]}}for(var v in s._datas.cur)s._points[v]=m(s._datas.cur[v].data,v,o)},removeData:function(t){var e=this;delete e._datas.cur[t],e.dataFormat()},recoveryData:function(t){var e=this;e._datas.cur[t]=e._datas.total[t],e.dataFormat()},createContainer:function(){var t=this,e=t._$ctnNode,r=t._cfg.canvasAttr,a=r.width||e.width()-2*r.x,n=r.height||e.height()-2*r.y,i=r.x,o=r.y,s=a,c=n,l={x:i,y:o},f={x:i+a,y:o},d={x:i,y:o+c},u={x:i+a,y:o+c};t._innerContainer={x:i,y:o,width:s,height:c,tl:l,tr:f,bl:d,br:u}},getInnerContainer:function(){return this._innerContainer},getAllDatas:function(){var e,r=this,a=r._cfg,n=[],i=a.zoomType,o=arguments[0];if(r.getDataType(),a.stackable)for(var s in r._datas.cur){t.isArray(r._datas.cur[s].data)&&(e=r._datas.cur[s].data);for(var c in e)n[c]=n[c]?e[c]-0+(n[c]-0):e[c]}else for(var s in r._datas.cur)t.isArray(r._datas.cur[s].data)&&(e="xy"==i?r.getArrayByKey(r._datas.cur[s].data,o):r._datas.cur[s].data),n.push(e.join(","));return n.length?n.join(",").split(","):[]},getDataType:function(){var e=this;if(e._datas.total[0]&&e._datas.total[0].data)for(var r in e._datas.total[0].data){if(t.isPlainObject(e._datas.total[0].data[r]))return"object";if(t.isNumber(e._datas.total[0].data[r]-0))return"number"}},_getScales:function(e,r){var a=this;if(r.text&&t.isArray(r.text))return r.text;var n=r.max/1,i=r.min/1,o=r.num||5,s=Math.max.apply(null,e),c=Math.min.apply(null,e);a.isNagitive=0>s?1:0,a.isPositive=c>0?1:0,a.isZero=s===c&&0===s,a.isZero&&(s=5,c=-5);var l=.1*(s-c),f=n||0==n?n>=s?n:s+l:s+l,d=i||0==i?c>=i?i:c-l:c-l;return a.getScales(f,d,o)},data2GrapicData:function(e,r,a){if(void 0!==e){var n,i=this,o=i._innerContainer,s=r?o.x:o.y,c=o.height,l=o.width,f=i._cfg.zoomType,d=r?Math.max.apply(null,i.coordNumX):Math.max.apply(null,i.coordNum),u=r?Math.min.apply(null,i.coordNumX):Math.min.apply(null,i.coordNum),p=[];switch(f){case"xy":n=r?c:l;break;case"x":n=c;break;case"y":n=l}if(t.isArray(e)){for(var h in e)p.push(i.data2Grapic(e[h],d,u,n,s,a));return p}return i.data2Grapic(e,d,u,n,s,a)}},data2Grapic:function(t,e,r,a,n,i){return 0>=e-r?void 0:i?a*(1-(t-r)/(e-r))+n:a*(t-r)/(e-r)+n},getSplitPoints:function(t,e,r,a,n,i){var o=(r-t)/n,s=(a-e)/n,c=[];i&&c.push({x:t,y:e});for(var l=0;n-1>l;l++)c.push({x:t+(l+1)*o,y:e+(l+1)*s});return i&&c.push({x:r,y:a}),c},getCenterPoints:function(t){var e=[],r=t.length;if(r>1)for(var a=0;r-1>a;a++)e[a]={x:(t[a].x+t[a+1].x)/2,y:(t[a].y+t[a+1].y)/2};return e},getScales:function(t,e,r){var a,n,i,o,s,c,l,f=this,d=Math.log,u=Math.pow,p=[],h=0;for(t===e&&e>0?(e=0,t=2*t):t===e&&0>e&&(t=0,e=2*e),a=(t-e)/r,i=Math.floor(d(a)/d(10))+1,n=a/u(10,i),n=n>0&&.1>=n?.1:n>.1&&.2>=n?.2:n>.2&&.25>=n?.25:n>.25&&.5>=n?.5:1,o=n*u(10,i),l=(t+e)/2-(t+e)/2%o,s=c=l;s>e;)s-=o;for(;t>c;)c+=o;if(f.isFloat(o)){var x=o+"";x.indexOf(".")>-1&&(h=x.split(".")[1].length>4?4:x.split(".")[1].length)}for(var g=s;c>=g;g+=o)p.push(parseFloat(g).toFixed(h));if(f.isNagitive)for(g in p)p[g]>0&&p.splice(g,1);else if(f.isPositive)for(g in p)0>p[g]&&p.splice(g,1);return p},arraySort:function(t,e,r){return t.sort(function(t,a){return e?"object"==typeof t&&"object"==typeof a?a[r]-t[r]:a-t:"object"==typeof t&&"object"==typeof a?t[r]-a[r]:t-a})},getArrayByKey:function(e,r){var a=[];for(var n in e)(e[n][r]||t.isNumber(e[n][r]))&&a.push(e[n][r]);return a},isFloat:function(t){return/^([+-]?)\d*\.\d+$/.test(t)},obj2Array:function(t,e){var r=[];for(var a in t)r.push(e?t[e]:t[a]);return r},getObjKeys:function(t){var e=[];for(b in t)e.push(b);return e},isInSide:function(t,e,r,a,n,i){return t>r&&r- -n>t&&e>a&&a- -i>e?!0:!1},px2num:function(t){var t=t||0;return Math.round((t+"").replace(/\s+|px/g,"")),Math.round((t+"").replace(/\s+|px/g,""))},getOffset:function(e){var r=e.currentTarget;if(e.offsetX)return{offsetX:e.offsetX,offsetY:e.offsetY};var a=t.DOM.offset(r);return{offsetX:e.offsetX||e.clientX-a.left,offsetY:e.offsetY||e.clientY-a.top}},getConfig:function(){return this._cfg},setConfig:function(e){this._cfg=t.mix(this._cfg,e,void 0,void 0,!0),this.__setData()}};return e.extend?n=e.extend(o):(n=function(){},t.extend(n,e,o)),n.Common=a,n},{requires:["base","node","./common"]});