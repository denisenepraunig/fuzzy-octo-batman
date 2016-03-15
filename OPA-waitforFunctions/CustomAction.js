sap.ui.define(
  ['sap/ui/test/actions/Action'],
  function(Action){

    return Actions.extend(my.Action, {

        executeOn: function(oControl) {
          // your custom control interaction logic goes here
        }
    });
});
