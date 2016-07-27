sap.ui.define([
		"sapui5/demo/odata/reading/binaryimage/controller/BaseController",
		"sapui5/demo/odata/reading/binaryimage/model/formatter"
	], function (BaseController, formatter) {
	"use strict";

	return BaseController.extend("sapui5.demo.odata.reading.binaryimage.controller.Master", {

		formatter: formatter
	});
});