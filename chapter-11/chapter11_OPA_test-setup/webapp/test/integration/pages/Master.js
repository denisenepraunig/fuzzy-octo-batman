sap.ui.define([
	"sap/ui/test/Opa5",
	"my/app/test/integration/pages/Common",
	"sap/ui/test/matchers/AggregationFilled",
	"sap/ui/test/actions/Press"
	], function(Opa5, Common, AggregationFilled, Press) {
		"use strict";
		
		Opa5.createPageObjects({
			
			onTheMasterPage : {
				baseClass: Common,
				actions : {
					iClickOnARandomItem : function(){
						return this.waitFor({
							viewName : "Master",
							id : "list",
							matchers : function(oList) {
								var iItemIndex = Math.round(Math.random() * (oList.getItems().length - 1));
								return oList.getItems()[iItemIndex];
							},
							actions : new Press(),
							success : function(oListItem) {
								var oPath = oListItem.getBindingContextPath();
								Opa5.getContext().oBindingPath = oPath;
								ok(true, "Item " + oPath + " was clicked");
							}
						});
					} 
				},
				assertions : {
				}
			}
		});
	});