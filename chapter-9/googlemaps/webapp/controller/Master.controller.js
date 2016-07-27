sap.ui.define([
	"sapui5/demo/googlemaps/controller/BaseController",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel"
], function(BaseController, MessageToast, MessageBox, JSONModel) {
	"use strict";

	return BaseController.extend("sapui5.demo.googlemaps.controller.Master", {

		onInit: function() {
		    var oModel = new JSONModel({
		        edit: true
		    });
		    this.setModel(oModel, "viewModel");
			this.getRouter().getRoute("master").attachPatternMatched(this.onAdd, this);
			// this.getModel() of BaseController does not work here!
			this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetadataLoaded.bind(this));
			this._supplierPanel = this.byId("SupplierPanel");
			this._showEdit();
		},
		
		_showEdit: function(){
		    if (!this._editFragment){
                this._editFragment = sap.ui.xmlfragment("sapui5.demo.googlemaps.view.EditSupplier");
		      }
		      this._supplierPanel.removeAllContent();
		      this._supplierPanel.addContent(this._editFragment);
		},
		
		_showDisplay: function(){
	      if (!this._displayFragment){
	          this._displayFragment = sap.ui.xmlfragment("sapui5.demo.googlemaps.view.DisplaySupplier");
	      }
	      this._supplierPanel.removeAllContent();
	      this._supplierPanel.addContent(this._displayFragment);
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
				this._sPath = oPage.getPath();
			}
			return this._sPath;
		},

		_onCreateSuccess: function(oObject, oRequest) {
			console.log("Success");
		},

		_onCreateError: function(oError) {
			console.log("onCreateError");
		},
		
		onEdit: function(){
		  this.getModel("viewModel").setProperty("/edit", true);  
		  this._showEdit();
		},

		onSave: function() {
			var	oModel = this.getModel();
			// submit changes to server
			oModel.submitChanges();
			this.getModel("viewModel").setProperty("/edit", false);
			this._showDisplay();
		},

		onReset: function() {

			var oModel = this.getModel();
			var sPath = this._getPathInfo();
			oModel.resetChanges([sPath]);

			// should be false
			console.log("After reset: Model has pending changes:", oModel.hasPendingChanges());

			// should contain an empty object
			console.log("Pending changes:", oModel.getPendingChanges());
			this.getModel("viewModel").setProperty("edit", false);
		}
	});

});