sap.ui.jsview("sapui5.demo.viewtypes.view.View", {
   
   getControllerName: function() {
       
      return "sapui5.demo.viewtypes.controller.View";
   },

   createContent: function(oController) {
       
        var oButton = new sap.m.Button({
            text: "Hello World!",
            icon: "sap-icon://accept",
            width: "200px",
            type: "Accept",
            press: [oController.onPress, oController]
        });
        
        var oPanel = new sap.m.Panel({
            content: [oButton]    
        });
        
        var oPage = new sap.m.Page({
    		title: "Supplier Overview",
    		content: [oPanel]
    	});
    	return oPage;
   }
});