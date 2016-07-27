sap.ui.define([
		"sapui5/demo/multifilters/controller/BaseController",
		"sapui5/demo/multifilters/model/formatter",
		"sapui5/demo/multifilters/model/types",
		"sap/m/MessageToast"
	], function (BaseController, formatter, types, MessageToast) {
	"use strict";
	return BaseController.extend("sapui5.demo.multifilters.controller.Detail", {

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
		/**
		 * Navigates to the Edit view for this object
		 * @function
		 */
		onEdit : function() {
			var sObjectPath = this.getView().getElementBinding().getPath().substr(1);
			this.getRouter().navTo("edit", {
				id: sObjectPath
			}, true);
		},
		/**
		 * Invokes delete for supplier
		 * @function
		 */
		 onDelete : function() {
		 	var oModel = this.getModel(),
		 		sLocalPath = this.getView().getElementBinding().getPath(),
		 		oObject = oModel.getProperty(sLocalPath),
		 		that = this;
	 		
		 	oModel.deleteEntry("/destinations/learnui5/suppliers/" + oObject.id, sLocalPath);

		 	oModel.attachEventOnce("requestCompleted", function(){
				that.getRouter().navTo("master");
			}, this);

			oModel.attachEventOnce("requestFailed", function(){
				MessageToast.show(that.getResourceBundle().getText("updateFailed"));
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