sap.ui.define([
    "sap/ui/core/mvc/Controller"
    ], function(Controller) {
        
        return Controller.extend("my.app.controller.Detail", {
            
            onInit : function() {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("detail").attachPatternMatched(this.onDetailRouteHit.bind(this));
                
            },
            
            onDetailRouteHit : function(oEvent) {
                var sID =  oEvent.getParameter("arguments").BusinessPartnerID;
                this.getView().getModel().metadataLoaded().then(function(){
                    var sObjectPath = this.getView().getModel().createKey("BusinessPartnerSet", {
                        BusinessPartnerID : sID
                    });
                    this.getView().bindElement({
                        path: "/" + sObjectPath/*,
                        events: {
                            dataReceived: function(oData){
                                if(!oData.getParameter("data")){
                                    this.oRouter.getTargets().display("objectNotAvailable");    
                                }
                            }.bind(this)
                        }*/
                    });    
                }.bind(this));
            }

        });
});