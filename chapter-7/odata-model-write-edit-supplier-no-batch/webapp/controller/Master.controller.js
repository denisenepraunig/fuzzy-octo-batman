sap.ui.define([
	"sapui5/demo/odata/readingdata/bestpractice/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function(BaseController, JSONModel, MessageToast, MessageBox) {
	"use strict";

	return BaseController.extend("sapui5.demo.odata.readingdata.bestpractice.controller.Master", {

		onInit: function() {
			
			var oModel = new sap.ui.model.json.JSONModel({
				createMode : true
			});
			this.getView().setModel(oModel, "viewModel");
			
			this.getRouter().getRoute("master").attachPatternMatched(this.onAdd, this);
		},

		onAdd: function() {
			
			// as long as we don't have successfully loaded the metadata
			// we set the view to busy
			this.getView().setBusy(true);
			
			this._oModel = this.getModel();
			this._oModel.metadataLoaded().then(this._onMetadataLoaded.bind(this));
			
			this._oModel.attachMetadataFailed(function(oEvent) {
				var oParams = oEvent.getParameters();
				this._showMetadataError(oParams.message, oParams.statusText);
			}, this);
			
			// general handlers for all OData model events
			// when we don't use the batch mode, we can't attach success/error handlers to
			// the oModel.submitChanges() function call
			
			this._oModel.attachRequestCompleted(function (oEvent) {
				var oParams = oEvent.getParameters();
				
				// if we would create an entry with a malformed ID the request would be "completed",
				// but it is not successful in the end
				if (!oParams.success) {
					console.log("request not successful");
					return;
				}
				
				// attachRequestCompleted will listen for all HTTP methods
				// we are only interested in displaying a popup when we change data (POST method with 204 status code)
				if (oParams && oParams.method === "POST" && oParams.response && oParams.response.statusCode === 204) {
					MessageToast.show("Successfully updated entry!");
				}
				console.log("request completed");
			}, this);
			
			this._oModel.attachRequestFailed(function (oEvent) {
				var oParams = oEvent.getParameters();
				this._showServiceError(oParams.response.message, oParams.response.responseText);
				console.log("request failed");
			}, this);			
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
		
		_onMetadataLoaded: function() {
			this.getView().setBusy(false);
			this._createEntry();
		},

		_createEntry: function() {

			var oModel = this.getModel();

			var oView = this.getView();
			var oContext = oModel.createEntry("Suppliers", {
				success: this._onCreateEntrySuccess.bind(this),
				error: this._onCreateEntryError.bind(this )
			});
			oView.setBindingContext(oContext);
		},

		_onCreateEntrySuccess: function(oObject, oResponse) {
			
			MessageToast.show("Successfully created new entry!");

			var sUri = oObject.__metadata.uri;
			var aUriParts = sUri.split("/");
			var sNewEntry = "/" + aUriParts.pop();

			this.getView().unbindObject();
			this._bindView(sNewEntry);

			console.log("onCreateEntrySuccess");
		},

		_bindView : function (sObjectPath) {
			var oView = this.getView();
			oView.bindElement(sObjectPath);
			oView.getModel("viewModel").setProperty("/createMode", false);
		},

		_onCreateEntryError: function(oError) {
			
			this._showServiceError(oError.message, oError.responseText);
			console.log("onCreateEntryError", oError);
		},

		_getPathInfo: function() {

			var oContext = this.getView().getBindingContext();
			return oContext.getPath();
		},

		onSave: function() {

			var	oModel = this.getModel();
			// submit changes to server
			// the success/error handlers only work in batch mode
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