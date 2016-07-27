sap.ui.define([
	"sap/ui/demo/smartControls/form/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("sap.ui.demo.smartControls.form.controller.Master", {
		onInit: function() {
			this.getView().byId("page").bindElement("/Products('1')");
		}
	});

});