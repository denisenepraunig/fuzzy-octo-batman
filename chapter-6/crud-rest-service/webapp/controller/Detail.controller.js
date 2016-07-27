sap.ui.define([
		"sapui5/demo/restservice/controller/BaseController",
		"sapui5/demo/restservice/model/formatter",
		"sapui5/demo/restservice/model/types"
	], function (BaseController, formatter, types) {
	"use strict";
	return BaseController.extend("sapui5.demo.restservice.controller.Detail", {

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
			var oRouter;
			oRouter = this.getRouter();
			oRouter.attachRoutePatternMatched(this._onObjectMatched, this);
            var oModel = new sap.ui.model.json.JSONModel({
                mode : "view"
            });
            this.getView().setModel(oModel, "viewModel");
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
		
		onEdit : function() {
			var sObjectPath = this.getView().getElementBinding().getPath().substr(1);
			this.getRouter().navTo("edit", {
				id: sObjectPath
			}, true);
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
		    this.sObjectId = oEvent.getParameter("arguments").id;
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
			oView.bindElement("/" + this.sObjectId);
		}
	});
});