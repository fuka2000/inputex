YUI.add("inputex-rte",function(e,t){var n=e.inputEx,r=e.YUI2,i=e.Lang;n.RTEField=function(e){n.RTEField.superclass.constructor.call(this,e)},e.extend(n.RTEField,n.Field,{setOptions:function(e){n.RTEField.superclass.setOptions.call(this,e),this.options.opts=e.opts||{},this.options.editorType=e.editorType},renderComponent:function(){n.RTEfieldsNumber||(n.RTEfieldsNumber=0);var t="inputEx-RTEField-"+n.RTEfieldsNumber,s={id:t};this.options.name&&(s.name=this.options.name),this.el=n.cn("textarea",s),n.RTEfieldsNumber+=1,this.fieldContainer.appendChild(this.el);var o={height:"300px",width:"580px",dompath:!0,filterWord:!0},u=this.options.opts;for(var a in u)i.hasOwnProperty(u,a)&&(o[a]=u[a]);var f=this.options.editorType&&this.options.editorType=="simple"?r.widget.SimpleEditor:r.widget.Editor;f?(this.editor=new f(t,o),this.editor.render()):alert("Editor is not on the page"),this.editor.filter_msword=function(t){return t=f.prototype.filter_msword.call(this,t),this.get("filterWord")?(t=t.replace(/<!--[^>][\s\S]*-->/gi,""),t=t.replace(/<\/?meta[^>]*>/gi,""),t=t.replace(/<\/?link[^>]*>/gi,""),t=t.replace(/ class=('|")?MsoNormal('|")?/gi,""),t=e.Lang.trim(t),t):t}},setValue:function(e,t){if(this.editor){var n=this.el.id+"_editor";r.util.Dom.get(n)?this.editor.setEditorHTML(e):this.el.value=e}t!==!1&&this.fireUpdatedEvt()},getValue:function(){var e;try{return e=this.editor.saveHTML(),e}catch(t){return null}}}),n.registerType("html",n.RTEField,[])},"@VERSION@",{requires:["inputex-field","yui2-editor"],ix_provides:"html"});
