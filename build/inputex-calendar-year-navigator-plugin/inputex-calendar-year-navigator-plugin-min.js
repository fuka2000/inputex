YUI.add("inputex-calendar-year-navigator-plugin",function(e,t){e.Plugin.CalendarYearNavigator=e.Base.create("CalendarYearNavigator",e.Plugin.Base,[],{initializer:function(){this.get("host").get("rendered")?this._initHeaders():this.afterHostMethod("renderUI",this._initHeaders)},_initHeaders:function(){var t=this.get("host").get("contentBox"),n=t.all(".yui3-calendar-header-label");n.addClass("yui3-calendar-clickable-header-label"),t.delegate("click",e.bind(this.onHeaderClick,this),".yui3-calendar-clickable-header-label")},onHeaderClick:function(){var t=this.get("strings"),n=this,r,i,s,o;this.panel_container||(this.panel_container=e.Node.create('<div class="yui3-calendar-navplugin-widget"></div>'),r=this.get("host").get("contentBox"),r.append(this.panel_container),i=e.Node.create('<div class="yui3-widget-bd"></div>'),this.panel_container.append(i),s=(new e.Panel({headerContent:t.select,srcNode:this.panel_container,visible:!1,centered:r,modal:!0,hideOn:[{node:e.one("document"),eventName:"key",keyCode:"esc"},{node:this.get("host").get("boundingBox"),eventName:["mousedownoutside","mouseupoutside"]}],buttons:[{value:t.ok,section:e.WidgetStdMod.FOOTER,classNames:"ok-button",action:e.bind(this.saveAndHidePanel,this)},{value:t.cancel,section:e.WidgetStdMod.FOOTER,action:e.bind(this.cancelAndHidePanel,this)}]})).render(),o=new e.inputEx.Group({parentEl:i,fields:[{type:"select",name:"month",label:t.month,choices:this._prepareMonthsData()},{name:"year",label:t.year,required:!0,showMsg:!0,maxLength:4,size:4,regexp:/^[0-9]{4}$/}]}),this.get("host").get("boundingBox").on("keyup",function(e){n._isPanelVisible()&&e.keyCode===13&&n.saveAndHidePanel(e)}),this.set("panel",s),this.set("inputexGroup",o),e.one(".yui3-widget-mask").setStyle("position","absolute")),this.showPanel()},saveAndHidePanel:function(e){e.halt(!0);if(this.validateFormInPanel()){var t=this.get("host").get("date"),n=this.get("inputexGroup").getValue();t.setMonth(n.month),n.year&&t.setFullYear(n.year),this.get("host").set("date",t),this.hidePanel()}},cancelAndHidePanel:function(e){e.halt(!0),this.hidePanel()},validateFormInPanel:function(){return this.get("inputexGroup").validate()},hidePanel:function(){this.get("panel").hide()},showPanel:function(){var e=this.get("host").get("date");this.get("inputexGroup").setValue({month:e.getMonth(),year:e.getFullYear()}),this.get("panel").show()},_prepareMonthsData:function(){var e=0,t,n=this.get("strings").monthsList,r=[];for(e=0;e<12;e++)t=n[e],r.push({label:t,value:e});return r},_isPanelVisible:function(){var e=this.get("panel");return e?e.get("visible"):!1}},{ATTRS:{strings:{valueFn:function(){return e.Intl.get("inputex-calendar-year-navigator-plugin")}},panel:{},inputexGroup:{}},NS:"yearNavigator"})},"@VERSION@",{requires:["intl","node-base","node-event-delegate","plugin","panel","inputex-group","inputex-select","inputex-string"],skinnable:!0,lang:["en","fr","de","es","ca","it","nl","pt-BR"]});
