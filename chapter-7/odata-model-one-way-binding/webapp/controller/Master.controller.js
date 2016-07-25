sap.ui.define([
		"sapui5/demo/odata/readingdata/bestpractice/controller/BaseController"
	], function (BaseController) {
	"use strict";

	return BaseController.extend("sapui5.demo.odata.readingdata.bestpractice.controller.Master", {
		
		_getPathInfo: function() {
			
			if (!this._sPath) {
				var oPage = this.getView().byId("productInfo");
				
				// "/Products(1)/ProductName
				this._sPath = oPage.getBindingContext().getPath();
			}
			return this._sPath;
		},
		
		onChange: function() {
			
			var oModel = this.getModel();
			var sPath = this._getPathInfo() + "/ProductName";
			var sNewValue = this.getView().byId("newProductName").getValue();
			
			if (!sNewValue) {
				return;
			}
			oModel.setProperty(sPath, sNewValue);
			
			// should be true
			console.log("After setProperty: Model has pending changes:", oModel.hasPendingChanges());
			
			// should contain the ProductName change
			console.log("Pending changes:", oModel.getPendingChanges());
		},
		
		onReset: function() {
			
			var oModel = this.getModel(); 
			var sPath = this._getPathInfo();
			oModel.resetChanges([sPath]);
			
			// should be false
			console.log("After reset: Model has pending changes:", oModel.hasPendingChanges());
			
			// should contain an empty object
			console.log("Pending changes:", oModel.getPendingChanges());
		}
	});
});