YUI.add("inputex-integer",function(e,t){YUI.add("inputex-integer",function(e){var t=e.Lang,n=e.inputEx;n.IntegerField=function(e){n.IntegerField.superclass.constructor.call(this,e)},e.extend(n.IntegerField,n.StringField,{setOptions:function(e){n.IntegerField.superclass.setOptions.call(this,e),this.options.negative=t.isUndefined(e.negative)?!1:e.negative,this.options.min=t.isUndefined(e.min)?this.options.negative?-Infinity:0:parseInt(e.min,10),this.options.max=t.isUndefined(e.max)?Infinity:parseInt(e.max,10)},getValue:function(){var e;return e=n.IntegerField.superclass.getValue.call(this),e===""?"":parseInt(e,10)},validate:function(){var e=this.getValue(),t=n.IntegerField.superclass.getValue.call(this);return e===""?!this.options.required:isNaN(e)?!1:!!t.match(/^[\+\-]?[0-9]+$/)&&(this.options.negative?!0:e>=0)&&e>=this.options.min&&e<=this.options.max}}),n.registerType("integer",n.IntegerField,[{type:"boolean",label:"Accept negative",name:"negative",value:!1}])},"3.1.0",{requires:["inputex-string"]})},"@VERSION@");