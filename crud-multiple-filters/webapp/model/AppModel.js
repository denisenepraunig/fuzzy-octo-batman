sap.ui.define([
		"sap/ui/model/json/JSONModel"
	], function (JSONModel) {
	"use strict";

	return JSONModel.extend("sapui5.demo.mvcapp.model.AppModel", {
		saveEntry : function(oObject, sUrl, sLocalPath, aExclude){
			var sType,
			that = this,
			oData,
			oFullData = jQuery.extend(true, {}, oObject);
			// local path indicates whether we are updating an existing object or creating a new one
			if(sLocalPath){
				sType = "PUT";
			} else {
				sType = "POST";
			}
			for (var i = 0, len = aExclude.length; i<len; i++){
				//strip out properties we don't want to update:
				delete oObject[aExclude[i]]; 
			}
			oData = JSON.stringify(oObject);
			//send the request:
			jQuery.ajax({
                    type : sType,
                    contentType : "application/json",
                    data: oData,
                    url : sUrl,
                    dataType : "json",
                    async: true, 
                    success : function(data, textStatus, jqXHR) {
                       //store the new/updated entry in the model
                       that._updateModel(sLocalPath, oFullData);
                       //call createEntry to reset the dummy property to empty values
                       that.createEntry("/");
                       that.fireRequestCompleted();
                       var xhr = jqXHR;
                    },
                    error : function() {
                        that.fireRequestFailed();
                    }
			});
		},
		
		createEntry : function(sEntityName){
			this.setProperty(sEntityName + "/createEntry",   
				 {  
		            "id" : "",
		            "Name" : "",
		            "Address" : {  
		                "Street" : "",
		                "City" : "",
		                "State" : "",
		                "ZipCode" : "",
		                "Country" : "",
		                "PhoneNumber" : ""
		            }
				 });
		},

		deleteEntry : function(sUrl, sLocalPath){
			var that = this;
			jQuery.ajax({
                type : "DELETE",
                contentType : "application/json",
                url : sUrl,
                dataType : "json",
                async: true, 
                success : function() {
                   //store the new/updated entry in the model
                   that._updateModel(sLocalPath, null,  true);
                   that.fireRequestCompleted();
                },
                error : function() {
                    that.fireRequestFailed();
                }
			});
		},

		_updateModel : function(sLocalPath, data, bDelete){
			var aData = this.getData();
			if (sLocalPath && bDelete) {
				//remove from model
				aData.splice(sLocalPath.substr(1), 1);
				this.setData(aData);
				this.refresh();
			} else if (sLocalPath) {
				//store data for an existing object
				this.setProperty(sLocalPath, data);
			} else {
				//store new object: get all Data as array from model, push new entry, set data to the model again
				aData.push(data);
				this.setData(aData);
			}
		}
	});
});