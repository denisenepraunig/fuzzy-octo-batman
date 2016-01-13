sap.ui.define([
		"sapui5/demo/odata/filter/sort/controller/BaseController",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"sap/ui/model/Sorter",
		"sap/ui/model/json/JSONModel"
	], function (BaseController, Filter, FilterOperator, Sorter, JSONModel) {
	"use strict";

	return BaseController.extend("sapui5.demo.odata.filter.sort.controller.Master", {
		
		onInit : function() {
			this._sorter = new Sorter("Name", false);

			var oModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oModel, "viewModel");

		},
		onSortProductName : function() {
			this._sorter.bDescending = !this._sorter.bDescending;
			this.getView().byId("productList").getBinding("items").sort(this._sorter);
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