sap.ui.define([
	"sap/ui/demo/smartControls/fields/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("sap.ui.demo.smartControls.fields.controller.SmartForm", {
		onInit: function() {
			this.getView().byId("smartFormPage").bindElement("/Products('4711')");
		}
	});

});
