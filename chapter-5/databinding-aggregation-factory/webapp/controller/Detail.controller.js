sap.ui.define([
		"sapui5/demo/db/af/controller/BaseController",
		"sapui5/demo/db/af/model/formatter",
		"sapui5/demo/db/af/model/types",
		"sap/ui/layout/VerticalLayout"
	], function (BaseController, formatter, types, VerticalLayout) {
	"use strict";
	return BaseController.extend("sapui5.demo.db.af.controller.Detail", {

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
			this._createProductsAggregation();
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
		},

		/**
		 * Creates the line items for the products table using a factory.
		 *
		 * @function
		 * @private
		 */
		_createProductsAggregation: function () {
            var oTable = this.getView().byId("table");

            oTable.bindAggregation("items", "Products", function(sId, oContext){
                var sAllergenics = oContext.getProperty("Allergenics");
                var oColumnListItem = new sap.m.ColumnListItem(sId);
                oColumnListItem.addCell(new sap.m.ObjectIdentifier({
                  text: "{ID}"
                }));

                if (sAllergenics) {
                    // we have found allergenics, so we provide a VerticalLayout instead
                    // of just displaying the product name. The VerticalLayout then takes
                    // the product name plus the allergenics into its own content aggregation
                    oColumnListItem.addCell(new VerticalLayout({
                      content: [
                          new sap.m.Text({
                            text: "{Name}"
                          }),
                          new sap.m.Text({
                            text: "{Allergenics}"
                          })
                      ]
                    }));
                } else {
                    // no allergenics there, we display the name as usual
                    oColumnListItem.addCell(new sap.m.ObjectIdentifier({
                      text: "{Name}"
                    }));
                }

                oColumnListItem.addCell(new sap.m.ObjectNumber({
                  number: "{Price}",
                  unit: "USD"
                }));
                return oColumnListItem;
            });
		}
	});
});