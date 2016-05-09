sap.ui.define([
	"sap/ui/demo/smartControls/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("sap.ui.demo.smartControls.controller.Master", {
		onInit: function() {
			this.getView().byId("page").bindElement("/Products('1')");
		}
	});

});
