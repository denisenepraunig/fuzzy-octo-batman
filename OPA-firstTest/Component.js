sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/m/Page",
    "sap/m/Button",
    "sap/m/Dialog",
    "sap/m/Text"
  ], function(UIComponent, Page, Button, Dialog, Text) {

  return UIComponent.extend("my.simple.component.Component", {

      createContent : function() {
        var oDialog = new Dialog({
        });
        var oButton = new Button('buttonOpenDialog',
          {
            text : "hello",
            press : function(oEvt) {
              oDialog.setTitle(oEvt.getSource().getText());
              oDialog.open();
            }
        });
        oDialog.addAggregation("buttons", new Button('buttonCloseDialog', {
          text: "close dialog",
          press : function(){
            oDialog.close();
            oButton.setEnabled(false);
          }
        }));
        var oPage = new Page({
            content : oButton
        });
        return oPage;
      }
  });

});
