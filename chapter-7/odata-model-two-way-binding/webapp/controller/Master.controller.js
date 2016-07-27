sap.ui.define([
		"sapui5/demo/odata/twoway/controller/BaseController"
	], function (BaseController) {
	"use strict";

	return BaseController.extend("sapui5.demo.odata.twoway.controller.Master", {

		_getPathInfo: function() {
			
			if (!this._sPath) {
				var oPage = this.getView().byId("productInfo");
				
				// "/Products(1)/ProductName
				this._sPath = oPage.getBindingContext().getPath();
			}
			return this._sPath;
		},
		
		onCheck: function() {
			
			var oModel = this.getModel();
			var sPath = this._getPathInfo();
			var oData = oModel.getData(sPath);
			
			// model data
			console.log("Model data:", oData);
			
			// should be true
			console.log("Model has pending changes:", oModel.hasPendingChanges());
			
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