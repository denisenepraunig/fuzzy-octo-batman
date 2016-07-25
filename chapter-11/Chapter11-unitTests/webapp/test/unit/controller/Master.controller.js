sap.ui.define([
	"sapui5/demo/advanced/testing/controller/Master.controller",
	"sap/ui/core/Control",
	"sap/ui/model/json/JSONModel",
	"sap/m/Panel",
	"sap/ui/thirdparty/sinon",
	"sap/ui/thirdparty/sinon-qunit"
], function(MasterController, Control, JSONModel, Panel) {
	"use strict";

	QUnit.module("Initialization", {

		beforeEach: function() {
			this.oViewStub = new Control();
			this.oPanel = new Panel("SupplierPanel");
			this.oComponentStub = new Control();
			this.oRouterStub = new sap.m.routing.Router();
			this.oRouterStub.getRoute = function(){
				return {
					attachPatternMatched: jQuery.noop
				};
			};
			this.fnMetadataThen = jQuery.noop;
			var oODataModelStub = new JSONModel();
			oODataModelStub.metadataLoaded = function() {
				return {
					then: this.fnMetadataThen
				};
			}.bind(this);
			oODataModelStub.submitChanges = function(){
				return {};
			};
			this.oComponentStub.setModel(oODataModelStub);
			this.oMasterController = new MasterController();
			
			sinon.stub(this.oMasterController, "getView").returns(this.oViewStub);
			var oByIdStub = sinon.stub(this.oMasterController, "byId");
			oByIdStub.withArgs("SupplierPanel").returns(this.oPanel);
			sinon.stub(this.oMasterController, "getOwnerComponent").returns(this.oComponentStub);
			sinon.stub(this.oMasterController, "getRouter").returns(this.oRouterStub);
			sinon.stub(this.oMasterController, "getModel").returns(oODataModelStub);
			
			sinon.config.useFakeTimers = false;
		},

		afterEach: function() {
			this.oMasterController.getView.restore();
			this.oMasterController.byId.restore();
			this.oMasterController.getOwnerComponent.restore();
			this.oMasterController.getRouter.restore();
			this.oMasterController.geModel.restore();
			this.oPanel.destroy();
			this.oViewStub.destroy();
			this.oComponentStub.destroy();
			this.oRouterStub.destroy();
		}
	});

	QUnit.test("Should display the edit fragment", function(assert) {
		this.spy(this.oMasterController, "_showEdit");
		this.oMasterController.onInit();
		
		assert.ok(this.oMasterController._showEdit.calledOnce, "showEdit was called once");
		assert.strictEqual(this.oMasterController.byId("SupplierPanel").getContent()[0].getMetadata().getName(), "sap.ui.layout.form.SimpleForm", "Panel contains a form");
		
		this.oMasterController._showEdit.restore();
	});

	QUnit.test("should display the display fragment for a supplier", function(assert) {
		this.spy(this.oMasterController, "_showDisplay");
		this.oMasterController.onInit();
		this.oMasterController.onSave();
		assert.ok(this.oMasterController._showDisplay.calledOnce, "showDisplay was called once");
		assert.strictEqual(this.oMasterController.byId("SupplierPanel").getContent()[0].getMetadata().getName(), "sap.m.HBox");
		
		this.oMasterController._showDisplay.restore();
	});

});