jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
		"sap/ui/test/Opa5",
		"sapui5/demo/worklist/test/integration/pages/Common",
		"sap/ui/test/opaQunit",
		"sapui5/demo/worklist/test/integration/pages/Worklist",
		"sapui5/demo/worklist/test/integration/pages/Object",
		"sapui5/demo/worklist/test/integration/pages/NotFound",
		"sapui5/demo/worklist/test/integration/pages/Browser",
		"sapui5/demo/worklist/test/integration/pages/App"
	], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "sapui5.demo.worklist.view."
	});

	sap.ui.require([
		"sapui5/demo/worklist/test/integration/WorklistJourney",
		"sapui5/demo/worklist/test/integration/ObjectJourney",
		"sapui5/demo/worklist/test/integration/NavigationJourney",
		"sapui5/demo/worklist/test/integration/NotFoundJourney"
	], function () {
		QUnit.start();
	});
});
