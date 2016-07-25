sap.ui.define([
		"sapui5/demo/advanced/testing/controls/MyCustomInput"
	], function (MyCustomInput) {
		"use strict";

		QUnit.module("MyCustomInput – Behavior Tests", {
			beforeEach: function() {
				this.oCustomInput = new MyCustomInput("customInput", {
	                "iconURI": "arrow-up"
				});
			},
			afterEach: function() {
				this.oCustomInput.destroy();
			}
		});

		QUnit.test("Should see a Grid containing an icon and an input", function (assert) {
			var oCustomInput = sap.ui.getCore().byId("customInput");
			assert.ok(oCustomInput, "Control Instance was created");
			var oLayout = this.oCustomInput.getAggregation("_layout");
			assert.strictEqual(oLayout.getMetadata().getName(), "sap.ui.layout.Grid", "Found a Grid control within the custom control");
			assert.strictEqual(this.oCustomInput.getIconURI(), oLayout.getAggregation("content")[0].getSrc(), "Icon URI was correctly set at control and inner control");
			assert.strictEqual(oLayout.getAggregation("content")[1].getMetadata().getName(), "sap.m.Input", "Found a sap.m.Input inside the custom control");
		});

		QUnit.test("Should set the input value at the inner control and at the custom control", function (assert) {
			// simulate user input by setting the value directly at the inner control:
			this.oCustomInput._oInput.setValue("Hello World");
			this.oCustomInput._oInput.fireChange();
			assert.strictEqual(this.oCustomInput._oInput.getValue(), this.oCustomInput.getValue(), "Value property of MyCustomInput has the same value as the inner input control");
		});

		QUnit.test("Should set the value from the custom control property at the inner input control", function (assert) {
			this.oCustomInput.setValue("Hello Unit Test");
			assert.strictEqual(this.oCustomInput._oInput.getValue(), "Hello Unit Test", "value property of MyCustomInput was correctly also set at the inner input");
		});

		QUnit.test("Icon should turn green when the input is not empty, and black again if emptied again", function (assert) {
			this.oCustomInput.setValue("Hello Icon");
			assert.ok(this.oCustomInput._oIcon.hasStyleClass("sapThemePositiveText"), "Icon has the appropriate style class and is now green");
			this.oCustomInput.setValue("");
			assert.notOk(this.oCustomInput._oIcon.hasStyleClass("sapThemePositiveText"), "Icon has no additional style class and is now black again");
		});
	}
);