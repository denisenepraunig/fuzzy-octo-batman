sap.ui.define([
		"sapui5/demo/mvcapp/controller/BaseController",
		"sapui5/demo/mvcapp/model/formatter",
		"sapui5/demo/mvcapp/model/types"
	], function (BaseController, formatter, types) {
	"use strict";
	return BaseController.extend("sapui5.demo.mvcapp.controller.Detail", {

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
			this.getRouter().getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
			this._sorter = new sap.ui.model.Sorter("id", false);
			this._filter = new sap.ui.model.Filter("Allergenics", sap.ui.model.FilterOperator.EQ, "");
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
		
		onNavUp : function() {
		    //this.getRouter().navTo("detail", {id: sID});
		},
		
		onEdit : function() {
			var sObjectPath = this.getView().getElementBinding().getPath();
			this.getRouter().getTargets().display("edit", {
				mode: "update",
				objectPath: sObjectPath
			});
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
		    this.sObjectID = oEvent.getParameter("arguments").id;
			this.sObjectPath = "/suppliers/" + this.sObjectID;
			this.getModel().read("/destinations/learnui5"+ this.sObjectPath + "/products", this.sObjectPath, "products");
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