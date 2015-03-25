(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.frzr=f()}})(function(){var define,module,exports;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){"use strict";function clean(e){e.innerHTML=""}module.exports=clean},{}],2:[function(require,module,exports){"use strict";module.exports=function(e,t,o){Object.defineProperty(e,t,{value:o})}},{}],3:[function(require,module,exports){"use strict";function each(e,t){for(var c=e.length,o=0;c>o;o++)t(e[o],o)}module.exports=each},{}],4:[function(require,module,exports){"use strict";function eachReverse(e,r){for(var s=e.length,t=s;t;t--)r(e[t-1],t-1)}module.exports=eachReverse},{}],5:[function(require,module,exports){"use strict";var frzr={tags:{}};module.exports=frzr,frzr.clean=require(1),frzr.defProperty=require(2),frzr.each=require(3),frzr.eachReverse=require(4),frzr.observable=require(11),frzr.inherits=require(12),frzr.tag=require(9),frzr.times=require(10),frzr.mount=require(6),frzr.mountAll=require(7),frzr.parse=require(8),frzr.observable.prototype.one=frzr.observable.prototype.once,frzr.observable.prototype.trigger=frzr.observable.prototype.emit},{1:1,10:10,11:11,12:12,2:2,3:3,4:4,6:6,7:7,8:8,9:9}],6:[function(require,module,exports){"use strict";function mount(r,t,o){var n=new Tag(frzr.tags[t],r,o);return n}function Tag(r,t,o){var n=this,e=n instanceof Tag;if(!e)return new Tag(r,t,o);var i=r.tmpl.cloneNode(!0);n.$root=t,n.$el=i;for(var u in o)n[u]=o[u];r.constructor.call(n),t&&(t.appendChild(i),n.trigger("mount"),n.$mounted=!0)}var frzr=require(5);module.exports=mount,frzr.inherits(Tag,frzr.observable);var proto=Tag.prototype;proto.$find=function(r){return this.$el.querySelector(r)},proto.$findAll=function(r){return this.$el.querySelectorAll(r)},proto.update=function(r){var t=this;t.trigger("update",t);var r=r||{};for(var o in r)t[o]=r[o];t.trigger("updated",t)},proto.mount=function(r,t,o){var n=this,r=r;"string"==typeof r&&(r=n.$find(r));var e=frzr.mount(r,t,o);return e.$parent=n,e},proto.mountAll=function(r,t,o){var n=this,r=r;"string"==typeof r&&(r=n.$find(r));var e=frzr.mountAll(r,t,o);return e.$parent=n,e},proto.unmount=function(){var r=this;r.trigger("unmount"),r.off(),r.$root.removeChild(r.$el)}},{5:5}],7:[function(require,module,exports){"use strict";function mountAll(t,r,e){return Tags(e,t,r)}function Tags(t,r,e){var o=this,n=o instanceof Tags;return n?(o.$root="string"==typeof r?o.$find(r):r,o.$tags=[],o.$rendered=[],o.$items=t,o.$tagName=e,o.$uid=1,o.$posLookup=[],void o.update()):new Tags(t,r,e)}var frzr=require(5);module.exports=mountAll,frzr.inherits(Tags,frzr.observable);var proto=Tags.prototype;proto.update=function(t){var r,e=this,o=[],n=0;t&&(e.$items=t),e.trigger("update",e.$items),e.trigger("updated",e.$items),e.$parent=e.$root.parentNode,e.trigger("render");var i=[];frzr.each(e.$items,function(t,u){var a,s=e.$posLookup[t.$uid];t.$uid||(frzr.defProperty(t,"$uid",e.$uid),e.$uid++),i[t.$uid]=u,void 0===s?(a=frzr.mount(void 0,e.$tagName,t),a.$item=t,a.$parent=e,a.$root=e.$root,r||(r=document.createDocumentFragment()),r.appendChild(a.$el),a.offset=a.offset+n,n++):(a=e.$tags[s],a.offset=a.offset+n,e.$tags[s]=null,u!==s+a.offset?(r||(r=document.createDocumentFragment()),r.appendChild(a.$el)):r&&(e.$root.insertBefore(r,a.$el),r=void 0)),a&&o.push(a)}),frzr.each(e.$tags,function(t){null!==t&&t.unmount()}),r&&e.$root.appendChild(r),e.$tags=o,e.$rendered=e.$items.slice(),e.$posLookup=i,e.trigger("rendered")},proto.mount=function(t,r,e){var o=this,t=t;"string"==typeof t&&(t=o.$find(t));var n=frzr.mount(t,r,e);return n.$parent=o,n},proto.mountAll=function(t,r,e){var o=this,t=t;"string"==typeof t&&(t=o.$find(t));var n=frzr.mountAll(t,r,e);return n.$parent=o,n},proto.unmount=function(){self.update([]),self.trigger("unmount"),self.off()}},{5:5}],8:[function(require,module,exports){"use strict";function parse(e){return"string"==typeof e?document.querySelector(e).innerHTML:e.innerHTML}module.exports=parse},{}],9:[function(require,module,exports){"use strict";function Tag(t,e,r){if(templates[t])return templates[t].childNodes[0].cloneNode();var s,e=String(e||"").trim();s=document.createElement(startsWith(e,["<td>"])?"tr":startsWith(e,["<tr>","<td>"])?"tbody":startsWith(e,["<thead>","<tbody>"])?"table":"div"),templates[t]=s,s.innerHTML=e,frzr.tags[t]={constructor:r,tmpl:templates[t].childNodes[0]}}function startsWith(t,e){for(var r,s=e.length,a=0;s>a;a++)if(t.slice(0,e[a].length)===e[a]){r=!0;break}return r}var frzr=require(5),templates={};module.exports=Tag},{5:5}],10:[function(require,module,exports){"use strict";function times(t,e){for(var s=0;t>s;s++)e(s)}module.exports=times},{}],11:[function(require,module,exports){function Emitter(t){return t?mixin(t):void 0}function mixin(t){for(var e in Emitter.prototype)t[e]=Emitter.prototype[e];return t}module.exports=Emitter,Emitter.prototype.on=Emitter.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this},Emitter.prototype.once=function(t,e){function i(){this.off(t,i),e.apply(this,arguments)}return i.fn=e,this.on(t,i),this},Emitter.prototype.off=Emitter.prototype.removeListener=Emitter.prototype.removeAllListeners=Emitter.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var i=this._callbacks["$"+t];if(!i)return this;if(1==arguments.length)return delete this._callbacks["$"+t],this;for(var r,s=0;s<i.length;s++)if(r=i[s],r===e||r.fn===e){i.splice(s,1);break}return this},Emitter.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),i=this._callbacks["$"+t];if(i){i=i.slice(0);for(var r=0,s=i.length;s>r;++r)i[r].apply(this,e)}return this},Emitter.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]},Emitter.prototype.hasListeners=function(t){return!!this.listeners(t).length}},{}],12:[function(require,module,exports){module.exports="function"==typeof Object.create?function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:function(t,e){t.super_=e;var o=function(){};o.prototype=e.prototype,t.prototype=new o,t.prototype.constructor=t}},{}]},{},[5])(5)});
