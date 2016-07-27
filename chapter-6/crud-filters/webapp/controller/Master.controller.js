sap.ui.define([
		"sapui5/demo/crudfilters/controller/BaseController",
		"sap/ui/model/Sorter",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator"
	], function (BaseController, Sorter,Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("sapui5.demo.crudfilters.controller.Master", {

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit : function () {
			this._IDSorter = new Sorter("id", false);
			this._NameSorter = new Sorter("Name", false);
			this._suppliersFilter = new Filter({
					path:"products", 
					test : function(value) {
						if(value && value.length > 0){
							return true; 
						}
					}
			});
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
		
		onNavBack : function () {
				// The history contains a previous entry
				window.history.go(-1);
		},
		
		onAddSupplier : function(){
			this.getRouter().navTo("edit");
		},
		
		onSortID:  function(){
		  this._IDSorter.bDescending = !this._IDSorter.bDescending;
		  this.byId("table").getBinding("items").sort(this._IDSorter);
		},

		onSortName :  function(){
		  this._NameSorter.bDescending = !this._NameSorter.bDescending;
		  this.byId("table").getBinding("items").sort(this._NameSorter);
		},
		
		onFilterSuppliers : function(oEvent){
			var oTable = this.getView().byId("table"), 
				oTableBinding = oTable.getBinding("items"),
				aFilters = [];
			if(oEvent.getParameters("selected").selected){
				aFilters.push(this._suppliersFilter);
				oTableBinding.filter(aFilters);
			} else {
				//unset the filter
				oTableBinding.aFilters = null;
				oTable.getModel().refresh();
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
			var oBindingContext = oItem.getBindingContext();
			this.getRouter().navTo("detail", {
				id: oBindingContext.getPath().substr(1)
			});
		}
	});

});