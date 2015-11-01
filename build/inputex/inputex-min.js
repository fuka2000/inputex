YUI.add("inputex",function(e,t){var n=e.Lang;e.inputEx=function(t,n){var i=null,s;if(t.type){i=r.getFieldClass(t.type);if(!e.Lang.isFunction(i))throw new Error("Missing inputEx module for type: '"+t.type+"' ?")}else i=t.fieldClass?t.fieldClass:r.StringField;return s=new i(t),n&&s.setParentField(n),s};var r=e.inputEx;e.mix(e.inputEx,{VERSION:"4.0.0",spacerUrl:YUI_config.groups.inputex.base+"inputex/assets/skins/sam/images/space.gif",stateEmpty:"empty",stateRequired:"required",stateValid:"valid",stateInvalid:"invalid",messages:null,widget:{},mixin:{},regexps:{email:/^[a-z0-9!\#\$%&'\*\-\/=\?\+\-\^_`\{\|\}~]+(?:\.[a-z0-9!\#\$%&'\*\-\/=\?\+\-\^_`\{\|\}~]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,6}$/i,url:/^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(\:[0-9]{1,5})?(([0-9]{1,5})?\/.*)?$/i},typeClasses:{},browserAutocomplete:"on",registerType:function(e,t,r,i){if(!n.isString(e))throw new Error("inputEx.registerType: first argument must be a string");if(!n.isFunction(t))throw new Error("inputEx.registerType: second argument must be a function");this.typeClasses[e]=t;var s=[];n.isArray(r)&&(s=r),t.superclass&&!i&&n.isArray(t.superclass.constructor.groupOptions)&&(s=t.superclass.constructor.groupOptions.concat(s)),t.groupOptions=s},getFieldClass:function(e){return n.isFunction(this.typeClasses[e])?this.typeClasses[e]:null},getType:function(e){for(var t in this.typeClasses)if(this.typeClasses.hasOwnProperty(t)&&this.typeClasses[t]==e)return t;return null},getRawModulesFromDefinition:function(t){var n=t.type||"string",r=YUI_config.groups.inputex.modulesByType[n],i=[r||n],s=t.fields||t.elementType&&t.elementType.fields;return s&&e.Array.each(s,function(e){i=i.concat(this.getModulesFromDefinition(e))},this),i},getModulesFromDefinition:function(t){var n=this.getRawModulesFromDefinition(t);return e.Object.keys(e.Array.hash(n))},use:function(t,n){var r,i=[];e.Array.test(t)?r=t:r=[t],e.each(r,function(e){i=i.concat(this.getModulesFromDefinition(e))},this),i.push(n),e.use.apply(e,i)},sn:function(e,t,r){if(!e)return;var i;if(t)for(i in t){var s=t[i];if(n.isFunction(s))continue;i=="className"&&(i="class",e.className=s);if(s!==e.getAttribute(i))try{s===!1?e.removeAttribute(i):e.setAttribute(i,s)}catch(o){}}if(r)for(i in r){if(n.isFunction(r[i]))continue;e.style[i]!=r[i]&&(e.style[i]=r[i])}},cn:function(t,n,r,i){if(t=="input"&&e.UA.ie&&e.UA.ie<9){var s="<"+t;if(n!=="undefined")for(var o in n)s+=" "+(o==="className"?"class":o)+'="'+n[o]+'"';return s+="/>",document.createElement(s)}var u=document.createElement(t);return this.sn(u,n,r),i&&(u.innerHTML=i),u},indexOf:function(e,t,r){var i=t.length,s;n.isFunction(r)||(r=function(e,t){return e===t});for(s=0;s<i;s++)if(r.call({},e,t[s]))return s;return-1},compactArray:function(e){var t=[],r=e.length,i;for(i=0;i<r;i++)!n.isNull(e[i])&&!n.isUndefined(e[i])&&t.push(e[i]);return t},htmlEntities:function(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}})},"@VERSION@",{requires:["intl","node","plugin","pluginhost-base","pluginhost-config","base-pluginhost","node-pluginhost"],skinnable:!0});
