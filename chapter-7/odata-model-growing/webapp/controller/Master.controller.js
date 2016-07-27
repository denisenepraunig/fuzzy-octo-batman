sap.ui.define([
		"sapui5/demo/odata/growing/controller/BaseController",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator"
	], function (BaseController, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("sapui5.demo.odata.growing.controller.Master", {

		onFilterProducts : function (oEvent) {
			// build the filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
			}
 
			// filter the list via binding
			var oList = this.getView().byId("productList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		}
	});
});