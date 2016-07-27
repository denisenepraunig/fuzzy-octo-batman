sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/Device"
], function(Controller, Device) {

	return Controller.extend("business.partner.app.controller.Master", {

		onInit: function() {
			this.oList = this.byId("list");
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oRouter.getRoute("detail").attachEvent("patternMatched", this.onDetailRouteHit.bind(this));
			this.oRouter.getRoute("main").attachEvent("patternMatched", this.onMasterRouteHit.bind(this));
			this.oRouter.attachEvent("bypassed", function() {
			    this.oList.removeSelections(true);         
			}.bind(this));
			var that = this;
			this.oListBindingPromise = new Promise(
				function(resolve, reject) {
					that.getView().addEventDelegate({
						onBeforeFirstShow: function() {
							that.oList.getBinding("items").attachEventOnce("dataReceived", function(oEvent) {
								if (oEvent.getParameter("data")) {
									resolve();
								} else {
									reject();
								}
							}, this);
						}.bind(that)
					});
				}
			);
		},

		onItemPressed: function(oEvent) {
			var oItem = oEvent.getParameter("listItem") || oEvent.getSource();
			var sID = oItem.getBindingContext().getProperty("BusinessPartnerID");
			this.oRouter.navTo("detail", {
				BusinessPartnerID: sID
			}, false);
		},

		onMasterRouteHit: function() {
			if(Device.system.phone){
			    return;
			}
			this.oListBindingPromise
				.then(function() {
                    var sId = this.oList.getItems()[0].getBindingContext().getProperty("BusinessPartnerID");
                    this.selectAnItem(sId);
                    this.oRouter.navTo("detail", {
                    	BusinessPartnerID: sId 
                    });
            }.bind(this));
		},

		onDataReceived: function(oEvent) {
			var oEvt = oEvent;
			this.oListBindingPromise = new Promise(
			    function(resolve, reject) {
					if (!oEvt.getParameter("data")) {
						reject();
					} else {
						resolve();
					}
				});
				
		},
		
		onUpdateFinished : function() {
		    this.byId("pullToRefresh").hide();
		},

		onDetailRouteHit: function(oEvent) {
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
		
		onRefresh: function() {
			this.oList.getBinding("items").refresh();
		},

		selectAnItem: function(sBusinessPartnerID) {
			var sKey = this.getView().getModel().createKey("BusinessPartnerSet", {
				BusinessPartnerID: sBusinessPartnerID
			});
			var oItems = this.oList.getItems();
			oItems.some(function(oItem) {
				if (oItem.getBindingContext() && oItem.getBindingContext().getPath() === "/" + sKey) {
					this.oList.setSelectedItem(oItem);
					return;
				}
			}, this);
		}
	});
});