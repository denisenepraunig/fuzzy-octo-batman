sap.ui.define(
  ["sap/ui/core/util/MockServer"],

  function(MockServer) {

    var oMockServer;

    return {
      init : function () {
        oMockServer = new MockServer({
          rootUri : "/here/goes/your/service/url"
        });
        var sMetaPath = jQuery.sap.getModulePath("sapui5.demo.mockserver" + "/localService/metadata", ".xml"),
            sMockdataPath = jQuery.sap.getModulePath("sapui5.demo.mockserver" + "localService/MockData");

        oMockServer.simulate(sMetaPath, {
          aEntitySetsNames: "Suppliers",
          sMockdataBaseUrl: sMockdataPath,
          bGenerateMissingMockData: true
        });

        oMockServer.getRequests().forEach(function(oRequest) {
          if(oRequest.path.toString().indexOf("$metadata")){
            oRequest.response = function(oXhr) {
              oXhr.respond(500, {"Content-Type": "text/plain;charset=utf-8"}, "metadata error");
            };
          }
        });

        oMockServer.start();
      },

      getMockServer : function () {
        return oMockServer;
      }
    };

  });