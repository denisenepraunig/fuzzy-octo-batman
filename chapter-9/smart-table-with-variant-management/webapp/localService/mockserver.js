sap.ui.define([
	"sap/ui/core/util/MockServer"
], function (MockServer) {
	"use strict";

	return {

		init: function () {

			var sModulePath = jQuery.sap.getModulePath("sap.ui.demo.smartControls.table.variant.localService");

			// enable fake lrep for variant management
			jQuery.sap.require("sap.ui.fl.FakeLrepConnector");
			var sFakeLrepSettingsPath = sModulePath + "/component-test-changes.json";
			sap.ui.fl.FakeLrepConnector.enableFakeConnector(sFakeLrepSettingsPath);

			// create
			var oMockServer = new MockServer({
				rootUri: "/here/goes/your/serviceUrl/"
			});

			// configure
			MockServer.config({
				autoRespond: true,
				autoRespondAfter: 1000
			});

			// simulate
			oMockServer.simulate(sModulePath + "/metadata.xml", sModulePath);

			// start
			oMockServer.start();
		}
	};

});
