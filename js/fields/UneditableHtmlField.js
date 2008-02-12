/**
 * Create a uneditable field where you can stick the html you want
 * Added Options
 * <ul>
 *    <li>formatValue: String function(value)</li>
 *    <li>formatDom: DOMEl function(value)</li>
 * </ul>
 *
 * @class inputEx.UneditableHtmlField
 * @constructor
 * @extends inputEx.Field
 */
inputEx.UneditableHtmlField = function(options) {
	inputEx.UneditableHtmlField.superclass.constructor.call(this,options);
};
YAHOO.lang.extend(inputEx.UneditableHtmlField, inputEx.Field, {
   
   render: function() {
      this.divEl = document.createElement('DIV');
   },
   
   initEvents: function() {},
   
   setValue: function(val) {
      this.value = val;
      if(this.options.formatValue) {
         this.divEl.innerHTML = this.options.formatValue(val);
      }
      else if(this.options.formatDom) {
         var r = this.options.formatDom(val);
         this.divEl.innerHTML = "";
         if(r) this.divEl.appendChild(r);
      }
      else {
         this.divEl.innerHTML = val;
      }
   },
   
   getValue: function() {
      return this.value;
   }
   
});
