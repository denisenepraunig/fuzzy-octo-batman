sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/HashChanger"
], function(Controller, HashChanger) {
	"use strict";

	return Controller.extend("sapui5.demo.userdetails.controller.UserDetails", {
	    onInit: function() {
<<<<<<< Upstream, based on 4c10f349f24ee69509b2bfd86b175ddd8c4f6f54
	        var oHashChanger = new HashChanger();
            oHashChanger.init();
            oHashChanger.attachEvent("hashChanged", this.hashChanged, this);
            this._sHash = /[^/]*$/.exec(oHashChanger.getHash())[0];
            this.getOwnerComponent().getModel("userDetails").attachRequestCompleted(this._bindView, this);
	    },
	    hashChanged: function (oEvent){
	      this._sHash = oEvent.getParameter("newHash");
	      this._bindView();
	    },
	    _bindView: function() {
	        this._sHash = /[^/]*$/.exec(this._sHash)[0];
			this.getView().bindElement({path: "/" + this._sHash, model: "userDetails"});
=======
            sap.ui.core.UIComponent.getRouterFor(this).getRoute("userdetails").attachMatched(this._bindView, this);
	    },
	    _bindView: function(oEvent) {
            var oArgs = oEvent.getParameter("arguments");
            var oModel = this.getView().getModel("userDetails");
            if (oModel.getProperty("/"+oArgs.userID)){
                this.getView().bindElement({path: "/"+oArgs.userID, model: "userDetails"});
            } else {
                this.getView().getModel("userDetails").attachRequestCompleted(function(){
                    this.getView().bindElement({path: "/"+oArgs.userID, model: "userDetails"});
                }, this);
            }
>>>>>>> 2c6241d chapter 10 samples for fragments and component
	    }
	});
});
