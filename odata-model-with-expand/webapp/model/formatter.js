sap.ui.define([], function () {
	"use strict";
	return {
		displayImage: function (sBase64Image) {
			 var sBase64BMP = btoa(atob(sBase64Image).substr(78));
             var sDataUrl = "data:image/bmp;base64," + sBase64BMP;
             return sDataUrl;
		}
	};
});