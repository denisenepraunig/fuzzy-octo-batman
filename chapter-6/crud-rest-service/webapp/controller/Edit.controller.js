sap.ui.define([
		"sapui5/demo/restservice/controller/BaseController",
		"sapui5/demo/restservice/model/types",
		"sap/ui/model/json/JSONModel",
		"sap/m/MessageToast"
	], function (BaseController, formatter, types, JSONModel, MessageToast) {
	"use strict";
	return BaseController.extend("sapui5.demo.restservice.controller.Edit", {

        formatter: formatter,
        types: types,
		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit : function () {
			var oRouter, oViewModel;
			oRouter = this.getRouter();
			oViewModel = new JSONModel({
				"createMode": false
			});
			this.getView().setModel(oViewModel, "viewModel");
			
			oRouter.attachRoutePatternMatched(this._onRouteMatched, this);
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		/**
		 * Navigates back to the Master
		 * @function
		 */
		onNavPress : function () {
			this.myNavBack("master");
		},
		
		/**
		 * Saves changes to the remote service
		 * @function
		 */
		onSave: function(){
			var sLocalPath,
				sUrl = "", 
				oRouter = this.getRouter(),
				sPath = this.getView().getElementBinding().getPath(),
				oModel = this.getModel(),
				oObject = oModel.getProperty(sPath),
				oBundle = this.getResourceBundle();
			
			//check if we're in edit or createMode
			if(!this.getModel("viewModel").getProperty("/createMode")){
				//we're not, so we update an existing entry
				sUrl = "/Suppliers/" + oObject.id;
				sLocalPath = sPath;
			} else {
				sUrl = "/Suppliers";
			}
			oModel.attachEventOnce("requestCompleted", function(){
				oRouter.navTo("master");
				this.getModel("viewModel").setProperty("/createMode", false);
			}, this);
			oModel.attachEventOnce("requestFailed", function(){
				MessageToast.show(oBundle.getText("updateFailed"));
			});
			oModel.saveEntry(oObject, sUrl, sLocalPath);
		},
		
		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		/**
		 * Binds the view to the object path.
		 *
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_onRouteMatched : function (oEvent) {
			var oEventData = oEvent.getParameter("arguments");
			if (oEvent.getParameter("name")==="master"){
			    return;
			}
			if(oEventData && oEventData.id){
				this.sObjectPath = "/" + oEventData.id;
			} else {
				this.getView().getModel("viewModel").setProperty("/createMode", true);
				this.getModel().createEntry("/");
				this.sObjectPath = "/createEntry";
			}
			this._bindView();
		},

		/**
		 * Binds the view to the object path.
		 *
		 * @function
		 * @param {string} sObjectPath path to the object to be bound
		 * @private
		 */
		_bindView : function () {
			var oView = this.getView();
			oView.bindElement(this.sObjectPath);
		}
	});
});