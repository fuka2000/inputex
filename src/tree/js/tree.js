/**
 * @module inputex-tree
 */
    var lang = Y.Lang,
        inputEx = Y.inputEx;

    /**
     * Meta field to create trees
     * @class inputEx.TreeField
     * @extends inputEx.ListField
     * @constructor
     * @param {Object} options inputEx.Field options object
     */
    inputEx.TreeField = function (options) {
        inputEx.TreeField.superclass.constructor.call(this, options);
    };
    Y.extend(inputEx.TreeField, inputEx.ListField, {

        setOptions: function (options) {
            inputEx.TreeField.superclass.setOptions.call(this, options);
            this.options.useButtons = true; // force useButtons options (for onDelete to work)
        },

        /**
         * Adds a new line to the List Field
         * @method renderSubField
         * @param {Any} value Value of the subelement
         * @return  {inputEx.Field} instance of the created field (inputEx.Field or derivative)
         */
        renderSubField: function (value) {

            // Div that wraps the deleteButton + the subField
            var newDiv = inputEx.cn('div');

            // Delete button
            var delButton = inputEx.cn('img', {
                src: inputEx.spacerUrl,
                className: 'inputEx-ListField-delButton'
            });
            Y.one(delButton).on('click', this.onDelete, this);
            newDiv.appendChild(delButton);

            var el = new inputEx.TreeField({
                parentNode: this,
                elementType: this.options.elementType,
                value: value
            });
            var subFieldEl = el.getEl();
            Y.one(subFieldEl).setStyle('marginLeft', '4px');
            Y.one(subFieldEl).setStyle('float', 'left');
            newDiv.appendChild(subFieldEl);

            // Subscribe the onChange event to resend it
            el.on('updated', this.onChange, this);

            // Line breaker
            newDiv.appendChild(inputEx.cn('div', null, {
                clear: "both"
            }));

            //this.divEl.appendChild(newDiv);
            this.childContainer.appendChild(newDiv);

            return el;
        },


        /**
         * Render the addButton and childContainer
         * @method renderComponent
         */
        renderComponent: function () {

            // Add element button
            this.addButton = inputEx.cn('img', {
                src: inputEx.spacerUrl,
                className: 'inputEx-ListField-addButton'
            });
            Y.one(this.addButton).setStyle('float', 'left');
            this.fieldContainer.appendChild(this.addButton);

            // Instanciate the new subField
            this.subField = inputEx(this.options.elementType, this);

            var subFieldEl = this.subField.getEl();
            Y.one(subFieldEl).setStyle('marginLeft', '4px');
            Y.one(subFieldEl).setStyle('float', 'left');
            this.fieldContainer.appendChild(subFieldEl);

            // Line breaker
            this.fieldContainer.appendChild(inputEx.cn('div', null, {
                clear: "both"
            }, this.options.listLabel));


            // Div element to contain the children
            this.childContainer = inputEx.cn('div', {
                className: 'inputEx-ListField-childContainer'
            });
            this.fieldContainer.appendChild(this.childContainer);
        },

        /**
         * Set the value
         * @method setValue
         * @param {Any} obj The tree object
         * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
         */
        setValue: function (obj, sendUpdatedEvt) {
            this.subField.setValue(obj.value, false);
            inputEx.TreeField.superclass.setValue.call(this, obj.childValues, sendUpdatedEvt);
        },

        /**
         * Get the value
         * @method getValue
         * @return {Any} The tree object
         */
        getValue: function () {
            var obj = {
                value: this.subField.getValue(),
                childValues: inputEx.TreeField.superclass.getValue.call(this)
            };
            return obj;
        }

    });

    // Register this class as "tree" type
    inputEx.registerType("tree", inputEx.TreeField);
