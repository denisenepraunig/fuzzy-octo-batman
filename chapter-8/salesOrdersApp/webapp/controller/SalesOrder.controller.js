sap.ui.define([
    "sap/ui/core/mvc/Controller"
    ], function(Controller){
        
        return Controller.extend("sales.order.app.controller.SalesOrder", {
            
            onInit : function() {
                this.getOwnerComponent().getRouter().getRoute("salesOrder").attachPatternMatched(function(oEvent) {
            	    var that = this;
            	    var sSalesOrderID = oEvent.getParameter("arguments").SalesOrderID;
            	    this.getView().getModel().metadataLoaded().then(function(){
                	    var sObjectPath = that.getView().getModel().createKey("SalesOrderSet", {
    						SalesOrderID : sSalesOrderID
    					});
                	    that.getView().bindElement({
                	        path : "/" + sObjectPath,
                	        parameters : {
                	            expand : "ToLineItems"
                	        }
                	    });
            	    });
            	}.bind(this));
            },
            
            onNavBack : function() {
                history.go(-1);
            }
        });
    });