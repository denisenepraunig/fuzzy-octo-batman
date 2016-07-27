sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/matchers/AggregationFilled"
], function(Opa5, AggregationFilled) {
	"use strict";
	
	return Opa5.extend("my.app.test.integration.pages.Common", {
		
		iWaitUntilAnAggregationIsFilled : function(aggregationName) {
			return this.waitFor({
				controlType: "sap.m.List",
				matchers : new AggregationFilled({
					name : "items" 
				})
			});
		}
	});
});