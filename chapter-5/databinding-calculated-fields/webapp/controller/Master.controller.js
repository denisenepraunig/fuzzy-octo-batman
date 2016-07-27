sap.ui.define([
		"sapui5/demo/db/calc/controller/BaseController"
	], function (BaseController) {
	"use strict";

	return BaseController.extend("sapui5.demo.db.calc.controller.Master", {

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit : function () {
            // nothing to do at the moment
		},

		/**
		 * Event handler when a table item gets pressed
		 * @param {sap.ui.base.Event} oEvent the table selectionChange event
		 * @public
		 */
		onListPress : function (oEvent) {
			// The source is the list item that got pressed
			this._showObject(oEvent.getSource());
		},

		/**
		 * Navigates back in the browser history, if the entry was created by this app.
		 * If not, it navigates to the Fiori Launchpad home page
		 *
		 * @public
		 */
		
		// TODO - we don't need FLP stuff...
		onNavBack : function () {
			var oHistory = sap.ui.core.routing.History.getInstance(),
				sPreviousHash = oHistory.getPreviousHash(),
				oCrossAppNavigator = sap.ushell && sap.ushell.Container && sap.ushell.Container.getService("CrossApplicationNavigation");

			if (sPreviousHash !== undefined || !oCrossAppNavigator) {
				// The history contains a previous entry
				window.history.go(-1);
			} else if (oCrossAppNavigator) {
				// Navigate back to FLP home
				// TODO: Test this in a working sandbox, with the current version it is not possible
				oCrossAppNavigator.toExternal({
					target: {shellHash: "#"}
				});
			}
		},

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		/**
		 * Shows the selected item on the object page
		 * On phones a additional history entry is created
		 * @param {sap.m.ObjectListItem} oItem selected Item
		 * @private
		 */
		_showObject : function (oItem) {
			this.getRouter().navTo("detail", {
				ID: oItem.getBindingContext().getProperty("ID")
			});
		}
	});

});