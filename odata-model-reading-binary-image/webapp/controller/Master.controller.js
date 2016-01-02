sap.ui.define([
		"sapui5/demo/odata/readingdata/bestpractice/controller/BaseController",
		"sapui5/demo/odata/readingdata/bestpractice/model/formatter"
	], function (BaseController, formatter) {
	"use strict";

	return BaseController.extend("sapui5.demo.odata.readingdata.bestpractice.controller.Master", {

		formatter: formatter
	});

});