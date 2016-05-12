sap.ui.define([
    "sap/ui/core/mvc/Controller"
    ], function(Controller) {
        
        return Controller.extend("my.app.controller.Master", {
            
            onInit : function() {
                this.oList = this.byId("list");
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("detail").attachEvent("patternMatched", this.onDetailRouteHit.bind(this));
                this.oRouter.getRoute("main").attachEventOnce("patternMatched", this.onMasterRouteHit.bind(this));
                
                var that = this;
                this.oListBindingPromise = new Promise(
                    function(resolve, reject) {
                        that.getView().addEventDelegate({
                            onBeforeFirstShow: function() {
        					    that.oList.getBinding("items").attachEventOnce("dataReceived", function(oEvent) {
                                    if(!oEvent.getParameter("data")){
                                        reject();
                                    } else {
                                        resolve();
                                    }
                                }, this);
				            }.bind(that)
                        });
                    }    
                ).catch( function() {
                    this.oRouter.getTargets.daisplay("notFound");
                }.bind(this));
            },
            
            onItemPressed : function(oEvent) {
                var oItem = oEvent.getParameter("listItem"); // || oEvent.getSource();
                var sID = oItem.getBindingContext().getProperty("BusinessPartnerID");
                this.oRouter.navTo("detail", {
                    BusinessPartnerID : sID
                }, false);
            },
            
            onMasterRouteHit : function() {
                this.oListBindingPromise
                    .then( function() {
                        var oItems = this.oList.getItems();
                        this.oList.setSelectedItem(oItems[0]);
                        this.oRouter.navTo("detail", {
                            BusinessPartnerID : oItems[0].getBindingContext().getProperty("BusinessPartnerID")
                        });
                    }.bind(this));
            },
            
            onDataReceived : function(oEvent) {
                var oEvt = oEvent;
                this.oListBindingPromise = new Promise( function(resolve, reject) {
                    if(!oEvt.parameter("data")) {
                        reject();
                    } else {
                        resolve();
                    }
                }.bind(this))
                .catch( function() {
                    this.oRouter.getTargets.daisplay("genericError");
                }.bind(this));
            },
            
            onDetailRouteHit : function(oEvent) {
                var sBusinessPartnerID = oEvent.getParameter("arguments").BusinessPartnerID;
                var oSelectedItem = this.oList.getSelectedItem();
                if (oSelectedItem && oSelectedItem.getBindingContext().getProperty("BusinessPartnerID") === sBusinessPartnerID) {
                    return;
                } else {
                    this.oListBindingPromise.then(function() {
                        this.selectAnItem(sBusinessPartnerID);
                    }.bind(this));
                }
            },
            
            selectAnItem : function(sBusinessPartnerID) {
                var sKey = this.getView().getModel().createKey("BusinessPartnerSet", {
                    BusinessPartnerID : sBusinessPartnerID
                });
                var oItems = this.oList.getItems();
                oItems.some(function(oItem) {
            		if (oItem.getBindingContext() && oItem.getBindingContext().getPath() === "/" + sKey) {
            			this.oList.setSelectedItem(oItem);
            			return;
            		}
            	}, this);
            },
            
            showNotFound : function(){
                debugger;
            }
        });
});