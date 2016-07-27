sap.ui.define([
	"sapui5/demo/odata/readingdata/bestpractice/controller/BaseController",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function(BaseController, MessageToast, MessageBox) {
	"use strict";

	return BaseController.extend("sapui5.demo.odata.readingdata.bestpractice.controller.Master", {

		onInit: function() {

			this.getRouter().getRoute("master").attachPatternMatched(this.onAdd, this);
		},

		_onMetadataLoaded: function() {
			this.getView().setBusy(false);
			this._createEntry();
		},

		onAdd: function() {

			this.getView().setBusy(true);
			
			this._oModel = this.getModel();
			this._oModel.metadataLoaded().then(this._onMetadataLoaded.bind(this));
			
			this._oModel.attachMetadataFailed(function(oEvent) {
				var oParams = oEvent.getParameters();
				this._showMetadataError(oParams.message, oParams.statusText);
			}, this);			
		},
		
		_showServiceError: function(sError, sDetails) {
			if (this._bMessageOpen) {
				return;
			}
			this._bMessageOpen = true;
			MessageBox.error(
				sError, {
					id: "serviceErrorMessageBox",
					details: sDetails,
					actions: [MessageBox.Action.CLOSE],
					onClose: function() {
						this._bMessageOpen = false;
					}.bind(this)
				}
			);
		},		
		
		_showMetadataError: function(sError, sDetails) {
			MessageBox.error(
				sError, {
					id: "metadataErrorMessageBox",
					details: sDetails,
					actions: [MessageBox.Action.RETRY, MessageBox.Action.CLOSE],
					onClose: function(sAction) {
						if (sAction === MessageBox.Action.RETRY) {
							this._oModel.refreshMetadata();
						}
					}.bind(this)
				}
			);
		},			

		_createEntry: function() {

			var oModel = this.getModel();
			var that = this;

			var oView = that.getView();
			var oContext = oModel.createEntry("Suppliers", {
				success: that._onCreateEntrySuccess.bind(that),
				error: that._onCreateEntryError.bind(that)
			});
			oView.setBindingContext(oContext);
		},

		_onCreateEntrySuccess: function(oObject) {
			
			MessageToast.show("Successfully created new entry!");
			console.log("onCreateEntrySuccess");
		},
		_onCreateEntryError: function(oError) {
			
			this._showServiceError(oError.message, oError.responseText);
			console.log("onCreateEntryError", oError);
		},

		_getPathInfo: function() {

			if (!this._sPath) {
				var oPage = this.getView().getBindingContext();

				this._sPath = oPage.getBindingContext().getPath();
			}
			return this._sPath;
		},

		onSave: function() {

			var	oModel = this.getModel();
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