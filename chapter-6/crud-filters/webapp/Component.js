sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/model/resource/ResourceModel",
  "sap/ui/model/json/JSONModel",
  "sapui5/demo/crudfilters/model/AppModel",
  "sap/ui/Device"
	], function (UIComponent, ResourceModel, JSONModel, AppModel, Device) {
  "use strict";

	return UIComponent.extend("sapui5.demo.crudfilters.Component", {


		metadata : {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * In this function, the resource and application models are set and the router is initialized.
		 * @public
		 * @override
		 */
        init : function () {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);
            // create the device model here
            var oModel = new JSONModel(Device);
            oModel.setDefaultBindingMode("OneWay");
            this.setModel(oModel, "device");
            var oAppModel = new AppModel("/Suppliers");
          
            jQuery.ajax({
                type : "GET",
                contentType : "application/json",
                url : "/Suppliers",
                dataType : "json",
                success : function(oData) {
                    oAppModel.setData(oData);
                },
                error : function() {
                    jQuery.sap.log.debug("something went wrong while retrieving the data");
                }
			});
			
            this.setModel(oAppModel);
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
			// call the base component's createContent function
			var oRootView = UIComponent.prototype.createContent.apply(this, arguments);
			return oRootView;
		}
	});
});