/*! kcharts - v1.3 - 2014-07-29 5:46:50 PM
* Copyright (c) 2014 伯才; Licensed  */
KISSY.add("gallery/kcharts/1.3/tip/index",function(l,t,e,r,i){var n,a=l.all,s={initializer:function(){this.init()},init:function(){var t=this.userConfig,e=this,r={clsName:"ks-chart-default",autoRender:!0,isVisable:!1,boundry:{x:0,y:0,width:0,height:0},rootNode:a("body"),tpl:"",corner:{isShow:!1,tpl:"corner",css:{position:"absolute",marginLeft:0,marginTop:0}},anim:{easing:"easeOut",duration:.25},offset:{x:0,y:0},alignX:"left",alignY:"top"};e._events={MOVE:"move",SETCONT:"setcontent",HIDE:"hide"},e._cfg=l.mix(r,t,void 0,void 0,!0),e._cfg.rootNode=a(e._cfg.rootNode);var i=e._cfg;e._data={},e._tpl=i.tpl,e.bindEvent(),i.autoRender&&e.render()},bindEvent:function(){var t=this,e=t._cfg.template,r=t._events;t.on(r.MOVE,function(l){var e=l.x,r=l.y,i=l.style;t.isVisable()&&t._cfg.anim?t.animateTo(e,r):t.moveTo(e,r),i&&t.$tip.css(i)}),t.on(r.SETCONT,function(r){l.isFunction(e)?t.setContent(e(r.data)):t.renderTemplate(e,r.data)}),t.on(r.HIDE,function(){t.hide()})},getInstance:function(){return this.$tip},isVisable:function(){return"none"==this.$tip.css("display")?!1:!0},show:function(){var l=this;return l.$tip&&l.$tip.show(),l},hide:function(){var l=this;return l.$tip&&l.$tip.stop()&&l.$tip.hide(),l},moveTo:function(l,t){var e=this;e._prevtime=(new Date).getTime(),e.show();var r=e.getInstance(),i=e._cfg,n=(e._cfg.anim,e.getPos(l,t)),a=(i.corner.css["margin-top"]||i.corner.css.marginTop||0,i.corner.css["margin-left"]||i.corner.css.marginLeft||0),s=e.$corner;s&&s.css({"margin-left":a+l-n.x}),r.css({"margin-top":n.y,"margin-left":n.x})},animateTo:function(l,t,e){var r=this,i=r._cfg,n=i.anim,a=(new Date).getTime();r._prevtime&&100>a-r._prevtime&&r.animateFast(l,t,e),r.show(),r._prevtime=(new Date).getTime();var s=r.getInstance(),o=r.getPos(l,t),h=(i.corner.css["margin-top"]||i.corner.css.marginTop||0,i.corner.css["margin-left"]||i.corner.css.marginLeft||0),c=r.$corner;c&&c.css({"margin-left":h+l-o.x}),s.stop().animate({"margin-top":o.y,"margin-left":o.x},n.duration,n.easing,function(){e&&e()})},animateFast:function(l,t,e){var r,i,n=this,a=n.get("x"),s=n.get("y"),o=.2;n._prevtime=(new Date).getTime(),n.show(),void 0!==a&&(r=a/1+(l-a)*o,i=s/1+(t-s)*o);var h=n.getInstance(),c=n._cfg,x=n._cfg.anim,y=n.getPos(r,i),u=(c.corner.css["margin-top"]||c.corner.css.marginTop||0,c.corner.css["margin-left"]||c.corner.css.marginLeft||0),f=n.$corner;f&&f.css({"margin-left":u+l-y.x}),h.css({"margin-top":y.y,"margin-left":y.x});var d=n.getPos(l,t);h.stop().animate({"margin-top":d.y,"margin-left":d.x},x.duration,x.easing,function(){e&&e()})},renderTemplate:function(l,t){return this.setContent(i(l).render(t))},setContent:function(l){return a("."+this._cfg.clsName+"-tip-content",this.$tip).html(l)},getPos:function(l,t){var e=this,r=e._cfg,i=r.offset,n=t+i.y,a=l+i.x,s=r.alignX,o=r.alignY,h=e.getInstance(),c=h.outerWidth(),x=h.outerHeight(),y=r.boundry;switch(e.set("x",l||0),e.set("y",t||0),s){case"center":a=Math.round(l)+i.x-c/2;break;case"right":a=Math.round(l)+i.x-c}switch(o){case"middle":n=Math.round(t)+i.y-x/2;break;case"bottom":n=Math.round(t)+i.y-x}if(y.width&&y.height){var u=y.x||0,f=y.y||0,d=y.width,p=y.height;f>n?n=t- -Math.abs(i.y):n>f+p-x&&(n=t-x-Math.abs(i.y)),u>a?a=l- -Math.abs(i.x):a>u+d-c&&(a=l-c-Math.abs(i.x))}return{x:a,y:n}},_isExist:function(){return this.$tip&&this.$tip[0]},render:function(){var l=this,t=l._cfg,e=l._tpl,r=l._data,i=t.isVisable?"inline-block":"none",n=t.rootNode.offset();return t.rootNode.offset()?(l.$tip=!l._isExist()&&a('<span class="'+t.clsName+'-tip" style="*zoom:1;"><span class="'+t.clsName+'-tip-content"></span></span>').css({display:i}).appendTo(t.rootNode),l.$corner=t.corner.isShow&&t.corner.tpl?a("<div class='"+t.clsName+"-corner'>"+t.corner.tpl+"</div>").css(t.corner.css).appendTo(l.$tip):void 0,l.$tip.css({"margin-top":n.top+t.offset.y,"margin-left":n.left+t.offset.x,position:"absolute"}),l.renderTemplate(e,r),l.$tip):!1}};return e.extend?n=e.extend(s):(n=function(l){l&&(this.userConfig=l,this.init())},l.extend(n,e,s)),n},{requires:["node","base","anim","gallery/template/1.0/index","./assets/tip.css"]});