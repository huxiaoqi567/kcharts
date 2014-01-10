/*! kcharts - v1.3 - 2014-01-10 6:20:53 PM
* Copyright (c) 2014 数据可视化小组; Licensed  */
KISSY.add("gallery/kcharts/1.3/radar/index",function(l,e,t,i,x,n){function r(l,e,t){return l+(e-l)*t}function y(l){for(var e,t=0,i=l.length;i>t;t++){var x=l[t],n=x.x,r=x.y;t?e.push("L",n,r):e=["M",n,r]}return e.push("Z"),e.join(",")}function a(l,e){var t;t=e?"show":"hide",o(l,function(l){l[t]()})}Math.PI;var s,o=l.each,c=(l.map,l.filter,l.merge),h={text:{fill:"#222","max-chars":10,key:!0}},v={points:{fill:"#333","stroke-width":"0",size:4.5},text:{fill:"#222","text-anchor":"start"},lines:{"stroke-width":"1"}},f={easing:"linear",duration:800},d={initializer:function(e){e||(e=this.userConfig);var i=l.get(e.renderTo);e.anim=l.merge(f,e.anim),this.set("container",i),this.set(e),this._animationInstance=0,this.dochk(e);var x;if(!i)throw Error("容器不能为空");x=t(i,e.width,e.height),this.set("paper",x),this.set("config",e),this.render(e)},dochk:function(l){var e=l.labels.length,t=i.width(this.get("container")),x=i.height(this.get("container"));this.set("sides",e),void 0==l.cx&&(l.cx=t/2),void 0==l.cy&&(l.cy=x/2);var n=this.get("scoreGroups");if(n[0]&&n[0].scores){var r=[];o(n,function(l){r=r.concat(l.scores)});var y=Math.max.apply(Math,r);l.max=y}if(void 0==l.r){var a=Math.min.apply(Math,[t,x]);l.r=a/2-30,0>l.r&&(l.r=a/2)}},drawPolygon:function(l){var e=this.get("paper"),t=y(l);return e.path(t)},drawFrame:function(l){var e=this.drawPolygon(l).attr({stroke:"#777"});this.set("framepath",e)},getOption:function(){var l=this.get("config"),e={text:{fill:"#222","max-chars":10,key:!0}};l.options;var t=c(e,l.options);return t},getGroupOption:function(e){var t={points:{fill:"#333","stroke-width":"0",size:4.5},text:{fill:"#222","text-anchor":"start"},lines:{"stroke-width":"1"}};return l.merge(t,e)},drawGroup:function(l,e,t){for(var i,x,n,y,a=this.get("config"),s=a.cx,o=a.cy,c=this.get("paper"),h=this.get("lines")||[],v=[],f=this.get("pts")||[],d=[],p=0;e.length>p;p++)i=r(s,e[p].x,l[p]),x=r(o,e[p].y,l[p]),d.push({x:i,y:x});n=this.drawPolygon(d),t&&t.lines&&n.attr(t.lines);for(var g=0;l.length>g;g++)i=r(s,e[g].x,l[g]),x=r(o,e[g].y,l[g]),y=c.circle(i,x,t.points.size).attr(t.points),v.push(y);f.push(v),h.push(n),this.get("lines")||(this.set("lines",h),this.set("pts",f))},getPoints:function(){for(var l,e,t=this.get("sides"),i=this.get("config"),x=-90,n=i.r,r=i.cx,y=i.cy,a=[],s=360/t,o=0;t>o;o++){var c=x/360*2*Math.PI;l=r+n*Math.cos(c),e=y+n*Math.sin(c),a.push({x:l,y:e}),x+=s}return a},getBBox:function(){var l=this.get("r"),e=2*l,t=2*l,i=this.get("cx"),x=this.get("cy");return{width:e,height:t,left:i-e/2,top:x-t/2}},drawLegend:function(l){var e=this.get("container"),t=this.getBBox(),i=this.get("legend")||{},x=c({interval:20,iconright:5,showicon:!0},i.globalConfig);delete i.globalConfig;var r=new n(c({container:e,paper:this.get("paper"),bbox:t,align:i.align||"bc",offset:i.offset||[0,20],globalConfig:x,config:l},i));r.on("click",function(l){if(!this.isRunning()){var e=l.index,t=(l.text,l.icon,l.el);1!=t.hide?(this.hideLine(e),t.hide=1,t.disable()):(this.showLine(e),t.hide=0,t.enable())}},this),this.set("legend",r)},hideLine:function(l){var e=this.get("lines"),t=this.get("pts");e[l]&&a([e[l]]),t[l]&&a(t[l])},showLine:function(l){var e=this.get("lines"),t=this.get("pts");e[l]&&a([e[l]],!0),t[l]&&a(t[l],!0)},drawLabels:function(e,t){for(var i,x,n=e,y=this.get("paper"),a=this.get("config"),s=a.cx,o=a.cy,c=(a.r,a.labels),h=0;n.length>h;h++){i=r(s,n[h].x,1.1),x=r(o,n[h].y,1.1);var v="middle";i>s&&(v="start"),s>i&&(v="end");var f=c[h];f.length>t.text["max-chars"]&&(f=f.replace(" ","\n")),y.text(i,x,f).attr(l.merge(t.text,{"text-anchor":v}))}},drawMeasureAndRuler:function(l){for(var e,t,i,x,n,y,a=this.get("paper"),s=this.get("config"),o=s.cx,c=s.cy,h=[],v=[],f=0;l.length>f;f++){e=l[f].x,t=l[f].y,h.push(a.path("M "+o+" "+c+" L "+e+" "+t).attr("stroke","#777"));for(var d=.025,p=1;5>p;p++){i=r(o,l[f].x,.2*p-d),x=r(c,l[f].y,.2*p-d),n=r(o,l[f].x,.2*p+d),y=r(c,l[f].y,.2*p+d);var g=a.path("M "+i+" "+x+" L "+n+" "+y).attr({stroke:"#777"});g.rotate(90),v.push(g)}}},getScoreFromGroup:function(l){var e=[],t=this.get("config"),i=t.max,x=t.labels;if(l.scores)for(var n=0;l.scores.length>n;n++)e.push(l.scores[n]/i);else for(var n=0;x.length>n;n++){var r=l[x[n]]||l[x[n].toLowerCase().replace(" ","_")];e.push(r/i)}return e},isRunning:function(){return this._animationInstance>0},render:function(e){e||(e=this.get("config"));var t=(this.get("paper"),this.get("cx")),i=this.get("cy"),x=(this.get("r"),this.get("labels"),this.get("max"),this.get("scoreGroups")),n=this.get("options"),a=this.get("anim"),s=this,f=l.merge(h,n),d=this.getPoints();if(this.drawMeasureAndRuler(d),this.drawFrame(d),this.get("lines")){for(var p,g,u=[],m=[],_=0;x.length>_;_++){for(var b=this.getScoreFromGroup(x[_]),w=[],k=0;b.length>k;k++)p=r(t,d[k].x,b[k]),g=r(i,d[k].y,b[k]),w.push({x:p,y:g});m.push(w);var C=y(w);u.push(C)}var S=this.get("lines"),L=this.get("pts");o(u,function(l,e){var t=L[e],i=m[e];o(t,function(l){l.hide()}),s._animationInstance+=1,S[e].animate({path:u[e]},a.duration,a.easing,function(){o(t,function(l,e){l.attr({cx:i[e].x,cy:i[e].y}),l.show()}),s._animationInstance-=1})})}else{for(var A=[],_=0;x.length>_;_++){var b=this.getScoreFromGroup(x[_]),M=x[_].title;c(v,x[_].draw_options);var T=this.getGroupOption(x[_].draw_options);this.drawGroup(b,d,T),A.push({text:M,DEFAULT:T.lines.stroke})}this.drawLabels(d,f),this.drawLegend(A)}}};return e.extend?s=e.extend(d):(s=function(l){this.set(l),this.userConfig=l,this.initializer()},l.extend(s,e,d)),s},{requires:["base","gallery/kcharts/1.3/raphael/index","dom","event","gallery/kcharts/1.3/legend/index"]});