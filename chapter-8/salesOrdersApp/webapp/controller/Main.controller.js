sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/Device",
	"sap/ui/model/Filter"
], function(Controller, Device, Filter) {
	"use strict";

	return Controller.extend("sales.order.app.controller.Main", {
        
        onInit : function() {
        	var sContentDensityClass = "";
        	if (jQuery(document.body).hasClass("sapUiSizeCozy") || jQuery(document.body).hasClass("sapUiSizeCompact")) {
				sContentDensityClass = "";
			} else if (!Device.support.touch) { // apply "compact" mode if touch is not supported
				sContentDensityClass = "sapUiSizeCompact";
			} else {
				// "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
				sContentDensityClass = "sapUiSizeCozy";
			}
			this.getView().addStyleClass(sContentDensityClass);
        },
        
        onTableUpdateFinished : function(oEvent) {
            var sTitle = "Sales Orders",
                oTable = this.getView().byId("table");
            // catch cases where the backend is not supporting remote count
            if(oTable.getBinding("items").isLengthFinal()) {
                    var iCount = oEvent.getParameter("total"),
                        iItems = oTable.getItems().length;
                sTitle += " (" + iItems + "/" + iCount + ")";
            }
            this.getView().byId("title").setText(sTitle);                                                  
        },
        
        onSearch : function(oEvent) {
            var sSearchValue = oEvent.getSource().getValue(),
                aFilters = [];
            if(sSearchValue.length > 0) {
                var oFilterName = new Filter("CustomerName", sap.ui.model.FilterOperator.Contains, sSearchValue);
                var oFilterID = new Filter("SalesOrderID", sap.ui.model.FilterOperator.Contains, sSearchValue);
                aFilters.push(new Filter({filters : [oFilterID, oFilterName], And : false}));
            }
            this.getView().byId("table").getBinding("items").filter(aFilters, "Application");
        },
        
        onItemPress : function(oEvent) {
            var sSalesOrderId = oEvent.getSource().getBindingContext().getProperty("SalesOrderID");
            this.getOwnerComponent().getRouter().navTo("salesOrder", {
                SalesOrderID : sSalesOrderId
            }, false);
        },
		onCustomerPressed: function(oEvent) {
			var BusinessParnterId = oEvent.getSource().data().id;
			var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
			oCrossAppNavigator.toExternal({
				target: {
					semanticObject: "BusinessPartner",
					action: "display"
				},
				params: {
				    BusinessPartner : BusinessParnterId
				}
			}); 
		}
        
	});
});