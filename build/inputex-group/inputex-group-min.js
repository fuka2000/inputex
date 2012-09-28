YUI.add("inputex-group",function(e,t){var n=e.Lang,r=e.inputEx;r.Group=function(e){r.Group.superclass.constructor.call(this,e),this.options.value||this.runFieldsInteractions()},e.extend(r.Group,r.Field,{setOptions:function(e){r.Group.superclass.setOptions.call(this,e),this.options.className=e.className||"inputEx-Group",this.options.fields=e.fields,this.options.flatten=e.flatten,this.options.legend=e.legend||"",this.options.collapsible=n.isUndefined(e.collapsible)?!1:e.collapsible,this.options.collapsed=n.isUndefined(e.collapsed)?!1:e.collapsed,this.options.disabled=n.isUndefined(e.disabled)?!1:e.disabled,this.inputs=[],this.inputsNames={}},render:function(){this.divEl=r.cn("div",{className:this.options.className}),this.options.id&&(this.divEl.id=this.options.id),this.renderFields(this.divEl),this.options.disabled&&this.disable()},renderFields:function(e){this.fieldset=r.cn("fieldset"),this.legend=r.cn("legend",{className:"inputEx-Group-legend"});if(this.options.collapsible){var t=r.cn("div",{className:"inputEx-Group-collapseImg"},null," ");this.legend.appendChild(t),r.sn(this.fieldset,{className:"inputEx-Expanded"})}!n.isUndefined(this.options.legend)&&this.options.legend!==""&&this.legend.appendChild(r.cn("span",null,null," "+this.options.legend)),(this.options.collapsible||!n.isUndefined(this.options.legend)&&this.options.legend!=="")&&this.fieldset.appendChild(this.legend);if(!this.options.fields)throw new Error("Missing 'fields' property in options");for(var i=0;i<this.options.fields.length;i++){var s=this.options.fields[i];if(!s)throw new Error("inputEx.Form: One of the provided fields is undefined ! (check trailing comma)");this.addField(s)}this.options.collapsed&&this.toggleCollapse(),e.appendChild(this.fieldset)},addField:function(e){var t=this.renderField(e);this.fieldset.appendChild(t.getEl())},renderField:function(t){var i=r(t,this);return this.inputs.push(i),i.options.name&&(this.inputsNames[i.options.name]=i),i.options.flatten&&n.isObject(i.inputsNames)&&(e.mix(this.inputsNames,i.inputsNames),this.inputs=this.inputs.concat(i.inputs)),!this.hasInteractions&&t.interactions&&(this.hasInteractions=!0),i.on("updated",this.onChange,this),i},initEvents:function(){this.options.collapsible&&e.on("click",this.toggleCollapse,this.legend,this)},toggleCollapse:function(){e.one(this.fieldset).hasClass("inputEx-Expanded")?e.one(this.fieldset).replaceClass("inputEx-Expanded","inputEx-Collapsed"):e.one(this.fieldset).replaceClass("inputEx-Collapsed","inputEx-Expanded")},validate:function(){var e=!0;for(var t=0;t<this.inputs.length;t++){var n=this.inputs[t];if(!n.isDisabled()){var i=n.getState();n.setClassFromState(i);if(i==r.stateRequired||i==r.stateInvalid)e=!1}}return e},getFieldsStates:function(){var e,t,n,i,s={fields:{},validate:!0};for(var o=0;o<this.inputs.length;o++){e=this.inputs[o],t=e.options.name,n=e.getState(),i=e.getStateString(n),s.fields[t]={},s.fields[t].valid=!0,s.fields[t].message=i;if(n==r.stateRequired||n==r.stateInvalid)s.fields[t].valid=!1,s.validate=!1}return s},enable:function(){for(var e=0;e<this.inputs.length;e++)this.inputs[e].enable()},disable:function(){for(var e=0;e<this.inputs.length;e++)this.inputs[e].disable()},setValue:function(e,t){if(!e)return;for(var r=0;r<this.inputs.length;r++){var i=this.inputs[r],s=i.options.name;s&&!n.isUndefined(e[s])?i.setValue(e[s],!1):i.clear(!1)}this.runFieldsInteractions(),t!==!1&&this.fireUpdatedEvt()},getValue:function(){var t={};for(var r=0;r<this.inputs.length;r++){var i=this.inputs[r].getValue();this.inputs[r].options.name&&(this.inputs[r].options.flatten&&n.isObject(i)?e.mix(t,i):t[this.inputs[r].options.name]=i)}return t},close:function(){for(var e=0;e<this.inputs.length;e++)this.inputs[e].close()},focus:function(){this.inputs.length>0&&this.inputs[0].focus()},getFieldByName:function(e){return this.inputsNames.hasOwnProperty(e)?this.inputsNames[e]:null},findFieldByName:function(e,t){var r=this,i,s;if(t){if(this.inputsNames.hasOwnProperty(e)&&(s=this.inputsNames[e]))for(var o,u=this.inputs,a=0,f=u.length;a<f;++a){o=u[a];if(n.isFunction(o.getFieldByName)&&(s=o.getFieldByName(e,!0)))break}return s}while((i=r.getParentField())&&n.isFunction(i.getFieldByName))r=i;return r.getFieldByName(e,!0)},onChange:function(e,t){this.runInteractions(t,e),this.fireUpdatedEvt()},runAction:function(e,t){var r=this.getFieldByName(e.name);if(n.isFunction(r[e.action]))r[e.action].call(r);else{if(!n.isFunction(e.action))throw new Error("action "+e.action+" is not a valid action for field "+e.name);e.action.call(r,t)}},runInteractions:function(e,t){var i=r.indexOf(e,this.inputs),s=this.options.fields[i];if(n.isUndefined(s.interactions))return;var o=s.interactions;for(var u=0;u<o.length;u++){var a=o[u];if(a.valueTrigger===t)for(var f=0;f<a.actions.length;f++)this.runAction(a.actions[f],t)}},runFieldsInteractions:function(){if(this.hasInteractions)for(var e=0;e<this.inputs.length;e++)this.runInteractions(this.inputs[e],this.inputs[e].getValue())},clear:function(e){for(var t=0;t<this.inputs.length;t++)this.inputs[t].clear(!1);e!==!1&&this.fireUpdatedEvt()},setErrors:function(t){var r,i;if(n.isArray(t))for(r=0;r<t.length;r++)i=t[r][0],value=t[r][1],this.inputsNames[i]&&this.inputsNames[i].options.showMsg&&(this.inputsNames[i].displayMessage(value),e.one(this.inputsNames[i].divEl).replaceClass("inputEx-valid","inputEx-invalid"));else if(n.isObject(t))for(i in t)t.hasOwnProperty(i)&&this.inputsNames[i]&&this.inputsNames[i].options.showMsg&&(this.inputsNames[i].displayMessage(t[i]),e.one(this.inputsNames[i].divEl).replaceClass("inputEx-valid","inputEx-invalid"))},setFieldName:function(e){var t=this.inputs.length;for(var n=0;n<t;n++)this.inputs[n].setFieldName(e+""+(this.inputs[n].el&&this.inputs[n].el.name||"group-"+n))},destroy:function(){var e,t,n;for(e=0,t=this.inputs.length;e<t;e++)n=this.inputs[e],n.destroy();r.Group.superclass.destroy.call(this)}}),r.registerType("group",r.Group,[{type:"string",label:"Name",name:"name",value:""},{type:"string",label:"Legend",name:"legend"},{type:"boolean",label:"Collapsible",name:"collapsible",value:!1},{type:"boolean",label:"Collapsed",name:"collapsed",value:!1},{type:"list",label:"Fields",name:"fields",elementType:{type:"type"}}],!0)},"@VERSION@",{requires:["inputex-field"],ix_provides:"group",skinnable:!0});
