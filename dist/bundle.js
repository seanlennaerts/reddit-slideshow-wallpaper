!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";var r;n.r(e),function(t){t[t.Image=0]="Image"}(r||(r={}));class o{constructor(t,e,n,r){this.url=t,this.height=e,this.width=n,this.type=r}}var i=function(t,e,n,r){return new(n||(n=Promise))((function(o,i){function c(t){try{a(r.next(t))}catch(t){i(t)}}function u(t){try{a(r.throw(t))}catch(t){i(t)}}function a(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(c,u)}a((r=r.apply(t,e||[])).next())}))};var c=function(t,e,n,r){return new(n||(n=Promise))((function(o,i){function c(t){try{a(r.next(t))}catch(t){i(t)}}function u(t){try{a(r.throw(t))}catch(t){i(t)}}function a(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(c,u)}a((r=r.apply(t,e||[])).next())}))};class u{constructor(t){this.controller=new AbortController,this.subreddit=t}cancel(){this.controller.abort()}getImages(){return c(this,void 0,void 0,(function*(){try{let t=[];const e=yield function t(e,n,r=4,o=1e3){return i(this,void 0,void 0,(function*(){try{const t=yield fetch(e,{signal:n});if(!t.ok)throw new Error(t.status.toString());return t.json()}catch(c){if(1===r){const t=new Error("Failed to GET from "+e);throw t.name="NetworkError",t}setTimeout(()=>i(this,void 0,void 0,(function*(){return yield t(e,n,r-1,2*o)})),o)}}))}(`https://www.reddit.com/${this.subreddit}/top.json?t=all&after=${this.after}&limit=100`,this.controller.signal);this.after=e.data.after;for(let n of e.data.children){const{post_hint:e,url:i,preview:c}=n.data;switch(e){case"image":const{height:e,width:n}=c.images[0].source;t.push(new o(i,e,n,r.Image))}}return t}catch(t){"AbortError"===t.name&&console.log("fetch was aborted")}}))}}var a=function(t,e,n,r){return new(n||(n=Promise))((function(o,i){function c(t){try{a(r.next(t))}catch(t){i(t)}}function u(t){try{a(r.throw(t))}catch(t){i(t)}}function a(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(c,u)}a((r=r.apply(t,e||[])).next())}))};class s{constructor(){this.index=0}static getInstance(){return s.instance||(s.instance=new s),s.instance}updateSubreddit(t){return a(this,void 0,void 0,(function*(){console.log("updating subreddit"),this.redditAPI&&this.redditAPI.cancel(),this.redditAPI=new u(t),this.wallpapers=yield this.redditAPI.getImages()}))}startSlideshow(){clearTimeout(this.timeout),this.timeout=setTimeout(()=>{},1e4)}updateWallpapers(t){this.wallpapers=t,this.startSlideshow()}}const l=s.getInstance();window.wallpaperPropertyListener={applyUserProperties:t=>{if(t.subreddit_or_user&&function(t,e){let n;return(...r)=>{const o=this;clearTimeout(n),n=setTimeout(()=>t.apply(o,r),e)}}(t=>{l.updateSubreddit(t)},5e3)(t.subreddit_or_user.value),t.fill,t.tile,t.background_color){t.background_color.value.split(" ").map(t=>255*t)}t.change_picture_every},setPaused:t=>{t||console.log("came back from being suspended")}}}]);