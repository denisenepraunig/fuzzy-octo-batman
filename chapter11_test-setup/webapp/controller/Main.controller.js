sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/Device"
], function(Controller, Device) {
	"use strict";

	return Controller.extend("my.app.controller.Main", {
		onInit: function() {
			var sContentDensityClass = "";
			if (jQuery(document.body).hasClass("sapUiSizeCozy") || jQuery(document.body).hasClass("sapUiSizeCompact")) {
				sContentDensityClass = "";
			} else if (!Device.support.touch) { // apply "compact" mode if touch is not supported
				sContentDensityClass = "sapUiSizeCompact";
			} else {
				// "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
				sContentDensityClass = "sapUiSizeCozy";
			}
			this.getView().addStyleClass(sContentDensityClass);
			var oRootControl = this.byId("rootControl");
            this.getOwnerComponent().getModel().metadataLoaded()
                .then(function() {
                    oRootControl.setBusy(false);
                });
            this.getOwnerComponent().getModel().attachMetadataFailed(
                function() {
                    oRootControl.setBusy(false);
            });
		},
		
		backToHome : function() {
		    this.getOwnerComponent().getRouter().navTo("main");
		}
		
		
	});

});