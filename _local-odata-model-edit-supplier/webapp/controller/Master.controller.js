sap.ui.define([
	"sapui5/demo/odata/readingdata/bestpractice/controller/BaseController",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function(BaseController, MessageToast, MessageBox) {
	"use strict";

	return BaseController.extend("sapui5.demo.odata.readingdata.bestpractice.controller.Master", {

		onInit: function() {

			this.getRouter().getRoute("master").attachPatternMatched(this.onEdit, this);
		},

		onEdit: function() {

			this._bindView("/Suppliers(1)");
		},

		_onBatchRequestCompleted: function(oEvent) {

			var oParams = oEvent.getParameters();
			if(!oParams.success) {
				this._onEditError();
				return;
			}

			MessageToast.show("Successfully edited entry!");

			console.log("onUpdateEntrySuccess");
		},

		_bindView : function (sObjectPath) {
			var oView = this.getView();
			oView.bindElement(sObjectPath);
		},

		_onEditError: function(oError) {
			
			MessageBox.error(
				"Error updating entry: " + oError.statusCode + " (" + oError.statusText + ")",
				{
					details: oError.responseText
				}
			);
			console.log("onEditEntryError", oError);
		},

		_getPathInfo: function() {

			var oContext = this.getView().getBindingContext();
			return oContext.getPath();
		},

		onSave: function() {

			var	oModel = this.getModel();
			
			oModel.attachEventOnce("batchRequestCompleted", this._onBatchRequestCompleted.bind(this));
			// submit changes to server
			oModel.submitChanges();
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