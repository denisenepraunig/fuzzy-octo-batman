sap.ui.define([
	"sapui5/demo/customcontrols/controller/BaseController",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function(BaseController, MessageToast, MessageBox) {
	"use strict";

	return BaseController.extend("sapui5.demo.customcontrols.controller.Master", {

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
			var that = this;

			var oView = that.getView();
			var oContext = oModel.createEntry("Suppliers", {
				success: that._onCreateEntrySuccess.bind(that),
				error: that._onCreateEntryError.bind(that)
			});
			oView.setBindingContext(oContext);
		},

		_onCreateEntrySuccess: function(oObject) {
			console.log("onCreateEntrySuccess");
		},
		_onCreateEntryError: function(oObject) {
			console.log("onCreateEntryError");
		},

		_getPathInfo: function() {

			if (!this._sPath) {
				var oPage = this.getView().getBindingContext();

				this._sPath = oPage.getBindingContext().getPath();
			}
			return this._sPath;
		},

		_onCreateSuccess: function(oObject, oRequest) {
			console.log("Success");
		},

		_onCreateError: function(oError) {
			console.log("onCreateError");
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