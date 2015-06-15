sap.ui.define([
		"sap/ui/core/mvc/Controller"
	], function (Controller) {
	"use strict";

	return Controller.extend("sapui5.demo.mvcapp.controller.Master", {
	    
	    onListPress : function(oEvent) {
            
            // option 1: change value of sPageId to new ID hardcoded
            // var sPageId = "appview—detailPage";
            // option 2: change of sPageId to new ID dynamically
            var sPageId = oApp.getPages()[1].getId();
            oApp.to(sPageId);
            
            var oPage = oApp.getPage(sPageId);
            var oContext = oEvent.getSource().getBindingContext();
		    oPage.setBindingContext(oContext);
        }
	});
});

// is not really good...
// var sPageId = this.createId("detailPage");
// we are already tight coupled