sap.ui.define([
		"sapui5/demo/odata/function/importsimple/controller/BaseController",
		"sap/ui/model/json/JSONModel"
	], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("sapui5.demo.odata.function.importsimple.controller.Master", {
		
		onInit : function() {

			var oModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oModel, "viewModel");
		},

		onGetProductsByRating : function (oEvent) {

			var oODataModel = this.getModel();

			var sQuery = oEvent.getParameter("query");

			var mParameters = {
				"rating": sQuery
			};

			oODataModel.callFunction("/GetProductsByRating", 
				{ 
					method:"GET", 
					urlParameters: mParameters, 
					success: fnSuccess.bind(this), 
					error: fnError.bind(this)
				}
			);

			function fnError(oError) {
				console.log("error", oError);
			}
			
			function fnSuccess(oData, oResponse) {

				if (oData) {
					var oViewModel = this.getModel("viewModel");
					oViewModel.setData({ Products: oData.results });
				}
			}
		}
	});
});