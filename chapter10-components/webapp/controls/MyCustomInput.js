sap.ui.define([
  "sap/ui/core/Control",
  "sap/ui/layout/Grid",
  "sap/ui/layout/GridData",
  "sap/ui/core/Icon",
  "sap/m/Input"
], function (Control, Grid, GridData, Icon, Input) {
	"use strict";
    return Control.extend("sapui5.demo.odata.readingdata.bestpractice.controls.MyCustomInput", {
		metadata : {
		    properties : {
                "value": {type: "string", defaultValue: ""},
                "iconURI": {type: "URI", defaultValue: ""}
            },
            aggregations:{
                 "_layout" : {type : "sap.ui.layout.Grid", multiple: false, visibility : "hidden"}
            }   
		},
		init : function () {
		    var that = this;
            this._oInput = new Input({
                value: this.getValue(),
                layoutData : new GridData({
                     span : "L11 M11 S11"
                })
            });

            this._oInput.addStyleClass("sapUiSmallMarginEnd");
            this._oIcon = new Icon({
                src: this.getIconURI(),
                layoutData : new GridData({
                     span : "L1 M1 S1"
                })
            });
            this._oIcon.addStyleClass("sapUiSmallMarginBegin");
		    this.setAggregation("_layout", 
    		    new Grid({
                    content: [
                           this._oIcon,
                           this._oInput
                        ],
                    hSpacing: 0,
                    vSpacing: 0
                })
            );

            this._oInput.attachChange(function(){
                that._oIcon.toggleStyleClass("sapThemePositiveText", that._oInput.getValue()!=="");
                that.setValue(that._oInput.getValue());
            });
		},

		exit : function() {
		  this._oInput.destroy();
		  this._oIcon.destroy();
		},

		setIconURI : function(sURI){
            this.setProperty("iconURI", sURI, true);
            this._oIcon.setSrc(sURI);
		},

		setValue : function(sValue){
		    this.setProperty("value", sValue, true);
            this._oInput.setValue(sValue);
		},

		renderer : function (oRenderManager, oControl) {
		    oRenderManager.write("<div");
		    oRenderManager.writeControlData(oControl);
		    oRenderManager.addClass("myListItem");
		    oRenderManager.writeClasses();
		    oRenderManager.write(">");
		    oRenderManager.renderControl(oControl.getAggregation("_layout"));
		    oRenderManager.write("</div>");
		}
	});
});