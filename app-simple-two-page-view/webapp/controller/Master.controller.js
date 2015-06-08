sap.ui.define([
		"sap/ui/core/mvc/Controller"
	], function (Controller) {
	"use strict";

	return Controller.extend("sapui5.demo.mvcapp.controller.Master", {
	    
	    onListPress : function(oEvent) {
                
            var sPageId = "detailPage";
            oApp.to(sPageId);
            
            var oPage = oApp.getPage(sPageId);
            var oContenxt = oEvent.getSource().getBindingContext();
		    oPage.setBindingContext(oContenxt);
        }
	});
});

// would be possible, but we still have
// global oApp, and who knows for sure
// that we getParent will return sap.m.App
// var oApp = this.getView().getParent();