sap.ui.define([
	"sap/ui/demo/smartControls/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("sap.ui.demo.smartControls.controller.SmartForm", {
		onInit: function() {
			this.getView().byId("smartFormPage").bindElement("/Products('4711')");
		}
	});

});
