sap.ui.define([
		"sapui5/demo/odata/with/expand/controller/BaseController",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"sap/ui/model/Sorter"
	], function (BaseController, Filter, FilterOperator, Sorter) {
	"use strict";

	return BaseController.extend("sapui5.demo.odata.with.expand.controller.Master", {
		
		onInit : function() {
			this._sorter = new Sorter("ProductName", false);
		},
		onSortProductName : function() {
			this._sorter.bDescending = !this._sorter.bDescending;
			this.getView().byId("productList").getBinding("items").sort(this._sorter);
			
			/* 
			// resuse the current sorter
			var aSorter = [];
			var oListBinding = this.getView().byId("productList").getBinding("items");
			var aListSorters = oListBinding.aSorters;
			var oSorter;
			if (aListSorters.length > 0) {
				oSorter = aListSorters[0];
				oSorter.bDescending = !oSorter.bDescending;
				oListBinding.sort(oSorter);
			}
			*/
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