YUI.add("inputex-datatable",function(e,t){var n=e.inputEx;e.namespace("inputEx.Plugin"),n.Plugin.InputExDataTable=function(e){n.Plugin.InputExDataTable.superclass.constructor.call(this,e)},n.Plugin.InputExDataTable.NS="InputExDataTable",e.extend(n.Plugin.InputExDataTable,e.Plugin.Base,{initializer:function(){var e=this.get("host");this.enrichData(),this.enrichColumns(),this.addAddButton(),this.get("disableModifyFunc")||e.delegate("click",this.modifyRecord,"td.inputEx-DataTable-modify",this),this.get("disableDeleteFunc")||e.delegate("click",this.deleteRecord,"td.inputEx-DataTable-delete",this)},enrichData:function(e){var t=this,n=this.get("host").get("data");n.each(function(e){this.get("disableModifyFunc")||t.addModifyAttr(e),this.get("disableDeleteFunc")||t.addDeleteAttr(e)})},enrichColumns:function(){this.get("disableModifyFunc")||this.addModifyColumn(),this.get("disableDeleteFunc")||this.addDeleteColumn()},addAddButton:function(){if(!this.get("disableAddFunc")){var t=e.Node.create("<button id='addButton'>"+this.get("strings").addButtonText+"</button"),n=this.get("panel");this.get("host").get("contentBox").append(t),t.on("click",function(e){n.set("headerContent",this.get("strings").addItemHeader),n.get("field").clear(),n.show()},this)}},modifyRecord:function(e){e.stopPropagation();var t=this.get("host").getRecord(e.currentTarget),n=this.get("panel");n.set("headerContent",this.get("strings").modifyItemHeader),n.get("field").setValue(t.getAttrs()),n.show()},deleteRecord:function(e){e.stopPropagation();var t=this.get("host").getRecord(e.currentTarget);(!this.get("confirmDelete")||confirm(this.get("strings").confirmDeletion))&&this.get("host").get("data").remove(t)},deleteExtraColumns:function(){this.get("disableModifyFunc")||this.removeModifyColumn(),this.get("disableDeleteFunc")||this.removeDeleteColumn()},_initPanel:function(){var t=this,n=new e.inputEx.Panel({centered:!0,width:500,modal:!0,zIndex:5,visible:!1,inputEx:t.get("inputEx"),buttons:[{value:this.get("strings").cancelText,action:function(e){e.preventDefault(),n.hide()}},{value:this.get("strings").saveText,action:function(e){e.preventDefault();var r=t.get("panel").get("field"),i=r.getValue(),s=t.get("host"),o;if(r.validate()){if(i.id)s.get("data").getById(i.id).setAttrs(i);else{i.id=t.generateId(t.get("idSize"));var u=s.get("recordType");o=new u,o.setAttrs(i),t.addModifyAttr(o),t.addDeleteAttr(o),s.get("data").add(o)}n.hide()}}}]});return n.render(),n},destructor:function(){var t=this,n=this.get("host").get("data");n.each(function(e){this.get("disableModifyFunc")||t.delModifyAttr(e),this.get("disableDeleteFunc")||t.delDeleteAttr(e)}),this.deleteExtraColumns(),this.get("disableAddFunc")||e.one("#addButton").remove(),this.get("panel").destroy()},addModifyAttr:function(e){e.addAttr("modify")},addDeleteAttr:function(e){e.addAttr("delete")},delModifyAttr:function(e){e.removeAttr("modify")},delDeleteAttr:function(e){e.removeAttr("delete")},addModifyColumn:function(){this.get("host").addColumn({key:this.get("strings").modifyText,className:"inputEx-DataTable-modify"})},addDeleteColumn:function(){this.get("host").addColumn({key:this.get("strings").deleteText,className:"inputEx-DataTable-delete"})},removeModifyColumn:function(){this.get("host").removeColumn("modify")},removeDeleteColumn:function(){this.get("host").removeColumn("delete")},generateId:function(e){var t=this.get("prefixId"),n=e?e:5;return t=t?t:"",t+Math.floor(Math.random()*Math.pow(10,n))},_initStrings:function(){return e.Intl.get("inputex-datatable")}},{ATTRS:{inputEx:{},prefixId:{value:""},idSize:{value:5},disableAddFunc:{value:!1},disableModifyFunc:{value:!1},disableDeleteFunc:{value:!1},strings:{value:null,valueFn:"_initStrings"},confirmDelete:{value:!0},panel:{valueFn:"_initPanel",lazyAdd:!0}}})},"@VERSION@",{requires:["inputex-group","inputex-panel","datatable"],skinnable:!0,lang:["en","fr","de","ca","es","fr","it","nl"]});