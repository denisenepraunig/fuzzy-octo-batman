sap.ui.define([
		"sapui5/demo/odata/filter/sort/controller/BaseController",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"sap/ui/model/Sorter"
	], function (BaseController, Filter, FilterOperator, Sorter) {
	"use strict";

	return BaseController.extend("sapui5.demo.odata.filter.sort.controller.Master", {
		
		onInit : function() {
			this._sorter = new Sorter("ProductName", false);
		},
		onSortProductName : function() {
			this._sorter.bDescending = !this._sorter.bDescending;
			this.getView().byId("productList").getBinding("items").sort(this._sorter);
		},
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