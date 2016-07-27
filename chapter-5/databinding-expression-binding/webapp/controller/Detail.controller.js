sap.ui.define([
		"sapui5/demo/db/exp/controller/BaseController",
		"sapui5/demo/db/exp/model/formatter",
		"sapui5/demo/db/exp/model/types"
	], function (BaseController, formatter, types) {
	"use strict";
	return BaseController.extend("sapui5.demo.db.exp.controller.Detail", {

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
			this._sorter = new sap.ui.model.Sorter("ID", false);
			//this._filter = new sap.ui.model.Filter("Allergenics", sap.ui.model.FilterOperator.Contains, "Milk");
			this._filter = new sap.ui.model.Filter("Allergenics", sap.ui.model.FilterOperator.EQ, "");
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
		 * Sorts the products table after ID
		 * @function
		 */
		onSortID:  function(){
            this._sorter.bDescending = !this._sorter.bDescending;
            this.getView().byId("table").getBinding("items").sort(this._sorter);
		},

        onFilterProducts: function(oEvent) {
            if(oEvent.getParameters("selected")){
                this.getView().byId("table").getBinding("items").filter(this._filter);
            } else {
                //when the checkbox is unchecked, we want to remove the filter
                this.getView().byId("table").getBinding("items").filter(null);
            }
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
			var sObjectPath = "/Suppliers/" + oEvent.getParameter("arguments").ID;
			this._bindView(sObjectPath);
		},

		/**
		 * Binds the view to the object path.
		 *
		 * @function
		 * @param {string} sObjectPath path to the object to be bound
		 * @private
		 */
		_bindView : function (sObjectPath) {
			var oView = this.getView();
			oView.bindElement(sObjectPath);
		}
	});
});