YUI.add("inputex-phone",function(e,t){var n=e.inputEx,r=e.Intl.get(t);n.PhoneField=function(e){n.PhoneField.superclass.constructor.call(this,e)},e.extend(n.PhoneField,n.Field,{setOptions:function(e){n.PhoneField.superclass.setOptions.call(this,e),e.button=e.button?e.button:{},this.options.className=e.className?e.className:"inputEx-Field inputEx-phoneField",this.options.button=e.button,this.options.button.label=e.button.label?e.button.label:r.call,this.options.button.className=e.button.className?e.button.className:"inputEx-phoneField-button"},renderComponent:function(){this.wrapEl=n.cn("div",{className:"inputEx-phoneField-wrapper"}),this.phoneElWrapper=n.cn("div",{className:"inputEx-phoneField-numberWrapper"}),this.phoneEl=n.cn("input",{type:"tel",className:"inputEx-phoneField-number"}),this.phoneElWrapper.appendChild(this.phoneEl),this.buttonWrapper=e.Node.create('<span class="inputEx-phoneField-buttonWrapper"><button type="button" class="'+this.options.button.className+'">'+this.options.button.label+"</button>"+"</span>"),this.wrapEl.appendChild(this.phoneElWrapper),this.buttonWrapper.appendTo(this.wrapEl),this.button=this.buttonWrapper.one(".inputEx-phoneField-button"),this.button.on("click",this._onPhoneClick,this),this.fieldContainer.appendChild(this.wrapEl)},getValue:function(){return this.phoneEl.value},setValue:function(e,t){this.phoneEl.value=e,n.PhoneField.superclass.setValue.call(this,e,t)},_onPhoneClick:function(e){window.location.href="tel:"+this.phoneEl.value}}),n.registerType("phone",n.PhoneField,[])},"@VERSION@",{requires:["inputex-field","intl"],skinnable:!0,ix_provides:"phone",lang:["fr","en","es","de","ca","it","nl","pt-BR"]});
