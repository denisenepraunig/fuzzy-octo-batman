sap.ui.define([
		"sapui5/demo/db/mod/controller/BaseController",
		"sapui5/demo/db/mod/model/formatter",
		"sapui5/demo/db/mod/model/types"
	], function (BaseController, formatter, types) {
	"use strict";
	return BaseController.extend("sapui5.demo.db.mod.controller.Detail", {

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
			this._filter = new sap.ui.model.Filter("Allergenics", sap.ui.model.FilterOperator.EQ, "");
            var oModel = new sap.ui.model.json.JSONModel({
                buttonPrev: false,
                buttonNext: false
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
		
		onPageUp : function(oEvent) {
			var sID = oEvent.getSource().getBindingContext().sPath;
			sID = parseInt(sID.substr(sID.lastIndexOf("/")+1));
			sID = sID-1;
		    this.getRouter().navTo("detail", {ID: sID});
		},
		
		onPageDown : function(oEvent) {
			var sID = oEvent.getSource().getBindingContext().sPath;
			sID = parseInt(sID.substr(sID.lastIndexOf("/")+1));
			sID += 1;
		    this.getRouter().navTo("detail", {ID: sID});
		},

		/**
		 * Sorts the products table after ID
		 * @function
		 */
		onSortID:  function(){
            this._sorter.bDescending = !this._sorter.bDescending;
            this.getView().byId("table").getBinding("items").sort(this._sorter);
		},

        /**
		 * Filters the products table for products containing no allergenics
		 * @function
		 */
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
		    this.sObjectID = oEvent.getParameter("arguments").ID;
			this.sObjectPath = "/Suppliers/" + this.sObjectID;
			this._bindView();
			this._updateViewModel();
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
		},
		
		/**
		 * Updates the view model according to whether there are previous and/or next suppliers.
		 *
		 * @function
		 * @param {string} sObjectID path to the current supplier object
		 * @private
		 */		
		_updateViewModel : function() {
		    //find out if there is a next object in the line:
		    var oModel = this.getView().getModel();
		    var that = this;
		    var oViewModel = that.getView().getModel("viewModel");
    		var nextObjectId = parseInt(that.sObjectID) + 1;
    		var prevObjectId = parseInt(that.sObjectID) - 1;
    		// simply check if there is a next object by adding +1 to the supplier id. 
    		//We just assume we get a field we can safely order by from the server
    		var bNext = !!oModel.getProperty("/Suppliers/" + nextObjectId);
    		var bPrev = !!oModel.getProperty("/Suppliers/" + prevObjectId);
    		oViewModel.setProperty("/buttonNext", bNext);
    		oViewModel.setProperty("/buttonPrev", bPrev);
		}
	});
});