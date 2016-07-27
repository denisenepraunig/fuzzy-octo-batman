sap.ui.define([
	"sap/ui/core/UIComponent",
], function(UIComponent) {
	"use strict";

	return UIComponent.extend("sap.ui.demo.smartControls.fields.Component", {
		metadata: {
			manifest: "json"
		},

		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			
			// create the views based on the url/hash
			this.getRouter().initialize();
		}
	});

});
