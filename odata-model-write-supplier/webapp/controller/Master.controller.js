sap.ui.define([
		"sapui5/demo/odata/readingdata/bestpractice/controller/BaseController"
	], function (BaseController) {
	"use strict";

	return BaseController.extend("sapui5.demo.odata.readingdata.bestpractice.controller.Master", {

		onInit: function() {
			
			this.getRouter().getRoute("master").attachPatternMatched(this.onAdd, this);
			
			// this.getModel() of BaseController does really NOT work...
			this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetadataLoaded.bind(this));
		},
		
		_onMetadataLoaded: function() {
			
			this._bMetadtaLoaded = true;
			console.log("metadata loaded");
			
			if (this._bRoutingReady) {
				this._createEntry();
			}
		},
		
		onAdd: function() {
			
			this._bRoutingReady = true;
			console.log("routing ready");
			
			if (this._bMetadtaLoaded) {
				this._createEntry();
			}
		},
		
		_createEntry: function() {
			
			var oModel = this.getModel();
			var that = this;
			
			var oView = that.getView();
				var oContext = oModel.createEntry("Suppliers", {
					success : that._onCreateEntrySuccess.bind(that),
					error : that._onCreateEntryError.bind(that) 
				});
				oView.setBindingContext(oContext);
		},
		
		
		_getPathInfo: function() {
			
			if (!this._sPath) {
				var oPage = this.getView().getBindingContext();
				
				this._sPath = oPage.getBindingContext().getPath();
			}
			return this._sPath;
		},
		
		_onCreateEntrySuccess : function(oObject, oRequest) {

			// unbind the view to not show this object again...
			//this.getView().unbindObject();
			console.log("onCreateEntrySuccess");

		},
		
		
		_onCreateSuccess : function(oObject, oRequest) {

			// unbind the view to not show this object again...
			//this.getView().unbindObject();
			console.log("Success");

		},
		
		_onCreateError: function(oError) {
			
			console.log("onCreateError");	
		},
		
		_onCreateEntryError : function(oObject) {
			
			console.log("onCreateEntryError");
		},

		
		onSave:  function() {

			var that = this,
				oComponent = this.getOwnerComponent(),
				oBundle = this.getResourceBundle(),
				oModel = this.getModel();

				// attach to the request completed event of the batch
				oModel.attachEventOnce("batchRequestCompleted", function(oEvent){
					var oParams = oEvent.getParameters();
					if(oParams.success) {
						that._onCreateSuccess();
					} else {
						that._onCrudError(); // never tested this ... central error handler maybe better here....
					}
				});
		
			// submit changes to server
			oModel.submitChanges();
			
		},
		
		onReset: function() {
			
			var oModel = this.getModel(); 
			// var sPath = this._getPathInfo();
			//oModel.resetChanges([sPath]);
			
			this.onAdd();
			
			// should be false
			console.log("After reset: Model has pending changes:", oModel.hasPendingChanges());
			
			// should contain an empty object
			console.log("Pending changes:", oModel.getPendingChanges());
		}
	});

});