sap.ui.define([
	"sapui5/demo/odata/writeeditdelete/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function(BaseController, JSONModel, MessageToast, MessageBox) {
	"use strict";

	return BaseController.extend("sapui5.demo.odata.writeeditdelete.controller.Master", {

		onInit: function() {

			var oModel = new sap.ui.model.json.JSONModel({
				createMode : true
			});
			this.getView().setModel(oModel, "viewModel");

			this.getRouter().getRoute("master").attachPatternMatched(this.onAdd, this);

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
		
		_onMetadataLoaded: function() {
			this.getView().setBusy(false);
			this._createEntry();
		},


		_onRequestCompleted: function(oEvent) {

			var oParams = oEvent.getParameters();
			if(!oParams.success) {
				this._onEditError();
				return;
			}

			MessageToast.show("Successfully edited entry!");

			console.log("onUpdateEntrySuccess");
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
			this.getView().getModel("viewModel").setProperty("/createMode", false);
		},

		_onCreateEntryError: function(oError) {

			MessageBox.error(
				"Error creating entry: " + oError.statusCode + " (" + oError.statusText + ")",
				{
					details: oError.responseText
				}
			);
			console.log("onCreateEntryError", oError);
		},

		_getPathInfo: function() {

			var oContext = this.getView().getBindingContext();
			return oContext.getPath();
		},

		onSave: function() {

			var	oModel = this.getModel();

			var bCreateMode = this.getView().getModel("viewModel").getProperty("/createMode");
			
			// if we are in edit mode (!createMode), attach the succeess/fail handlers
			if (!bCreateMode) {
				oModel.attachEventOnce("requestCompleted", this._onRequestCompleted.bind(this));
			}

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
		},

		_onDeleteEntrySuccess : function() {

			var oView = this.getView();
			MessageToast.show("Successfully deleted entry!");

			oView.unbindObject();
			this._createEntry();
			console.log("onDeleteEntrySuccess");

			this.getView().getModel("viewModel").setProperty("/createMode", true);
		},

		_onDeleteEntryError : function (oError) {

			MessageBox.error(
				"Error deleting entry: " + oError.statusCode + " (" + oError.statusText + ")",
				{
					details: oError.responseText
				}
			);
			console.log("onDeleteEntryError", oError);
		},

		onDelete: function() {

			var oModel = this.getModel();
			var sPath = this._getPathInfo();

			oModel.remove(sPath, {
				success: this._onDeleteEntrySuccess.bind(this),
				error: this._onDeleteEntryError.bind(this)
			});
		}
	});

});