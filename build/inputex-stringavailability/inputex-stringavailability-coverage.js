if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/inputex-stringavailability/inputex-stringavailability.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-stringavailability/inputex-stringavailability.js",
    code: []
};
_yuitest_coverage["build/inputex-stringavailability/inputex-stringavailability.js"].code=["YUI.add('inputex-stringavailability', function (Y, NAME) {","","/**"," * @module inputex-stringavailability"," */","  var lang=Y.Lang,","      inputEx = Y.inputEx;","","/**"," * String field that sends an Ajax request to check if it is available"," * it can be useful for email availability for example"," * @class inputEx.StringAvailability"," * @extends inputEx.StringField"," * @constructor"," * @param {Object} options "," */","inputEx.StringAvailability = function(options) {","   inputEx.StringAvailability.superclass.constructor.call(this,options);","};","","Y.extend(inputEx.StringAvailability, inputEx.StringField, {","","   /**","    * @method setOptions","    * @param {Object} options Options object as passed to the constructor","    */","    setOptions: function(options) {","      inputEx.StringAvailability.superclass.setOptions.call(this, options);","      ","      // I18N","      this.messages = Y.mix(this.messages,Y.Intl.get(\"inputex-stringavailability\"));","","      // Server URI","      this.options.uri = options.uri;","","      // Messages","      this.messages.stringLoading = (options.messages && options.messages.stringLoading) ? options.messages.stringLoading : this.messages.stringLoading;","      this.messages.stringAvailable = (options.messages && options.messages.stringAvailable) ? options.messages.stringAvailable : this.messages.stringAvailable;","      this.messages.stringUnAvailable = (options.messages && options.messages.stringUnAvailable) ? options.messages.stringUnAvailable : this.messages.stringUnAvailable;","      this.messages.errorDataText = (options.messages && options.messages.errorDataText) ? options.messages.errorDataText : this.messages.errorDataText;","      ","      // Must hide default Msg to do it custom","      this.options.showMsg = false;","      ","      // Status of AJAX","      this.isRequesting = false;","   },","   ","   /**","    * @method render","    */","   render: function() {","      inputEx.StringAvailability.superclass.render.call(this);","      ","      // Must do it after renderComponent else this.fieldContainer isn't attached to a DOM element","      // DOM.insertAfter(this.availabilityDiv, this.fieldContainer);","","      Y.one(this.fieldContainer).insert(this.availabilityDiv,'after');","","      ","","   },","   ","   /**","    * @method renderComponent","    */","   renderComponent: function() {","      inputEx.StringAvailability.superclass.renderComponent.call(this);    ","      ","      this.availabilityDiv = inputEx.cn('div', {'className':'availabilityDiv'});","      this.availabilityDivIcon = inputEx.cn('div', {'className':'icon'});","      this.availabilityDivText = inputEx.cn('div', {'className':'text'});","      ","      this.availabilityDiv.appendChild(this.availabilityDivIcon);","      this.availabilityDiv.appendChild(this.availabilityDivText);","      this.availabilityDiv.appendChild(inputEx.cn('div', {'className':'clear'}));","      ","   },","   ","   /**","    * @method initEvents","    */","   initEvents: function() {","      inputEx.StringAvailability.superclass.initEvents.call(this);","   },","","   /**","    * @method onKeyPress","    */","   onKeyPress: function(e) {","      // Dont listen for TAB key","      if ( e.keyCode === 9 ) { return; }","      ","      this.isRequesting = true;","      ","      // Must do this to wait that value is updated (for the getValue())","      lang.later(0, this, function(){","","      // If field is empty","      if(this.getValue() === ''){","         this.stopTimer();","         this.setAvailabilityState(this.options.required ? \"required\" : \"none\");","         return;","      }","","      this.resetTimer();","      this.setAvailabilityState(\"loading\");","      ","   });","   },","   ","   /**","    * @method resetTimer","    */","   resetTimer: function() {","      this.stopTimer();","      this.startTimer();","   },","   ","   /**","    * @method startTimer","    */","   startTimer: function() {","      var that = this;","      this.timerId = setTimeout(function(){","         that.getAvailability(that.getValue());","      },500);","   },","   ","   /**","    * @method stopTimer","    */","   stopTimer: function() {","      if(this.timerId){","         clearTimeout(this.timerId);","         delete this.timerId;","      }","   },","   ","   /**","    * What to do when the string is available","    * @method onAvailable","    */","    onAvailable: function(){","      this.setAvailabilityState(\"available\");","      this.isAvailable = true;","      this.isRequesting = false;","   },","   ","   /**","    * What to do when the string is NOT available","    * @method onUnavailable","    */","    onUnavailable: function(){","      this.setAvailabilityState(\"unavailable\");","      this.isAvailable = false;","      this.isRequesting = false;","   },","   /**","    * Problem during the request","    * @method onFailure","    */","   onFailure : function(){","      this.setAvailabilityState(\"fail\");","      this.isAvailable = false;","      this.isRequesting = false;","   },","","   /**","    * @method setAvailabilityState","    */","   setAvailabilityState: function(state) {","","      if(state === \"none\"){","         this.availabilityDivText.innerHTML = '';","         Y.one(this.availabilityDiv).set('className','availabilityDiv');","         this.availabilityDiv.style.display = 'none';","         return;","      }","      else if(state === \"loading\"){","         this.availabilityDivText.innerHTML = this.messages.stringLoading;","      }","      else if(state === \"available\"){","         this.availabilityDivText.innerHTML = this.messages.stringAvailable;","      }","      else if(state === \"unavailable\"){","         this.availabilityDivText.innerHTML = this.messages.stringUnAvailable;","      }","      else if(state === \"required\"){","         this.availabilityDivText.innerHTML = this.messages.required;","      }","      else if(state === \"fail\"){","         this.availabilityDivText.innerHTML = this.messages.errorDataText;","      }","      ","      // DOM.setAttribute(this.availabilityDiv, 'class', 'availabilityDiv '+state);","      Y.one(this.availabilityDiv).set('className','availabilityDiv'+' '+state);","      this.availabilityDiv.style.display = 'block';","      ","   },","   ","   /**","    * @method setClassFromState","    */","   setClassFromState: function(){","      inputEx.StringAvailability.superclass.setClassFromState.call(this);","      ","      var state = this.getState();","      ","      if(state === \"required\"){","         this.setAvailabilityState(state);","      }","   },","   ","   /**","    * @method validate","    */","   validate: function() {","","      // If AJAX request running","      if ( !!this.isRequesting ) { return false; }","      ","      var valid = inputEx.StringAvailability.superclass.validate.call(this);","      if(!lang.isUndefined(this.isAvailable)){","         valid = this.isAvailable && valid;","      }","      ","      return valid;","   },","   ","   /**","    * Perform the Ajax request","    * @method getAvailability","    */","    getAvailability: function(string) {","","var   that = this,","      requestConfiguration = {","         data : {","            \"availabilityRequest\" : string","         },","         on : {","             success: function(id, o) {   ","","            var obj = Y.JSON.parse(o.responseText);","            ","            if(obj === \"true\" || !!obj){","               that.onAvailable();","            }","            else if(obj === \"false\" || !obj){","               that.onUnavailable();","            }","         },","         failure: function(id, o) {","            // TODO ?","            that.onFailure(o);","         }","         }","      };","","      Y.io(this.options.uri,requestConfiguration);","","   }","});","","// Register this class as \"string-availability\" type","inputEx.registerType(\"string-availability\", inputEx.StringAvailability);   ","","","}, '@VERSION@', {\"requires\": [\"inputex-string\", \"event-key\", \"io\", \"json-parse\"], \"skinnable\": true, \"lang\": [\"en\", \"fr\", \"de\", \"es\", \"fr\", \"it\", \"nl\"]});"];
_yuitest_coverage["build/inputex-stringavailability/inputex-stringavailability.js"].lines = {"1":0,"6":0,"17":0,"18":0,"21":0,"28":0,"31":0,"34":0,"37":0,"38":0,"39":0,"40":0,"43":0,"46":0,"53":0,"58":0,"68":0,"70":0,"71":0,"72":0,"74":0,"75":0,"76":0,"84":0,"92":0,"94":0,"97":0,"100":0,"101":0,"102":0,"103":0,"106":0,"107":0,"116":0,"117":0,"124":0,"125":0,"126":0,"134":0,"135":0,"136":0,"145":0,"146":0,"147":0,"155":0,"156":0,"157":0,"164":0,"165":0,"166":0,"174":0,"175":0,"176":0,"177":0,"178":0,"180":0,"181":0,"183":0,"184":0,"186":0,"187":0,"189":0,"190":0,"192":0,"193":0,"197":0,"198":0,"206":0,"208":0,"210":0,"211":0,"221":0,"223":0,"224":0,"225":0,"228":0,"237":0,"245":0,"247":0,"248":0,"250":0,"251":0,"256":0,"261":0,"267":0};
_yuitest_coverage["build/inputex-stringavailability/inputex-stringavailability.js"].functions = {"StringAvailability:17":0,"setOptions:27":0,"render:52":0,"renderComponent:67":0,"initEvents:83":0,"(anonymous 2):97":0,"onKeyPress:90":0,"resetTimer:115":0,"(anonymous 3):125":0,"startTimer:123":0,"stopTimer:133":0,"onAvailable:144":0,"onUnavailable:154":0,"onFailure:163":0,"setAvailabilityState:172":0,"setClassFromState:205":0,"validate:218":0,"success:243":0,"failure:254":0,"getAvailability:235":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-stringavailability/inputex-stringavailability.js"].coveredLines = 85;
_yuitest_coverage["build/inputex-stringavailability/inputex-stringavailability.js"].coveredFunctions = 21;
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 1);
YUI.add('inputex-stringavailability', function (Y, NAME) {

/**
 * @module inputex-stringavailability
 */
  _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 6);
var lang=Y.Lang,
      inputEx = Y.inputEx;

/**
 * String field that sends an Ajax request to check if it is available
 * it can be useful for email availability for example
 * @class inputEx.StringAvailability
 * @extends inputEx.StringField
 * @constructor
 * @param {Object} options 
 */
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 17);
inputEx.StringAvailability = function(options) {
   _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "StringAvailability", 17);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 18);
inputEx.StringAvailability.superclass.constructor.call(this,options);
};

_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 21);
Y.extend(inputEx.StringAvailability, inputEx.StringField, {

   /**
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
    setOptions: function(options) {
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "setOptions", 27);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 28);
inputEx.StringAvailability.superclass.setOptions.call(this, options);
      
      // I18N
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 31);
this.messages = Y.mix(this.messages,Y.Intl.get("inputex-stringavailability"));

      // Server URI
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 34);
this.options.uri = options.uri;

      // Messages
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 37);
this.messages.stringLoading = (options.messages && options.messages.stringLoading) ? options.messages.stringLoading : this.messages.stringLoading;
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 38);
this.messages.stringAvailable = (options.messages && options.messages.stringAvailable) ? options.messages.stringAvailable : this.messages.stringAvailable;
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 39);
this.messages.stringUnAvailable = (options.messages && options.messages.stringUnAvailable) ? options.messages.stringUnAvailable : this.messages.stringUnAvailable;
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 40);
this.messages.errorDataText = (options.messages && options.messages.errorDataText) ? options.messages.errorDataText : this.messages.errorDataText;
      
      // Must hide default Msg to do it custom
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 43);
this.options.showMsg = false;
      
      // Status of AJAX
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 46);
this.isRequesting = false;
   },
   
   /**
    * @method render
    */
   render: function() {
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "render", 52);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 53);
inputEx.StringAvailability.superclass.render.call(this);
      
      // Must do it after renderComponent else this.fieldContainer isn't attached to a DOM element
      // DOM.insertAfter(this.availabilityDiv, this.fieldContainer);

      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 58);
Y.one(this.fieldContainer).insert(this.availabilityDiv,'after');

      

   },
   
   /**
    * @method renderComponent
    */
   renderComponent: function() {
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "renderComponent", 67);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 68);
inputEx.StringAvailability.superclass.renderComponent.call(this);    
      
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 70);
this.availabilityDiv = inputEx.cn('div', {'className':'availabilityDiv'});
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 71);
this.availabilityDivIcon = inputEx.cn('div', {'className':'icon'});
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 72);
this.availabilityDivText = inputEx.cn('div', {'className':'text'});
      
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 74);
this.availabilityDiv.appendChild(this.availabilityDivIcon);
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 75);
this.availabilityDiv.appendChild(this.availabilityDivText);
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 76);
this.availabilityDiv.appendChild(inputEx.cn('div', {'className':'clear'}));
      
   },
   
   /**
    * @method initEvents
    */
   initEvents: function() {
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "initEvents", 83);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 84);
inputEx.StringAvailability.superclass.initEvents.call(this);
   },

   /**
    * @method onKeyPress
    */
   onKeyPress: function(e) {
      // Dont listen for TAB key
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "onKeyPress", 90);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 92);
if ( e.keyCode === 9 ) { return; }
      
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 94);
this.isRequesting = true;
      
      // Must do this to wait that value is updated (for the getValue())
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 97);
lang.later(0, this, function(){

      // If field is empty
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "(anonymous 2)", 97);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 100);
if(this.getValue() === ''){
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 101);
this.stopTimer();
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 102);
this.setAvailabilityState(this.options.required ? "required" : "none");
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 103);
return;
      }

      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 106);
this.resetTimer();
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 107);
this.setAvailabilityState("loading");
      
   });
   },
   
   /**
    * @method resetTimer
    */
   resetTimer: function() {
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "resetTimer", 115);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 116);
this.stopTimer();
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 117);
this.startTimer();
   },
   
   /**
    * @method startTimer
    */
   startTimer: function() {
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "startTimer", 123);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 124);
var that = this;
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 125);
this.timerId = setTimeout(function(){
         _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "(anonymous 3)", 125);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 126);
that.getAvailability(that.getValue());
      },500);
   },
   
   /**
    * @method stopTimer
    */
   stopTimer: function() {
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "stopTimer", 133);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 134);
if(this.timerId){
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 135);
clearTimeout(this.timerId);
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 136);
delete this.timerId;
      }
   },
   
   /**
    * What to do when the string is available
    * @method onAvailable
    */
    onAvailable: function(){
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "onAvailable", 144);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 145);
this.setAvailabilityState("available");
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 146);
this.isAvailable = true;
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 147);
this.isRequesting = false;
   },
   
   /**
    * What to do when the string is NOT available
    * @method onUnavailable
    */
    onUnavailable: function(){
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "onUnavailable", 154);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 155);
this.setAvailabilityState("unavailable");
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 156);
this.isAvailable = false;
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 157);
this.isRequesting = false;
   },
   /**
    * Problem during the request
    * @method onFailure
    */
   onFailure : function(){
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "onFailure", 163);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 164);
this.setAvailabilityState("fail");
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 165);
this.isAvailable = false;
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 166);
this.isRequesting = false;
   },

   /**
    * @method setAvailabilityState
    */
   setAvailabilityState: function(state) {

      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "setAvailabilityState", 172);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 174);
if(state === "none"){
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 175);
this.availabilityDivText.innerHTML = '';
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 176);
Y.one(this.availabilityDiv).set('className','availabilityDiv');
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 177);
this.availabilityDiv.style.display = 'none';
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 178);
return;
      }
      else {_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 180);
if(state === "loading"){
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 181);
this.availabilityDivText.innerHTML = this.messages.stringLoading;
      }
      else {_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 183);
if(state === "available"){
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 184);
this.availabilityDivText.innerHTML = this.messages.stringAvailable;
      }
      else {_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 186);
if(state === "unavailable"){
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 187);
this.availabilityDivText.innerHTML = this.messages.stringUnAvailable;
      }
      else {_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 189);
if(state === "required"){
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 190);
this.availabilityDivText.innerHTML = this.messages.required;
      }
      else {_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 192);
if(state === "fail"){
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 193);
this.availabilityDivText.innerHTML = this.messages.errorDataText;
      }}}}}}
      
      // DOM.setAttribute(this.availabilityDiv, 'class', 'availabilityDiv '+state);
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 197);
Y.one(this.availabilityDiv).set('className','availabilityDiv'+' '+state);
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 198);
this.availabilityDiv.style.display = 'block';
      
   },
   
   /**
    * @method setClassFromState
    */
   setClassFromState: function(){
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "setClassFromState", 205);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 206);
inputEx.StringAvailability.superclass.setClassFromState.call(this);
      
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 208);
var state = this.getState();
      
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 210);
if(state === "required"){
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 211);
this.setAvailabilityState(state);
      }
   },
   
   /**
    * @method validate
    */
   validate: function() {

      // If AJAX request running
      _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "validate", 218);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 221);
if ( !!this.isRequesting ) { return false; }
      
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 223);
var valid = inputEx.StringAvailability.superclass.validate.call(this);
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 224);
if(!lang.isUndefined(this.isAvailable)){
         _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 225);
valid = this.isAvailable && valid;
      }
      
      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 228);
return valid;
   },
   
   /**
    * Perform the Ajax request
    * @method getAvailability
    */
    getAvailability: function(string) {

_yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "getAvailability", 235);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 237);
var   that = this,
      requestConfiguration = {
         data : {
            "availabilityRequest" : string
         },
         on : {
             success: function(id, o) {   

            _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "success", 243);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 245);
var obj = Y.JSON.parse(o.responseText);
            
            _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 247);
if(obj === "true" || !!obj){
               _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 248);
that.onAvailable();
            }
            else {_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 250);
if(obj === "false" || !obj){
               _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 251);
that.onUnavailable();
            }}
         },
         failure: function(id, o) {
            // TODO ?
            _yuitest_coverfunc("build/inputex-stringavailability/inputex-stringavailability.js", "failure", 254);
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 256);
that.onFailure(o);
         }
         }
      };

      _yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 261);
Y.io(this.options.uri,requestConfiguration);

   }
});

// Register this class as "string-availability" type
_yuitest_coverline("build/inputex-stringavailability/inputex-stringavailability.js", 267);
inputEx.registerType("string-availability", inputEx.StringAvailability);   


}, '@VERSION@', {"requires": ["inputex-string", "event-key", "io", "json-parse"], "skinnable": true, "lang": ["en", "fr", "de", "es", "fr", "it", "nl"]});
