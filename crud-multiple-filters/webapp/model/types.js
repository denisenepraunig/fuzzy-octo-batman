sap.ui.define([
    "sap/ui/model/SimpleType"
    ], function (SimpleType) {
	"use strict";
  return {

    /**
     * Data Type for phone numbers.
     *
     * @public
     */
    PhoneNumber : SimpleType.extend("sap.test.phoneNumber", {
      formatValue: function(oValue) {
         return "Phone number:" + oValue;
      },
      parseValue: function(oValue) {
        return oValue;
      },
      validateValue: function(oValue) {
        if (!/\+*\D*[0-9]*\-([2-9]\d{2})(\D*)([2-9]\d{2})(\D*)(\d{4})\D/.test(oValue)) {
          throw new sap.ui.model.ValidateException("phone number must follow the pattern +1 234-567-890!");
        }
      }
    })
  };

});