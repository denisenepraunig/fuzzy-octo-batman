sap.ui.define([
		"sap/ui/core/mvc/Controller"
	], function (Controller) {
	"use strict";

	return Controller.extend("sapui5.demo.mvcapp.controller.Master", {
	    
	    onListPress : function(oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var oItem = oEvent.getSource();
            oRouter.navTo("detail", {
				ID: oItem.getBindingContext().getProperty("ID")
			});
        }
	});
});
