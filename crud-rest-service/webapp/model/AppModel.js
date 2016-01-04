sap.ui.define([
		"sap/ui/model/json/JSONModel"
	], function (JSONModel) {
	"use strict";

	return JSONModel.extend("sapui5.demo.mvcapp.model.AppModel", {
		read : function(sUrl, sObjectPath, sProperty, bRefresh){
			var sPropertyPath;
			//only send a new request when there's no data at the model or bRefresh is set
			if (sProperty){
				sPropertyPath = "/" + sProperty;
			} 
			var vData = this.getProperty(sObjectPath + sPropertyPath);
			if (bRefresh || (!vData || (vData && vData.length === 0))){
				var that = this;
				jQuery.ajax({
	                    type : "GET",
	                    contentType : "application/json",
	                    url : sUrl,
	                    dataType : "json",
	                    async: true, 
	                    success : function(data) {
	                        that._updateModel(sObjectPath, sProperty, data);
	                    },
	                    error : function() {
	                        jQuery.sap.log.Error("could not read data from " + sUrl); 
	                    }
				});
			}
			return;
		},
		saveEntry : function(){
			var bla = "bla";
			debugger;
		},
		deleteEntry : function(){},
		_updateModel : function(sObjectPath, sProperty, data){
			if (sProperty){
				this.setProperty(sObjectPath + "/"+ sProperty, data);	
			} else {
				// we are trying to set an objet to the model
				this.setProperty(sObjectPath, data);
			}
		}
	});
});