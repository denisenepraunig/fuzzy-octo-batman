sap.ui.define([
	"sap/ui/core/Control",
	"sap/ui/model/json/JSONModel",
	"sap/m/Input",
	"sap/m/SelectDialog",
	"sap/m/Button",
	"sap/m/Label",
	"sap/ui/layout/form/SimpleForm"
], function (Control, JSONModel, Input, SelectDialog, Button, Label, Form) {
	"use strict";
	return Control.extend("sapui5.demo.mvcapp.controls.Iconizer", {
		metadata : {
			properties : {
				size: 		{type : "sap.ui.core.CSSSize", defaultValue : 0},
				color: 		{type : "string"},
				backgroundColor: {type : "string"},
				iconName:	{type : "string"}
			},
			aggregations : {
				_icon : {type : "sap.ui.core.Icon", multiple : false, visibility : "hidden"},
				_button : {type : "sap.m.Button", multiple : false, visibility : "hidden"},
				_form : {type : "sap.ui.layout.form.SimpleForm", multiple: false, visibility: "hidden"}
			}
		},
		
		setIconName : function (sValue, bNoRerendering) {
			this.setProperty("iconName", sValue, bNoRerendering);
			this._iconNameInput.setValue(sValue);
		},
		
		setSize : function (sValue, bNoRerendering) {
			this.setProperty("size", sValue, bNoRerendering);
			this._sizeInput.setValue(sValue);
		},
		
		setColor : function (sValue, bNoRerendering) {
			this.setProperty("color", sValue, bNoRerendering);
			this._colorInput.setValue(sValue);
		},
		
		setBackgroundColor : function (sValue, bNoRerendering) {
			this.setProperty("backgroundColor", sValue, bNoRerendering);
			this._backgroundColorInput.setValue(sValue);
		},

		init : function () {
			var that = this;
			this._iconNameInput = new Input({value: this.iconName, change: function(oEvent) {
				that.setIconName(oEvent.getParameter("newValue"), true);
			}});
			
			this._sizeInput = new Input({value: this.size,  change: function(oEvent) {
				that.setSize(oEvent.getParameter("newValue"), true);
			}});
			
			this._colorInput = new Input({value: this.color, change: function(oEvent){
				that.setColor(oEvent.getParameter("newValue"), true);
			} });
			
			this._backgroundColorInput = new Input({value: this.backgroundColor, change: function(oEvent){
				that.setBackgroundColor(oEvent.getParameter("newValue"), true);
			}});
			
			this.setAggregation("_icons");
			this.setAggregation("_button", new Button({text: "{i18n>btnCreateIcon}", press: function(){ that.createIconImage(); }}));
			this.setAggregation("_form", new Form({ content: [
				new Label({text: "{i18n>lblIcon}"}),
				this._iconNameInput, 
				new Label({text: "{i18n>lblSize}"}),
				this._sizeInput,
				new Label({text: "{i18n>lblColor}"}),
				this._colorInput,
				new Label({text: "{i18n>lblBackgroundColor}"}),
				this._backgroundColorInput
			]}));
			this._canvas="<canvas width='100%' height='500px' id='c' class='iconCanvas' />";
		},
		createIconImage : function(){
			var oIcon = new sap.ui.core.Icon({
				src: "sap-icon://" + this.getIconName().trim(),
				size: this.getSize(),
				color: this.getColor(),
				backgroundColor: this.getBackgroundColor()
			});
			this.setAggregation("_icon", oIcon);
			this.writeToCanvas(oIcon);
		},

		writeToCanvas : function(oIcon){
			var ctx = document.getElementById('c').getContext('2d');
			  ctx.font         = oIcon.getSize() + 'sap-icon';
			  ctx.fillStyle = 'orangered';
			  ctx.textBaseline = 'top';
			  ctx.fillText  (this.getIconName(), 0, 270);
		},

		renderer : function (oRM, oControl) {
			oRM.write("<div");
			oRM.writeControlData(oControl);
			oRM.write(">");
			oRM.renderControl(oControl.getAggregation("_form"));
			oRM.renderControl(oControl.getAggregation("_button"));
			if(oControl.getAggregation("_icon")){
				oRM.renderControl(oControl.getAggregation("_icon"));
			}
			oRM.write( );
			
			oRM.write("</div>");
		}
	});
});