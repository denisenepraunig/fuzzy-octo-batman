sap.ui.define([
  "sap/ui/core/Control",
  "sap/ui/layout/HorizontalLayout",
  "sap/ui/core/Icon",
  "sap/m/Text"
], function (Control, HorizontalLayout, Icon, Text) {
	"use strict";
    return Control.extend("sapui5.demo.mvcapp.controls.MyListItem", {
		metadata : {
		    properties : {
                "iconURI": {type: "URI", defaultValue: ""},
                "text": {type: "string", defaultValue: ""}
            },
            aggregations:{
                 "_layout" : {type : "sap.ui.layout.HorizontalLayout", multiple: false, visibility : "hidden"},
                 "_icon" : {type: "sap.ui.core.Icon", multiple: false, visibility: "hidden"},
                 "_text" : {type: "sap.m.Text", multiple: false, visibility: "hidden"}
            }   
		},
		init : function () {
	        this.setAggregation("_icon",
	            new Icon({
	                src: this.getIconName()
	            })
	        );
		    this.setAggregation("_text", 
    		    new sap.m.Text({
    		        text: this.getText()
		        })
		    );
		    this.setAggregation("_layout", 
    		    new HorizontalLayout({
                    allowWrapping : true,
                    content: [
                           this.getAggregation("_icon"),
                           this.getAggregation("_text")
                        ]
                })
            );
		},

		setIconURI : function(sURI){
            this.setProperty("iconURI", sURI, true);
            this.getAggregation("_icon").setSrc(sURI);
		},

		setText : function(sText){
		    this.setProperty("text", sText, true);
            this.getAggregation("_text").setSrc(sText);
		},

		renderer : function (oRenderManager, oControl) {
		    oRenderManager.write("<div");
		    oRenderManager.writeControlData(oControl);
		    oRenderManager.addClass("myListItem");
		    oRenderManager.writeClasses();
		    oRenderManager.write(">");
		    oRenderManager.renderControl(this.getAggregation("_layout"));
		    oRenderManager.write("</div>");
		}
	});
});
