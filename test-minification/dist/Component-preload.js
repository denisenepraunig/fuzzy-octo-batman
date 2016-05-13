jQuery.sap.registerPreloadedModules({
	"version": "2.0",
	"name": "test/minification/Component-preload",
	"modules": {
		"test/minification/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\",\"sap/ui/Device\",\"test/minification/model/models\"],function(e,i,t){\"use strict\";return e.extend(\"test.minification.Component\",{metadata:{manifest:\"json\"},init:function(){e.prototype.init.apply(this,arguments),this.setModel(t.createDeviceModel(),\"device\")}})});",
		"test/minification/controller/View1.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\"],function(e){\"use strict\";return e.extend(\"test.minification.controller.View1\",{})});",
		"test/minification/model/models.js": "sap.ui.define([\"sap/ui/model/json/JSONModel\",\"sap/ui/Device\"],function(e,n){\"use strict\";return{createDeviceModel:function(){var i=new e(n);return i.setDefaultBindingMode(\"OneWay\"),i}}});",
		"test/minification/view/View1.view.xml": "<mvc:View controllerName=\"test.minification.controller.View1\" xmlns:html=\"http://www.w3.org/1999/xhtml\" xmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><App><pages><Page title=\"{i18n>title}\"><content></content></Page></pages></App></mvc:View>",
		"test/minification/i18n/i18n.properties": "title=Title\nappTitle = App Title\nappDescription=App Description"
	}
});