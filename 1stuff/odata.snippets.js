// the mandatory service URL
var sServiceURL = "http://services.odata.org/Northwind/Northwind.svc/";

// instantiation with the service URL directly
var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceURL);

// instantation with the service URL in a parameter map
var oModel = new sap.ui.model.odata.v2.ODataModel({
	serviceUrl: sServiceURL
});

oModel.attachMetadataLoaded(function() {
	var oMetaData = oModel.getServiceMetadata();
	console.log("Service Metadata", oMetaData);
});


{  "routes": [
	...
	{
      "path": "/destinations/northwind",
      "target": {
        "type": "destination",
        "name": "northwind"
      },
      "description": "northwind"
    } ...

// we don't access the backend directly
// var sServiceURL = "http://services.odata.org/Northwind/Northwind.svc/";

// we use the destination instead
var sServiceURL = "/destinations/northwind/V3/Northwind/Northwind.svc/";



"/Products"
"/Products(1)"
"/Products(1)/ProductName"
"/Products(1)/Supplier"
"Products(1)/Supplier/CompanyName"


"ProductId"
"ProductName"
"UnitPrice"
"UnitsInStock"

"/Products(1)/ProductId"
"/Products(1)/ProductName"
"/Products(1)/UnitPrice"
"/Products(1)/UnitsInStock"

var oText = new sap.m.Text({
	text: "Product name: {ProductName}"
});

oPageMaster.bindElement("/Products(1)");


// absolute binding
// display the product name
var oText = new sap.m.Text({
  text: "Product name: {/Product(1)/ProductName}"
});

// absolute binding
oPageMaster.bindElement("/Products");
