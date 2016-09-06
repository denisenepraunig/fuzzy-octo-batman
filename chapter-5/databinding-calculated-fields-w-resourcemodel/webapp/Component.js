sap.ui.define([
		"sap/ui/core/UIComponent",
		"sap/ui/model/resource/ResourceModel",
		"sap/ui/model/json/JSONModel"
	], function (UIComponent, ResourceModel, JSONModel) {
	"use strict";

	return UIComponent.extend("sapui5.demo.db.calc2.Component", {

		metadata : {
			"rootView": "sapui5.demo.db.calc2.view.App",
			"dependencies": {
				"minUI5Version": "1.28.0",
				"libs": [ "sap.ui.core", "sap.m" ]
			},

			"config": {
				"serviceUrl": "service/data.json",
				"i18nBundle": "sapui5.demo.db.calc2.i18n.i18n"
			},

			"routing": {
				"config": {
					"routerClass": "sap.m.routing.Router",
					"viewType": "XML",
					"viewPath": "sapui5.demo.db.calc2.view",
					"controlId": "app",
					"controlAggregation": "pages",
					"bypassed": {
						"target": "notFound"
					}
				},

				"routes": [
					{
						"pattern": "",
						"name": "master",
						"target": "master"
					},
					{
						"pattern": "detail/{ID}",
						"name": "detail",
						"target": "detail"
					}
				],

				"targets": {
					"master": {
						"viewName": "Master",
						"viewLevel": 1
					},
					"detail": {
						"viewName": "Detail",
						"viewLevel": 2
					},
					"notFound": {
						"viewName": "NotFound",
						"viewId": "notFound"
					}
				}
			}
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * In this function, the resource and application models are set and the router is initialized.
		 * @public
		 * @override
		 */
		init : function () {
			var mConfig = this.getMetadata().getConfig();

			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the internationalization model
			this.setModel(new ResourceModel({
				bundleName : mConfig.i18nBundle
			}), "i18n");

			// create the views based on the url/hash
			this.getRouter().initialize();
		},

		/**
		 * In this function, the rootView is initialized and stored.
		 * @public
		 * @override
		 * @returns {sap.ui.mvc.View} the root view of the component
		 */
		createContent : function() {
			// set the app data model since the app controller needs it, we create this model very early
            var oModel = new JSONModel(this.getMetadata().getConfig().serviceUrl);
			this.setModel(oModel);
			
			// call the base component's createContent function
			var oRootView = UIComponent.prototype.createContent.apply(this, arguments);
			return oRootView;
		}
	});
});