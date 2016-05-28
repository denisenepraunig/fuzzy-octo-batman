sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/matchers/BindingPath"
], function(Opa5, BindingPath) {
	
	Opa5.createPageObjects({
		
		onTheDetailPage : {
			actions : {},
			assertions : {
				iSeeTheRightDetails : function() {
					return this.waitFor({
						viewName : "Detail",
						id : "page",
						matcher : function() {
							return new BindingPath({
								path: Opa5.getContext().oBindingPath
							});
						},
						success : function() {
							var oPath = Opa5.getContext().oBindingPath;
							ok(true, "Details for " + oPath + "were displayed");
						}
					});
				}
			}
		}
				
	});
});