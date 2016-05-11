sap.ui.define([
		"sap/ui/model/json/JSONModel"
	], function (JSONModel) {
	"use strict";

	return JSONModel.extend("sapui5.demo.mvcapp.model.AppModel", {
		saveEntry : function(oObject, sUrl, sLocalPath){
			var sType,
			that = this,
			oData;
			// local path indicates whether we are updating an existing object or creating a new one
			if(sLocalPath){
				sType = "PUT";
			} else {
				sType = "POST";
			}
			oData = JSON.stringify(oObject);
			jQuery.ajax({
                    type : sType,
                    contentType : "application/json",
                    data: oData,
                    url : sUrl,
                    dataType : "json",
                    success : function() {
                       //store the new/updated entry in the model
                       that._updateModel(sLocalPath, oObject);
                       //call createEntry to reset the dummy property to empty values
                       that.createEntry("/");
                       that.fireRequestCompleted();
                    },
                    error : function() {
                        that.fireRequestFailed();
                    }
			});
		},

		createEntry : function(sEntityName){
			this.setProperty(sEntityName + "createEntry",   
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

		_updateModel : function(sLocalPath, data){
			if (sLocalPath){
				//store data for an existing object
				this.setProperty(sLocalPath, data);	
			} else {
				//store new object: get all Data as array from model, push new entry, set data to the model again
				var aData = this.getData();
				aData.push(data);
				this.setData(aData);
			}
		}
	});
});