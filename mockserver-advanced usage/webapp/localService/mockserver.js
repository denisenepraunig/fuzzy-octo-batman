sap.ui.define(
  ["sap/ui/core/util/MockServer"],

  function(MockServer) {

    var oMockServer;

    return {
      init : function () {
        oMockServer = new MockServer({
          rootUri : "/destinations/northwind/V2/(S(xgoz33phgwr2uph42rkjj5b5))/OData/OData.svc/"
        });
        var sMetaPath = jQuery.sap.getModulePath("sapui5.demo.odata.readingdata.bestpractice" + "localService/metadata.xml"),
            sMockdataPath = jQuery.sap.getModulePath("sapui5.demo.odata.readingdata.bestpractice" + "localService/MockData");

        oMockServer.simulate(sMetaPath, {
          aEntitySetsNames: "Suppliers",
          sMockdataBaseUrl: sMockdataPath,
          bGenerateMissingMockData: true
        });

        oMockServer.getRequests().forEach(function(oRequest) {
          if(oRequest.path.toString().indexOf("$metadata")){
            oRequest.response = function(oXhr) {
              oXhr.respond(500, {"Content-Type": "text/plain;charset=utf-8"}, "metadata error");
            }
          }
        })

        oMockServer.start();
      },

      getMockServer : function () {
        return oMockServer;
      }
    }

  });
