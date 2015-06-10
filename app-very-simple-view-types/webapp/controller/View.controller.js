sap.ui.define([
		"sap/ui/core/mvc/Controller"
	], function (Controller) {
	"use strict";

	return Controller.extend("sapui5.demo.viewtypes.controller.View", {
	    onPress: function() {
	        alert("Hello World!");
	    }
	});
});