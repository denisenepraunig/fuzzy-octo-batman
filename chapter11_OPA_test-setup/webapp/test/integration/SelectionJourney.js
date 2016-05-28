sap.ui.define([
	"sap/ui/test/opaQunit"
	], function(opaTest) {
	"use strict";
	
	QUnit.module("MasterList Selections");
						
		opaTest("clicking an item on the master list should display the right details", function(Given,When,Then) {

			Given.iStartMyUIComponent({
  				componentConfig: {
  					name: "my.app"
  				}
  			});
  			
			When.onTheMasterPage.iWaitUntilAnAggregationIsFilled("items")
				.and.iClickOnARandomItem();
			
			Then.onTheDetailPage.iSeeTheRightDetails()
				.and.iTeardownMyUIComponent();
		});
});