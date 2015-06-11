sap.ui.jsview("sapui5.demo.mvcapp.view.Master", {
   
   getControllerName: function() {
       
      return "sapui5.demo.mvcapp.controller.Master";
   },

   createContent: function(oController) {
       
     var aColumns = [ 
            new sap.m.Column({
                header : new sap.m.Text({
				    text : "ID"
			    })
            }),
            new sap.m.Column({
                header : new sap.m.Text({
				    text : "Name"
			    })
            })
        ];
        
        var oTemplate = new sap.m.ColumnListItem({
            type: "Navigation",
            press: [oController.onListPress, oController],
    		cells : [
    			new sap.m.ObjectIdentifier({
    				text : "{ID}"
    			}),
    			new sap.m.ObjectIdentifier({
    				text : "{Name}"
    			})
    		]
    	});
    	
    	var oTableHeader = new sap.m.Toolbar({
		content : [
    			new sap.m.Title({
    				text : "Number of Suppliers: {/CountSuppliers}"
    			})
    		]
	    });
        
        var oTable = new sap.m.Table({
            columns : aColumns,
            headerToolbar : oTableHeader
        });
        
        oTable.bindItems("/Suppliers", oTemplate);
        oTable.addStyleClass("sapUiResponsiveMargin");
        
        var oPageMaster = new sap.m.Page({
    		title : "Supplier Overview",
    		content : [oTable]
    	});
    	return oPageMaster;
   }
});