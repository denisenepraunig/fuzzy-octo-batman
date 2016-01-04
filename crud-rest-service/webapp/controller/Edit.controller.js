sap.ui.define([
		"sapui5/demo/mvcapp/controller/BaseController",
		"sapui5/demo/mvcapp/model/formatter",
		"sapui5/demo/mvcapp/model/types"
	], function (BaseController, formatter, types) {
	"use strict";
	return BaseController.extend("sapui5.demo.mvcapp.controller.Edit", {

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
			var oRouter, oTarget;
			oRouter = this.getRouter();
			oTarget = oRouter.getTarget("edit");
			oTarget.attachDisplay(this._onObjectMatched, this);
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
			var sPath = this.getView().getElementBinding().getPath();
			var oModel = this.getModel();
			var oObject = oModel.getProperty(sPath);
			oModel.saveEntry(oObject, sPath);
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
		_onObjectMatched : function (oEvent) {
			this.sObjectPath = oEvent.getParameter("data").objectPath;
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