sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/HashChanger"
], function(Controller, HashChanger) {
	"use strict";

	return Controller.extend("sapui5.demo.userdetails.controller.UserDetails", {
	    onInit: function() {
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
	    }
	});
});