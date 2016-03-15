sap.ui.define(
  ['sap/ui/test/matchers/Matcher'],
  function(Matcher){

    return Matcher.extend(my.Matcher, {

        metadata: {
          properties: {
            myPropertyForConstructor : {
              // config if needed
            }
          }
        },

        isMatching: function(oControl) {
          return true||false
        }
    })
})
