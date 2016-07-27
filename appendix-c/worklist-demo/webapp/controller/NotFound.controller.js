sap.ui.define([
		"sapui5/demo/worklist/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("sapui5.demo.worklist.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);