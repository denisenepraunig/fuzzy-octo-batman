sap.ui.define([
	"sapui5/demo/odata/readingdata/bestpractice/controller/BaseController",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function(BaseController, MessageToast, MessageBox) {
	"use strict";

	return BaseController.extend("sapui5.demo.odata.readingdata.bestpractice.controller.Master", {

		onInit: function() {

			this.getRouter().getRoute("master").attachPatternMatched(this.onAdd, this);
			// this.getModel() of BaseController does not work here!
			this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetadataLoaded.bind(this));
		},

		_onMetadataLoaded: function() {

			this._bMetadtaLoaded = true;
			if (this._bRoutingReady) {
				this._createEntry();
			}
		},

		onAdd: function() {

			this._bRoutingReady = true;

			if (this._bMetadtaLoaded) {
				this._createEntry();
			}
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