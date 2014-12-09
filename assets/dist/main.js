/*!
 * Shuffle.js by @Vestride
 * Categorize, sort, and filter a responsive grid of items.
 * Dependencies: jQuery 1.9+, Modernizr 2.6.2+
 * @license MIT license
 * @version 2.1.2
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery","modernizr"],a):a(window.jQuery,window.Modernizr)}(function(a,b,c){"use strict";function d(a){return a?a.replace(/([A-Z])/g,function(a,b){return"-"+b.toLowerCase()}).replace(/^ms-/,"-ms-"):""}function e(b,c,d){var e,f,g,h=null,i=0;d=d||{};var j=function(){i=d.leading===!1?0:a.now(),h=null,g=b.apply(e,f),e=f=null};return function(){var k=a.now();i||d.leading!==!1||(i=k);var l=c-(k-i);return e=this,f=arguments,0>=l||l>c?(clearTimeout(h),h=null,i=k,g=b.apply(e,f),e=f=null):h||d.trailing===!1||(h=setTimeout(j,l)),g}}if("object"!=typeof b)throw new Error("Shuffle.js requires Modernizr.\nhttp://vestride.github.io/Shuffle/#dependencies");var f=b.prefixed("transition"),g=b.prefixed("transitionDelay"),h=b.prefixed("transitionDuration"),i={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[f],j=b.prefixed("transform"),k=d(j),l=b.csstransforms&&b.csstransitions,m=b.csstransforms3d,n="shuffle",o="all",p="groups",q=1,r=.001,s=0,t=function(b,c){c=c||{},a.extend(this,t.options,c,t.settings),this.$el=a(b),this.$window=a(window),this.unique="shuffle_"+s++,this._fire(t.EventType.LOADING),this._init(),setTimeout(a.proxy(function(){this.initialized=!0,this._fire(t.EventType.DONE)},this),16)};return t.EventType={LOADING:"loading",DONE:"done",SHRINK:"shrink",SHRUNK:"shrunk",FILTER:"filter",FILTERED:"filtered",SORTED:"sorted",LAYOUT:"layout",REMOVED:"removed"},t.prototype={_init:function(){var b,c,d=this,e=a.proxy(d._onResize,d),g=d.throttle?d.throttle(e,d.throttleTime):e,h=d.initialSort?d.initialSort:null;d._layoutList=[],d._shrinkList=[],d._setVars(),d._resetCols(),d._addClasses(),d._initItems(),d.$window.on("resize."+n+"."+d.unique,g),b=d.$el.css(["paddingLeft","paddingRight","position"]),c=d._getOuterWidth(d.$el[0]),"static"===b.position&&(d.$el[0].style.position="relative"),d.offset={left:parseInt(b.paddingLeft,10)||0,top:parseInt(b.paddingTop,10)||0},d._setColumns(parseInt(c,10)),d.shuffle(d.group,h),d.supported&&setTimeout(function(){d._setTransitions(),d.$el[0].style[f]="height "+d.speed+"ms "+d.easing},0)},_addClasses:function(){this.$el.addClass(n),this.$items.addClass("shuffle-item filtered")},_setVars:function(){var b=this,c=b.columnWidth;b.$items=b._getItems(),0===c&&null!==b.sizer&&(c=b.sizer),"string"==typeof c?b.$sizer=b.$el.find(c):c&&c.nodeType&&1===c.nodeType?b.$sizer=a(c):c&&c.jquery&&(b.$sizer=c),b.$sizer&&b.$sizer.length&&(b.useSizer=!0,b.sizer=b.$sizer[0])},_filter:function(b,d){var e=this,f=d!==c,g=f?d:e.$items,h=a();return b=b||e.lastFilter,e._fire(t.EventType.FILTER),a.isFunction(b)?g.each(function(){var c=a(this);b.call(c[0],c,e)&&(h=h.add(c))}):(e.group=b,b===o?h=g:g.each(function(){var c=a(this),d=c.data(p),f=e.delimeter&&!a.isArray(d)?d.split(e.delimeter):d;a.inArray(b,f)>-1&&(h=h.add(c))})),e._toggleFilterClasses(g,h),g=null,d=null,h},_toggleFilterClasses:function(b,c){var d="concealed",e="filtered";b.filter(c).each(function(){var b=a(this);b.hasClass(d)&&b.removeClass(d),b.hasClass(e)||b.addClass(e)}),b.not(c).each(function(){var b=a(this);b.hasClass(d)||b.addClass(d),b.hasClass(e)&&b.removeClass(e)})},_initItems:function(a){a=a||this.$items,a.css(this.itemCss).data("position",{x:0,y:0})},_updateItemCount:function(){this.visibleItems=this.$items.filter(".filtered").length},_setTransition:function(a){a.style[f]=k+" "+this.speed+"ms "+this.easing+", opacity "+this.speed+"ms "+this.easing},_setTransitions:function(a){var b=this;a=a||b.$items,a.each(function(){b._setTransition(this)})},_setSequentialDelay:function(b){var c=this;c.supported&&a.each(b,function(b,d){d.style[g]="0ms,"+(b+1)*c.sequentialFadeDelay+"ms",a(d).on(i+"."+c.unique,function(b){var d=b.currentTarget;d===b.target&&(d.style[g]="0ms",a(d).off(i+"."+c.unique))})})},_getItems:function(){return this.$el.children(this.itemSelector)},_getPreciseDimension:function(b,c){var d;return d=window.getComputedStyle?window.getComputedStyle(b,null)[c]:a(b).css(c),parseFloat(d)},_getOuterWidth:function(b,c){var d=b.offsetWidth;if(c){var e=a(b).css(["marginLeft","marginRight"]),f=parseFloat(e.marginLeft)||0,g=parseFloat(e.marginRight)||0;d+=f+g}return d},_getOuterHeight:function(b,c){var d=b.offsetHeight;if(c){var e=a(b).css(["marginTop","marginBottom"]),f=parseFloat(e.marginTop)||0,g=parseFloat(e.marginBottom)||0;d+=f+g}return d},_getColumnSize:function(b,c){var d;return d=a.isFunction(this.columnWidth)?this.columnWidth(c):this.useSizer?this._getPreciseDimension(this.sizer,"width"):this.columnWidth?this.columnWidth:this.$items.length>0?this._getOuterWidth(this.$items[0],!0):c,0===d&&(d=c),d+b},_getGutterSize:function(b){var c;return c=a.isFunction(this.gutterWidth)?this.gutterWidth(b):this.useSizer?this._getPreciseDimension(this.sizer,"marginLeft"):this.gutterWidth},_setColumns:function(a){var b=a||this._getOuterWidth(this.$el[0]),c=this._getGutterSize(b),d=this._getColumnSize(c,b),e=(b+c)/d;Math.abs(Math.round(e)-e)<.03&&(e=Math.round(e)),this.cols=Math.max(Math.floor(e),1),this.containerWidth=b,this.colWidth=d},_setContainerSize:function(){this.$el.css("height",Math.max.apply(Math,this.colYs))},_fire:function(a,b){this.$el.trigger(a+"."+n,b&&b.length?b:[this])},_layout:function(b,c,d){var e=this;c=c||e._filterEnd,a.each(b,function(b,f){var g=a(f),h=g.data(),i=h.position,j=e._getItemPosition(g);if(g.data("position",j),j.x!==i.x||j.y!==i.y||h.scale!==q){var k={$item:g,x:j.x,y:j.y,scale:q};d?(k.skipTransition=!0,k.opacity=0):(k.opacity=1,k.callback=c),e.styleQueue.push(k),e._layoutList.push(g[0])}}),e._processStyleQueue(),e._setContainerSize()},_resetCols:function(){var a=this.cols;for(this.colYs=[];a--;)this.colYs.push(0)},_reLayout:function(){this._resetCols(),this.lastSort?this.sort(this.lastSort,!0):this._layout(this.$items.filter(".filtered").get(),this._filterEnd)},_getItemPosition:function(a){var b=this,c=b._getOuterWidth(a[0],!0),d=c/b.colWidth;Math.abs(Math.round(d)-d)<.03&&(d=Math.round(d));var e=Math.min(Math.ceil(d),b.cols);if(1===e)return b._placeItem(a,b.colYs);var f,g,h=b.cols+1-e,i=[];for(g=0;h>g;g++)f=b.colYs.slice(g,g+e),i[g]=Math.max.apply(Math,f);return b._placeItem(a,i)},_placeItem:function(a,b){for(var c=this,d=Math.min.apply(Math,b),e=0,f=0,g=b.length;g>f;f++)if(b[f]>=d-c.buffer&&b[f]<=d+c.buffer){e=f;break}var h={x:Math.round(c.colWidth*e+c.offset.left),y:Math.round(d+c.offset.top)},i=d+c._getOuterHeight(a[0],!0),j=c.cols+1-g;for(f=0;j>f;f++)c.colYs[e+f]=i;return h},_shrink:function(b,c){var d=this,e=b||d.$items.filter(".concealed");c=c||d._shrinkEnd,e.length&&(d._fire(t.EventType.SHRINK),e.each(function(){var b=a(this),e=b.data(),f=e.scale===r;if(!f){var g={$item:b,x:e.position.x,y:e.position.y,scale:r,opacity:0,callback:c};d.styleQueue.push(g),d._shrinkList.push(b[0])}}))},_onResize:function(){if(this.enabled&&!this.destroyed){var a=this._getOuterWidth(this.$el[0]);a!==this.containerWidth&&this.resized()}},_getItemTransformString:function(a,b,c){return m?"translate3d("+a+"px, "+b+"px, 0) scale3d("+c+", "+c+", 1)":"translate("+a+"px, "+b+"px) scale("+c+", "+c+")"},_getStylesForTransition:function(a){var b={opacity:a.opacity};return this.supported?a.x!==c&&(b[j]=this._getItemTransformString(a.x,a.y,a.scale)):(b.left=a.x,b.top=a.y),1===a.opacity&&(b.visibility="visible"),b},_transition:function(a){a.$item.data("scale",a.scale);var b=this._getStylesForTransition(a);this._startItemAnimation(a.$item,b,a.callback)},_startItemAnimation:function(b,c,d){var e=1===c.opacity,f=a.proxy(this._handleItemAnimationEnd,this,d||a.noop,b[0],e);this.supported?(b.css(c),this.initialized?b.on(i+".shuffleitem",f):f()):("visibility"in c&&(b.css("visibility",c.visibility),delete c.visibility),b.stop(!0).animate(c,this.speed,"swing",f))},_handleItemAnimationEnd:function(b,c,d,e){if(e){if(e.target!==c)return;a(c).off(".shuffleitem")}this._layoutList.length>0&&a.inArray(c,this._layoutList)>-1?(this._fire(t.EventType.LAYOUT),b.call(this),this._layoutList.length=0):this._shrinkList.length>0&&a.inArray(c,this._shrinkList)>-1&&(b.call(this),this._shrinkList.length=0),d||(c.style.visibility="hidden")},_processStyleQueue:function(){var b=this;a.each(this.styleQueue,function(a,c){c.skipTransition?b._skipTransition(c.$item[0],function(){c.$item.css(b._getStylesForTransition(c))}):b._transition(c)}),b.styleQueue.length=0},_shrinkEnd:function(){this._fire(t.EventType.SHRUNK)},_filterEnd:function(){this._fire(t.EventType.FILTERED)},_sortEnd:function(){this._fire(t.EventType.SORTED)},_skipTransition:function(b,c,d){var e=b.style[h];b.style[h]="0ms",a.isFunction(c)?c():b.style[c]=d;var f=b.offsetWidth;f=null,b.style[h]=e},_addItems:function(a,b,d){var e=this;e.supported||(b=!1),a.addClass("shuffle-item"),e._initItems(a),e._setTransitions(a),e.$items=e._getItems(),a.css("opacity",0);var f=e._filter(c,a),g=f.get();e._updateItemCount(),b?(e._layout(g,null,!0),d&&e._setSequentialDelay(f),e._revealAppended(f)):e._layout(g)},_revealAppended:function(b){var c=this;setTimeout(function(){b.each(function(b,d){c._transition({$item:a(d),opacity:1,scale:q})})},c.revealAppendedDelay)},shuffle:function(a,b){var c=this;c.enabled&&(a||(a=o),c._filter(a),c.lastFilter=a,c._updateItemCount(),c._shrink(),b&&(c.lastSort=b),c._reLayout())},sort:function(a,b){var c=this,d=c.$items.filter(".filtered").sorted(a);b||c._resetCols(),c._layout(d,function(){b&&c._filterEnd(),c._sortEnd()}),c.lastSort=a},resized:function(a){this.enabled&&(a||this._setColumns(),this._reLayout())},layout:function(){this.update(!0)},update:function(a){this.resized(a)},appended:function(a,b,c){b=b===!1?!1:!0,c=c===!1?!1:!0,this._addItems(a,b,c)},disable:function(){this.enabled=!1},enable:function(a){this.enabled=!0,a!==!1&&this.update()},remove:function(a){if(a.length&&a.jquery){var b=this;return b._shrink(a,function(){var b=this;a.remove(),setTimeout(function(){b.$items=b._getItems(),b.layout(),b._updateItemCount(),b._fire(t.EventType.REMOVED,[a,b]),a=null},0)}),b._processStyleQueue(),b}},destroy:function(){var a=this;a.$window.off("."+a.unique),a.$el.removeClass(n).removeAttr("style").removeData(n),a.$items.removeAttr("style").removeClass("concealed filtered shuffle-item"),a.$window=null,a.$items=null,a.$el=null,a.$sizer=null,a.sizer=null,a.destroyed=!0}},t.options={group:o,speed:250,easing:"ease-out",itemSelector:"",sizer:null,gutterWidth:0,columnWidth:0,delimeter:null,buffer:0,initialSort:null,throttle:e,throttleTime:300,sequentialFadeDelay:150,supported:l},t.settings={$sizer:null,useSizer:!1,itemCss:{position:"absolute",top:0,left:0},offset:{top:0,left:0},revealAppendedDelay:300,enabled:!0,destroyed:!1,initialized:!1,styleQueue:[]},a.fn.shuffle=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),e=d.data(n);e||(e=new t(d,b),d.data(n,e)),"string"==typeof b&&e[b]&&e[b].apply(e,c)})},a.fn.sorted=function(b){var d=a.extend({},a.fn.sorted.defaults,b),e=this.get(),f=!1;return e.length?d.randomize?a.fn.sorted.randomize(e):(d.by!==a.noop&&null!==d.by&&d.by!==c&&e.sort(function(b,e){if(f)return 0;var g=d.by(a(b)),h=d.by(a(e));return g===c&&h===c?(f=!0,0):"sortFirst"===g||"sortLast"===h?-1:"sortLast"===g||"sortFirst"===h?1:h>g?-1:g>h?1:0}),f?this.get():(d.reverse&&e.reverse(),e)):[]},a.fn.sorted.defaults={reverse:!1,by:null,randomize:!1},a.fn.sorted.randomize=function(a){var b,c,d=a.length;if(!d)return a;for(;--d;)c=Math.floor(Math.random()*(d+1)),b=a[c],a[c]=a[d],a[d]=b;return a},t});;// Generated by CoffeeScript 1.6.2
/*
jQuery Waypoints - v2.0.3
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function(){var t=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++){if(e in this&&this[e]===t)return e}return-1},e=[].slice;(function(t,e){if(typeof define==="function"&&define.amd){return define("waypoints",["jquery"],function(n){return e(n,t)})}else{return e(t.jQuery,t)}})(this,function(n,r){var i,o,l,s,f,u,a,c,h,d,p,y,v,w,g,m;i=n(r);c=t.call(r,"ontouchstart")>=0;s={horizontal:{},vertical:{}};f=1;a={};u="waypoints-context-id";p="resize.waypoints";y="scroll.waypoints";v=1;w="waypoints-waypoint-ids";g="waypoint";m="waypoints";o=function(){function t(t){var e=this;this.$element=t;this.element=t[0];this.didResize=false;this.didScroll=false;this.id="context"+f++;this.oldScroll={x:t.scrollLeft(),y:t.scrollTop()};this.waypoints={horizontal:{},vertical:{}};t.data(u,this.id);a[this.id]=this;t.bind(y,function(){var t;if(!(e.didScroll||c)){e.didScroll=true;t=function(){e.doScroll();return e.didScroll=false};return r.setTimeout(t,n[m].settings.scrollThrottle)}});t.bind(p,function(){var t;if(!e.didResize){e.didResize=true;t=function(){n[m]("refresh");return e.didResize=false};return r.setTimeout(t,n[m].settings.resizeThrottle)}})}t.prototype.doScroll=function(){var t,e=this;t={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(c&&(!t.vertical.oldScroll||!t.vertical.newScroll)){n[m]("refresh")}n.each(t,function(t,r){var i,o,l;l=[];o=r.newScroll>r.oldScroll;i=o?r.forward:r.backward;n.each(e.waypoints[t],function(t,e){var n,i;if(r.oldScroll<(n=e.offset)&&n<=r.newScroll){return l.push(e)}else if(r.newScroll<(i=e.offset)&&i<=r.oldScroll){return l.push(e)}});l.sort(function(t,e){return t.offset-e.offset});if(!o){l.reverse()}return n.each(l,function(t,e){if(e.options.continuous||t===l.length-1){return e.trigger([i])}})});return this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}};t.prototype.refresh=function(){var t,e,r,i=this;r=n.isWindow(this.element);e=this.$element.offset();this.doScroll();t={horizontal:{contextOffset:r?0:e.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:e.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?n[m]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return n.each(t,function(t,e){return n.each(i.waypoints[t],function(t,r){var i,o,l,s,f;i=r.options.offset;l=r.offset;o=n.isWindow(r.element)?0:r.$element.offset()[e.offsetProp];if(n.isFunction(i)){i=i.apply(r.element)}else if(typeof i==="string"){i=parseFloat(i);if(r.options.offset.indexOf("%")>-1){i=Math.ceil(e.contextDimension*i/100)}}r.offset=o-e.contextOffset+e.contextScroll-i;if(r.options.onlyOnScroll&&l!=null||!r.enabled){return}if(l!==null&&l<(s=e.oldScroll)&&s<=r.offset){return r.trigger([e.backward])}else if(l!==null&&l>(f=e.oldScroll)&&f>=r.offset){return r.trigger([e.forward])}else if(l===null&&e.oldScroll>=r.offset){return r.trigger([e.forward])}})})};t.prototype.checkEmpty=function(){if(n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([p,y].join(" "));return delete a[this.id]}};return t}();l=function(){function t(t,e,r){var i,o;r=n.extend({},n.fn[g].defaults,r);if(r.offset==="bottom-in-view"){r.offset=function(){var t;t=n[m]("viewportHeight");if(!n.isWindow(e.element)){t=e.$element.height()}return t-n(this).outerHeight()}}this.$element=t;this.element=t[0];this.axis=r.horizontal?"horizontal":"vertical";this.callback=r.handler;this.context=e;this.enabled=r.enabled;this.id="waypoints"+v++;this.offset=null;this.options=r;e.waypoints[this.axis][this.id]=this;s[this.axis][this.id]=this;i=(o=t.data(w))!=null?o:[];i.push(this.id);t.data(w,i)}t.prototype.trigger=function(t){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,t)}if(this.options.triggerOnce){return this.destroy()}};t.prototype.disable=function(){return this.enabled=false};t.prototype.enable=function(){this.context.refresh();return this.enabled=true};t.prototype.destroy=function(){delete s[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};t.getWaypointsByElement=function(t){var e,r;r=n(t).data(w);if(!r){return[]}e=n.extend({},s.horizontal,s.vertical);return n.map(r,function(t){return e[t]})};return t}();d={init:function(t,e){var r;if(e==null){e={}}if((r=e.handler)==null){e.handler=t}this.each(function(){var t,r,i,s;t=n(this);i=(s=e.context)!=null?s:n.fn[g].defaults.context;if(!n.isWindow(i)){i=t.closest(i)}i=n(i);r=a[i.data(u)];if(!r){r=new o(i)}return new l(t,r,e)});n[m]("refresh");return this},disable:function(){return d._invoke(this,"disable")},enable:function(){return d._invoke(this,"enable")},destroy:function(){return d._invoke(this,"destroy")},prev:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e>0){return t.push(n[e-1])}})},next:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e<n.length-1){return t.push(n[e+1])}})},_traverse:function(t,e,i){var o,l;if(t==null){t="vertical"}if(e==null){e=r}l=h.aggregate(e);o=[];this.each(function(){var e;e=n.inArray(this,l[t]);return i(o,e,l[t])});return this.pushStack(o)},_invoke:function(t,e){t.each(function(){var t;t=l.getWaypointsByElement(this);return n.each(t,function(t,n){n[e]();return true})});return this}};n.fn[g]=function(){var t,r;r=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(d[r]){return d[r].apply(this,t)}else if(n.isFunction(r)){return d.init.apply(this,arguments)}else if(n.isPlainObject(r)){return d.init.apply(this,[null,r])}else if(!r){return n.error("jQuery Waypoints needs a callback function or handler option.")}else{return n.error("The "+r+" method does not exist in jQuery Waypoints.")}};n.fn[g].defaults={context:r,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};h={refresh:function(){return n.each(a,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return(t=r.innerHeight)!=null?t:i.height()},aggregate:function(t){var e,r,i;e=s;if(t){e=(i=a[n(t).data(u)])!=null?i.waypoints:void 0}if(!e){return[]}r={horizontal:[],vertical:[]};n.each(r,function(t,i){n.each(e[t],function(t,e){return i.push(e)});i.sort(function(t,e){return t.offset-e.offset});r[t]=n.map(i,function(t){return t.element});return r[t]=n.unique(r[t])});return r},above:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return h._invoke("enable")},disable:function(){return h._invoke("disable")},destroy:function(){return h._invoke("destroy")},extendFn:function(t,e){return d[t]=e},_invoke:function(t){var e;e=n.extend({},s.vertical,s.horizontal);return n.each(e,function(e,n){n[t]();return true})},_filter:function(t,e,r){var i,o;i=a[n(t).data(u)];if(!i){return[]}o=[];n.each(i.waypoints[e],function(t,e){if(r(i,e)){return o.push(e)}});o.sort(function(t,e){return t.offset-e.offset});return n.map(o,function(t){return t.element})}};n[m]=function(){var t,n;n=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(h[n]){return h[n].apply(null,t)}else{return h.aggregate.call(null,n)}};n[m].settings={resizeThrottle:100,scrollThrottle:30};return i.load(function(){return n[m]("refresh")})})}).call(this);;!function(e){var t={animation:"dissolve",separator:",",speed:2e3};e.fx.step.textShadowBlur=function(t){e(t.elem).prop("textShadowBlur",t.now).css({textShadow:"0 0 "+Math.floor(t.now)+"px black"})};e.fn.textrotator=function(n){var r=e.extend({},t,n);return this.each(function(){var t=e(this);var n=[];e.each(t.text().split(r.separator),function(e,t){n.push(t)});t.text(n[0]);var i=function(){switch(r.animation){case"dissolve":t.animate({textShadowBlur:20,opacity:0},500,function(){s=e.inArray(t.text(),n);if(s+1==n.length)s=-1;t.text(n[s+1]).animate({textShadowBlur:0,opacity:1},500)});break;case"flip":if(t.find(".back").length>0){t.html(t.find(".back").html())}var i=t.text();var s=e.inArray(i,n);if(s+1==n.length)s=-1;t.html("");e("<span class='front'>"+i+"</span>").appendTo(t);e("<span class='back'>"+n[s+1]+"</span>").appendTo(t);t.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip").show().css({"-webkit-transform":" rotateY(-180deg)","-moz-transform":" rotateY(-180deg)","-o-transform":" rotateY(-180deg)",transform:" rotateY(-180deg)"});break;case"flipUp":if(t.find(".back").length>0){t.html(t.find(".back").html())}var i=t.text();var s=e.inArray(i,n);if(s+1==n.length)s=-1;t.html("");e("<span class='front'>"+i+"</span>").appendTo(t);e("<span class='back'>"+n[s+1]+"</span>").appendTo(t);t.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip up").show().css({"-webkit-transform":" rotateX(-180deg)","-moz-transform":" rotateX(-180deg)","-o-transform":" rotateX(-180deg)",transform:" rotateX(-180deg)"});break;case"flipCube":if(t.find(".back").length>0){t.html(t.find(".back").html())}var i=t.text();var s=e.inArray(i,n);if(s+1==n.length)s=-1;t.html("");e("<span class='front'>"+i+"</span>").appendTo(t);e("<span class='back'>"+n[s+1]+"</span>").appendTo(t);t.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip cube").show().css({"-webkit-transform":" rotateY(180deg)","-moz-transform":" rotateY(180deg)","-o-transform":" rotateY(180deg)",transform:" rotateY(180deg)"});break;case"flipCubeUp":if(t.find(".back").length>0){t.html(t.find(".back").html())}var i=t.text();var s=e.inArray(i,n);if(s+1==n.length)s=-1;t.html("");e("<span class='front'>"+i+"</span>").appendTo(t);e("<span class='back'>"+n[s+1]+"</span>").appendTo(t);t.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip cube up").show().css({"-webkit-transform":" rotateX(180deg)","-moz-transform":" rotateX(180deg)","-o-transform":" rotateX(180deg)",transform:" rotateX(180deg)"});break;case"spin":if(t.find(".rotating").length>0){t.html(t.find(".rotating").html())}s=e.inArray(t.text(),n);if(s+1==n.length)s=-1;t.wrapInner("<span class='rotating spin' />").find(".rotating").hide().text(n[s+1]).show().css({"-webkit-transform":" rotate(0) scale(1)","-moz-transform":"rotate(0) scale(1)","-o-transform":"rotate(0) scale(1)",transform:"rotate(0) scale(1)"});break;case"fade":t.fadeOut(r.speed,function(){s=e.inArray(t.text(),n);if(s+1==n.length)s=-1;t.text(n[s+1]).fadeIn(r.speed)});break}};setInterval(i,r.speed)})}}(window.jQuery);/*
 * throttledresize: special jQuery event that happens at a reduced rate compared to "resize"
 *
 * latest version and complete README available on Github:
 * https://github.com/louisremi/jquery-smartresize
 *
 * Copyright 2012 @louis_remi
 * Licensed under the MIT license.
 *
 * This saved you an hour of work? 
 * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
 */
(function($) {

var $event = $.event,
	$special,
	dummy = {_:0},
	frame = 0,
	wasResized, animRunning;

$special = $event.special.throttledresize = {
	setup: function() {
		$( this ).on( "resize", $special.handler );
	},
	teardown: function() {
		$( this ).off( "resize", $special.handler );
	},
	handler: function( event, execAsap ) {
		// Save the context
		var context = this,
			args = arguments;

		wasResized = true;

		if ( !animRunning ) {
			setInterval(function(){
				frame++;

				if ( frame > $special.threshold && wasResized || execAsap ) {
					// set correct event type
					event.type = "throttledresize";
					$event.dispatch.apply( context, args );
					wasResized = false;
					frame = 0;
				}
				if ( frame > 9 ) {
					$(dummy).stop();
					animRunning = false;
					frame = 0;
				}
			}, 30);
			animRunning = true;
		}
	},
	threshold: 0
};

})(jQuery);;/*! WOW - v1.0.1 - 2014-09-03
* Copyright (c) 2014 Matthieu Aussaguel; Licensed MIT */(function(){var a,b,c,d,e,f=function(a,b){return function(){return a.apply(b,arguments)}},g=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};b=function(){function a(){}return a.prototype.extend=function(a,b){var c,d;for(c in b)d=b[c],null==a[c]&&(a[c]=d);return a},a.prototype.isMobile=function(a){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)},a.prototype.addEvent=function(a,b,c){return null!=a.addEventListener?a.addEventListener(b,c,!1):null!=a.attachEvent?a.attachEvent("on"+b,c):a[b]=c},a.prototype.removeEvent=function(a,b,c){return null!=a.removeEventListener?a.removeEventListener(b,c,!1):null!=a.detachEvent?a.detachEvent("on"+b,c):delete a[b]},a.prototype.innerHeight=function(){return"innerHeight"in window?window.innerHeight:document.documentElement.clientHeight},a}(),c=this.WeakMap||this.MozWeakMap||(c=function(){function a(){this.keys=[],this.values=[]}return a.prototype.get=function(a){var b,c,d,e,f;for(f=this.keys,b=d=0,e=f.length;e>d;b=++d)if(c=f[b],c===a)return this.values[b]},a.prototype.set=function(a,b){var c,d,e,f,g;for(g=this.keys,c=e=0,f=g.length;f>e;c=++e)if(d=g[c],d===a)return void(this.values[c]=b);return this.keys.push(a),this.values.push(b)},a}()),a=this.MutationObserver||this.WebkitMutationObserver||this.MozMutationObserver||(a=function(){function a(){"undefined"!=typeof console&&null!==console&&console.warn("MutationObserver is not supported by your browser."),"undefined"!=typeof console&&null!==console&&console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")}return a.notSupported=!0,a.prototype.observe=function(){},a}()),d=this.getComputedStyle||function(a){return this.getPropertyValue=function(b){var c;return"float"===b&&(b="styleFloat"),e.test(b)&&b.replace(e,function(a,b){return b.toUpperCase()}),(null!=(c=a.currentStyle)?c[b]:void 0)||null},this},e=/(\-([a-z]){1})/g,this.WOW=function(){function e(a){null==a&&(a={}),this.scrollCallback=f(this.scrollCallback,this),this.scrollHandler=f(this.scrollHandler,this),this.start=f(this.start,this),this.scrolled=!0,this.config=this.util().extend(a,this.defaults),this.animationNameCache=new c}return e.prototype.defaults={boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!0},e.prototype.init=function(){var a;return this.element=window.document.documentElement,"interactive"===(a=document.readyState)||"complete"===a?this.start():this.util().addEvent(document,"DOMContentLoaded",this.start),this.finished=[]},e.prototype.start=function(){var b,c,d,e;if(this.stopped=!1,this.boxes=function(){var a,c,d,e;for(d=this.element.querySelectorAll("."+this.config.boxClass),e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.all=function(){var a,c,d,e;for(d=this.boxes,e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.boxes.length)if(this.disabled())this.resetStyle();else{for(e=this.boxes,c=0,d=e.length;d>c;c++)b=e[c],this.applyStyle(b,!0);this.util().addEvent(window,"scroll",this.scrollHandler),this.util().addEvent(window,"resize",this.scrollHandler),this.interval=setInterval(this.scrollCallback,50)}return this.config.live?new a(function(a){return function(b){var c,d,e,f,g;for(g=[],e=0,f=b.length;f>e;e++)d=b[e],g.push(function(){var a,b,e,f;for(e=d.addedNodes||[],f=[],a=0,b=e.length;b>a;a++)c=e[a],f.push(this.doSync(c));return f}.call(a));return g}}(this)).observe(document.body,{childList:!0,subtree:!0}):void 0},e.prototype.stop=function(){return this.stopped=!0,this.util().removeEvent(window,"scroll",this.scrollHandler),this.util().removeEvent(window,"resize",this.scrollHandler),null!=this.interval?clearInterval(this.interval):void 0},e.prototype.sync=function(){return a.notSupported?this.doSync(this.element):void 0},e.prototype.doSync=function(a){var b,c,d,e,f;if(!this.stopped){if(null==a&&(a=this.element),1!==a.nodeType)return;for(a=a.parentNode||a,e=a.querySelectorAll("."+this.config.boxClass),f=[],c=0,d=e.length;d>c;c++)b=e[c],g.call(this.all,b)<0?(this.applyStyle(b,!0),this.boxes.push(b),this.all.push(b),f.push(this.scrolled=!0)):f.push(void 0);return f}},e.prototype.show=function(a){return this.applyStyle(a),a.className=""+a.className+" "+this.config.animateClass},e.prototype.applyStyle=function(a,b){var c,d,e;return d=a.getAttribute("data-wow-duration"),c=a.getAttribute("data-wow-delay"),e=a.getAttribute("data-wow-iteration"),this.animate(function(f){return function(){return f.customStyle(a,b,d,c,e)}}(this))},e.prototype.animate=function(){return"requestAnimationFrame"in window?function(a){return window.requestAnimationFrame(a)}:function(a){return a()}}(),e.prototype.resetStyle=function(){var a,b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.setAttribute("style","visibility: visible;"));return e},e.prototype.customStyle=function(a,b,c,d,e){return b&&this.cacheAnimationName(a),a.style.visibility=b?"hidden":"visible",c&&this.vendorSet(a.style,{animationDuration:c}),d&&this.vendorSet(a.style,{animationDelay:d}),e&&this.vendorSet(a.style,{animationIterationCount:e}),this.vendorSet(a.style,{animationName:b?"none":this.cachedAnimationName(a)}),a},e.prototype.vendors=["moz","webkit"],e.prototype.vendorSet=function(a,b){var c,d,e,f;f=[];for(c in b)d=b[c],a[""+c]=d,f.push(function(){var b,f,g,h;for(g=this.vendors,h=[],b=0,f=g.length;f>b;b++)e=g[b],h.push(a[""+e+c.charAt(0).toUpperCase()+c.substr(1)]=d);return h}.call(this));return f},e.prototype.vendorCSS=function(a,b){var c,e,f,g,h,i;for(e=d(a),c=e.getPropertyCSSValue(b),i=this.vendors,g=0,h=i.length;h>g;g++)f=i[g],c=c||e.getPropertyCSSValue("-"+f+"-"+b);return c},e.prototype.animationName=function(a){var b;try{b=this.vendorCSS(a,"animation-name").cssText}catch(c){b=d(a).getPropertyValue("animation-name")}return"none"===b?"":b},e.prototype.cacheAnimationName=function(a){return this.animationNameCache.set(a,this.animationName(a))},e.prototype.cachedAnimationName=function(a){return this.animationNameCache.get(a)},e.prototype.scrollHandler=function(){return this.scrolled=!0},e.prototype.scrollCallback=function(){var a;return!this.scrolled||(this.scrolled=!1,this.boxes=function(){var b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],a&&(this.isVisible(a)?this.show(a):e.push(a));return e}.call(this),this.boxes.length||this.config.live)?void 0:this.stop()},e.prototype.offsetTop=function(a){for(var b;void 0===a.offsetTop;)a=a.parentNode;for(b=a.offsetTop;a=a.offsetParent;)b+=a.offsetTop;return b},e.prototype.isVisible=function(a){var b,c,d,e,f;return c=a.getAttribute("data-wow-offset")||this.config.offset,f=window.pageYOffset,e=f+Math.min(this.element.clientHeight,this.util().innerHeight())-c,d=this.offsetTop(a),b=d+a.clientHeight,e>=d&&b>=f},e.prototype.util=function(){return null!=this._util?this._util:this._util=new b},e.prototype.disabled=function(){return!this.config.mobile&&this.util().isMobile(navigator.userAgent)},e}()}).call(this);;/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Ã‚Â© 2001 Robert Penner
 * All rights reserved.
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Ã‚Â© 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/
jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});;/**
 * Github Repository Info Widget
 * JQuery plugin to create a GitHub widget of the provided repository
 */
(function($) {
    $.fn.githubInfo = function (options) {
        var wrapper = $(this),
            settings = $.extend({
                // Repository info
                'username': 'bobbywhang',
                'repository': 'folio2014',

                // Sparkline options
                'timespan': 30, // in days

                // Optional data
                'showDates': false,
                'tinyAvatars': false
            }, settings);

        /**
         * Formats a given Date element to a YYYY.MM.DD string
         */
        function dateFormatter(d) {
            var day   = d.getDate(),
                month = d.getMonth(),
                year  = d.getFullYear();

            return year + '.' + (month > 9 ? '' : '0') + month + '.' + (day > 9 ? '' : '0') + day;
        }

        /**
         * Calculates a human readable time span between two given dates
         * E.g.: '3 months ago'
         */
        function dateDiff(a, b) {
            var dateA = {
                    seconds: a.getSeconds(),
                    minutes: a.getMinutes(),
                    hours:   a.getHours(),
                    day:     a.getDate(),
                    month:   a.getMonth(),
                    year:    a.getFullYear()
                },
                dateB = {
                    seconds: b.getSeconds(),
                    minutes: b.getMinutes(),
                    hours:   b.getHours(),
                    day:     b.getDate(),
                    month:   b.getMonth(),
                    year:    b.getFullYear()
                },
                diff  = {
                    seconds: dateB.seconds - dateA.seconds,
                    minutes: dateB.minutes - dateA.minutes,
                    hours:   dateB.hours   - dateA.hours,
                    days:    dateB.day     - dateA.day,
                    weeks:   Math.floor((dateB.day - dateA.day) / 7),
                    months:  dateB.month   - dateA.month,
                    years:   dateB.year    - dateA.year
                };

            // Check the biggest time interval
            if (diff.years > 0) {
                diff.total = diff.years;
                diff.units = 'year';
            } else if (diff.months > 0) {
                diff.total = diff.months;
                diff.units = 'month';
            } else if (diff.weeks > 0) {
                diff.total = diff.weeks;
                diff.units = 'week';
            } else if (diff.days > 0) {
                diff.total = diff.days;
                diff.units = 'day';
            } else if (diff.hours > 0) {
                diff.total = diff.hours;
                diff.units = 'hour';
            } else if (diff.minutes > 0) {
                diff.total = diff.minutes;
                diff.units = 'minute';
            } else {
                diff.total = diff.seconds;
                diff.units = 'second';
            }

            return diff.total + ' ' + diff.units + (diff.total > 1 ? 's' : '') +' ago';
        }

        /**
         * Calculate day number from Date.
         * Algorithm here: http://alcor.concordia.ca/~gpkatch/gdate-algorithm.html
         */
        function dayNumber(date) {
            var d = date.getDate(),
                m = date.getMonth(),
                y = date.getFullYear();

            m = (m + 9) % 12;
            y = y - m / 10;

            return Math.floor(365 * y + y / 4 -  y / 100 +  y / 400 + (m * 306 + 5) / 10 + (d - 1));
        }

        return this.each(function() {
            /** Request data from the repository */
            $.ajax({
                type: 'GET',
                url: 'https://api.github.com/repos/' + settings.username + '/' + settings.repository,
                dataType: 'jsonp',
                success: function (data) {
                    /** Handles GitHub API JSON-P callback result */
                    data = data.data || data;

                    // /** Create and append header */
                    // wrapper.append('<div class="title"><a class="site-logo" href="https://github.com/"><img alt="GitHub" class="github-logo-4x" height="30" src="https://a248.e.akamai.net/assets.github.com/images/modules/header/logov7@4x.png"></a><span> / ' + data.name + '</span></div>');

                    // /** Create and append short description */
                    // wrapper.append('<div class="summary">' +
                    //     '<p class="description">' + data.description + '</p>' +
                    //     '<a class="homepage" href="' + data.homepage + '">' + data.homepage + '</a>' +
                    //     '</div>');

                    /** Ownership, Views, and Forks info */
                    // wrapper.append('<div class="stats">' +
                    //     '<div class="ownership">' +
                    //     '<img class="gravatar" src="' + data.owner.avatar_url + '" />' +
                    //     '<a class="link-user" href="https://github.com/' + data.owner.login + '">' + data.owner.login + '</a>' +
                    //     '</div>' +
                    //     '<div class="repostats">' +
                    //     '<ul class="repo-stats">' +
                    //     '<li class="watchers watching minibutton btn-watch"><a href="' + data.html_url + '/watchers" class="tooltipped downwards" original-title="Watchers - You\'re Watching">' + '<span class="icon"></span>' + data.watchers + '</a></li>' +
                    //     '<li class="forks minibutton btn-fork"><a href="' + data.html_url + '/network" class="tooltipped downwards" original-title="Forks - You have a fork">' + '<span class="icon"></span>' + data.forks + '</a></li>' +
                    //     '</ul>' +
                    //     '</div>' +
                    //     '</div>');

                    /** Create and append repo activity */
                    var todaysDate = new Date(),
                        createDate = new Date(data.created_at),
                        updateDate = new Date(data.pushed_at),
                        createdAgo = dateDiff(createDate, todaysDate),
                        updatedAgo = dateDiff(updateDate, todaysDate),
                        updatedPar = '<p class="updated"><span class="emphasis">Updated</span>',
                        createdPar = '<p class="created"><span class="emphasis">Created</span>';

                    if (settings.showDates) {
                        updatedPar += dateFormatter(updateDate) + '<span class="time-ago">(' + updatedAgo + ')</span>';
                        createdPar += dateFormatter(createDate) + '<span class="time-ago">(' + createdAgo + ')</span>';
                    }
                    updatedPar += updatedAgo + '</p>';
                    createdPar += createdAgo + '</p>';

                    // wrapper.append('<div class="activity">' +
                    //     '<p class="history">' +
                    //     '<span class="emphasis">Commit history</span><span class="sparkline"></span>');
                }
            });

            /** Request repo's commits */
            $.ajax({
                type: 'GET',
                url: 'https://api.github.com/repos/' + settings.username + '/' + settings.repository + '/commits',
                dataType: 'jsonp',
                success: function (data) {
                    /** Handles GitHub API JSON-P callback result */
                    data = data.data || data;

                    var today = new Date(),
                        commits = [],
                        diff = 0,
                        day,
                        i;

                    /** Initialize the array */
                    i = settings.timespan;
                    while (i--) {
                        commits[i] = 0;
                    }

                    /** Check dates */
                    i = 0;
                    while (diff < settings.timespan && data[i]) {
                        day = new Date(data[i++].commit.committer.date);

                        diff = dayNumber(today) - dayNumber(day);
                        if (diff < settings.timespan) {
                            commits[diff] += 2;
                        }
                    }


                    /** Latest commits */
                    var divLatestCommits = '<div class="latest-commits"><div class="wrapper">',
                        length = 1;

                    for (i = 0; i < length; i++) {
                        divLatestCommits += '<div class="commit ' + (i % 2 ? 'even' : 'odd') + '">' +
                            '<div class="commiter-info">' +
                            // '<img class="gravatar' + (settings.tinyAvatars ? ' tiny' : '') + '" src="' + data[i].committer.avatar_url + '" />' +
                            '<a class="link-user" href="https://github.com/' + data[i].committer.login + '">' + data[i].committer.login + '</a> ' +
                            '<span class="time-ago">(' + dateDiff(new Date(data[i].commit.author.date), today) + ')</span>' +
                            '</div>' +
                            '<p class="commit-msg">' + data[i].commit.message.replace(/\n{2,}/g, '<br/>') + '</p>' +
                            '</div>';
                    }
                    divLatestCommits += '</div></div>';

                    wrapper.append(divLatestCommits);
                }
            });
        });
    };
})(jQuery);;/*********************************************************************
*  #### Twitter Post Fetcher v12.0 ####
*  Coded by Jason Mayes 2013. A present to all the developers out there.
*  www.jasonmayes.com
*  Please keep this disclaimer with my code if you use it. Thanks. :-)
*  Got feedback or questions, ask here:
*  http://www.jasonmayes.com/projects/twitterApi/
*  Github: https://github.com/jasonmayes/Twitter-Post-Fetcher
*  Updates will be posted to this site.
*********************************************************************/
var twitterFetcher = function() {
  var domNode = '';
  var maxTweets = 20;
  var parseLinks = true;
  var queue = [];
  var inProgress = false;
  var printTime = true;
  var printUser = true;
  var formatterFunction = null;
  var supportsClassName = true;
  var showRts = true;
  var customCallbackFunction = null;
  var showInteractionLinks = false;
  var showImages = false;
  var lang = 'en';

  function handleTweets(tweets){
    if (customCallbackFunction === null) {
      var x = tweets.length;
      var n = 0;
      var element = document.getElementById(domNode);
      var html = '';
      while(n < x) {
        html += '' + tweets[n];
        n++;
      }
      html += '';
      element.innerHTML = html;
    } else {
      customCallbackFunction(tweets);
    }
  }

  function strip(data) {
    return data.replace(/<b[^>]*>(.*?)<\/b>/gi, function(a,s){return s;})
        .replace(/class=".*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi,
        '');
  }

  function getElementsByClassName (node, classname) {
    var a = [];
    var regex = new RegExp('(^| )' + classname + '( |$)');
    var elems = node.getElementsByTagName('*');
    for (var i = 0, j = elems.length; i < j; i++) {
        if(regex.test(elems[i].className)){
          a.push(elems[i]);
        }
    }
    return a;
  }

  function extractImageUrl(image_data) {
    if (image_data !== undefined) {
      var data_src = image_data.innerHTML.match(/data-srcset="([A-z0-9%_\.-]+)/i)[0];
      return decodeURIComponent(data_src).split('"')[1];
    }
  }

  return {
    fetch: function(config) {
      if (config.maxTweets === undefined) {
        config.maxTweets = 20;
      }
      if (config.enableLinks === undefined) {
        config.enableLinks = true;
      }
      if (config.showUser === undefined) {
        config.showUser = true;
      }
      if (config.showTime === undefined) {
        config.showTime = true;
      }
      if (config.dateFunction === undefined) {
        config.dateFunction = 'default';
      }
      if (config.showRetweet === undefined) {
        config.showRetweet = true;
      }
      if (config.customCallback === undefined) {
        config.customCallback = null;
      }
      if (config.showInteraction === undefined) {
        config.showInteraction = true;
      }
      if (config.showImages === undefined) {
        config.showImages = false;
      }

      if (inProgress) {
        queue.push(config);
      } else {
        inProgress = true;

        domNode = config.domId;
        maxTweets = config.maxTweets;
        parseLinks = config.enableLinks;
        printUser = config.showUser;
        printTime = config.showTime;
        showRts = config.showRetweet;
        formatterFunction = config.dateFunction;
        customCallbackFunction = config.customCallback;
        showInteractionLinks = config.showInteraction;
        showImages = config.showImages;

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//cdn.syndication.twimg.com/widgets/timelines/' +
            config.id + '?&lang=' + (config.lang || lang) + '&callback=twitterFetcher.callback&' +
            'suppress_response_codes=true&rnd=' + Math.random();
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    },

    callback: function(data) {
      var div = document.createElement('div');
      div.innerHTML = data.body;
      if (typeof(div.getElementsByClassName) === 'undefined') {
         supportsClassName = false;
      }

      var tweets = [];
      var authors = [];
      var times = [];
      var images = [];
      var rts = [];
      var tids = [];
      var x = 0;

      if (supportsClassName) {
        var tmp = div.getElementsByClassName('tweet');
        while (x < tmp.length) {
          if (tmp[x].getElementsByClassName('retweet-credit').length > 0) {
            rts.push(true);
          } else {
            rts.push(false);
          }
          if (!rts[x] || rts[x] && showRts) {
            tweets.push(tmp[x].getElementsByClassName('e-entry-title')[0]);
            tids.push(tmp[x].getAttribute('data-tweet-id'));
            authors.push(tmp[x].getElementsByClassName('p-author')[0]);
            times.push(tmp[x].getElementsByClassName('dt-updated')[0]);
            if (tmp[x].getElementsByClassName('inline-media')[0] !== undefined) {
              images.push(tmp[x].getElementsByClassName('inline-media')[0]);
            } else {
              images.push(undefined);
            }
          }
          x++;
        }
      } else {
        var tmp = getElementsByClassName(div, 'tweet');
        while (x < tmp.length) {
          tweets.push(getElementsByClassName(tmp[x], 'e-entry-title')[0]);
          tids.push(tmp[x].getAttribute('data-tweet-id'));
          authors.push(getElementsByClassName(tmp[x], 'p-author')[0]);
          times.push(getElementsByClassName(tmp[x], 'dt-updated')[0]);
          if (getElementsByClassName(tmp[x], 'inline-media')[0] !== undefined) {
            images.push(getElementsByClassName(tmp[x], 'inline-media')[0]);
          } else {
            images.push(undefined);
          }

          if (getElementsByClassName(tmp[x], 'retweet-credit').length > 0) {
            rts.push(true);
          } else {
            rts.push(false);
          }
          x++;
        }
      }

      if (tweets.length > maxTweets) {
        tweets.splice(maxTweets, (tweets.length - maxTweets));
        authors.splice(maxTweets, (authors.length - maxTweets));
        times.splice(maxTweets, (times.length - maxTweets));
        rts.splice(maxTweets, (rts.length - maxTweets));
        images.splice(maxTweets, (images.length - maxTweets));
      }

      var arrayTweets = [];
      var x = tweets.length;
      var n = 0;
      while(n < x) {
        if (typeof(formatterFunction) !== 'string') {
          var datetimeText = times[n].getAttribute('datetime');
          var newDate = new Date(times[n].getAttribute('datetime')
              .replace(/-/g,'/').replace('T', ' ').split('+')[0]);
          var dateString = formatterFunction(newDate, datetimeText);
          times[n].setAttribute('aria-label', dateString);

          if (tweets[n].innerText) {
            // IE hack.
            if (supportsClassName) {
              times[n].innerText = dateString;
            } else {
              var h = document.createElement('p');
              var t = document.createTextNode(dateString);
              h.appendChild(t);
              h.setAttribute('aria-label', dateString);
              times[n] = h;
            }
          } else {
            times[n].textContent = dateString;
          }
        }
        var op = '';
        if (parseLinks) {
          // if (printUser) {
          //   op += '<div class="user">' + strip(authors[n].innerHTML) +
          //       '</div>';
          // }
          op += '<p class="tweet">' + strip(tweets[n].innerHTML) + '</p>';
          // if (printTime) {
          //   op += '<p class="timePosted">' +
          //       times[n].getAttribute('aria-label') + '</p>';
          // }
        } else {
          if (tweets[n].innerText) {
            // if (printUser) {
            //   op += '<p class="user">' + authors[n].innerText + '</p>';
            // }
            op += '<p class="tweet">' +  tweets[n].innerText + '</p>';
            // if (printTime) {
            //   op += '<p class="timePosted">' + times[n].innerText + '</p>';
            // }

          } else {
            // if (printUser) {
            //   op += '<p class="user">' + authors[n].textContent + '</p>';
            // }
            op += '<p class="tweet">' +  tweets[n].textContent + '</p>';
            // if (printTime) {
            //   op += '<p class="timePosted">' + times[n].textContent + '</p>';
            // }
          }
        }
        // if (showInteractionLinks) {
        //   op += '<p class="interact"><a href="https://twitter.com/intent/' +
        //       'tweet?in_reply_to=' + tids[n] + '" class="twitter_reply_icon">' +
        //       'Reply</a><a href="https://twitter.com/intent/retweet?tweet_id=' +
        //       tids[n] + '" class="twitter_retweet_icon">Retweet</a>' +
        //       '<a href="https://twitter.com/intent/favorite?tweet_id=' +
        //       tids[n] + '" class="twitter_fav_icon">Favorite</a></p>';
        // }

        // if (showImages && images[n] !== undefined) {
        //   op += '<div class="media">' +
        //       '<img src="' + extractImageUrl(images[n]) + '" alt="Image from tweet" />' +
        //       '</div>';
        // }

        arrayTweets.push(op);
        n++;
      }
      handleTweets(arrayTweets);
      inProgress = false;

      if (queue.length > 0) {
        twitterFetcher.fetch(queue[0]);
        queue.splice(0,1);
      }
    }
  };
}();
