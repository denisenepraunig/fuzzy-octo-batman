sap.ui.define([
    "sap/ui/core/Control"
], function(Control){
    	"use strict";
    	
    	Control.extend("sapui5.demo.advanced.fragments.controls.MyGoogleMaps", {
    			// the control API:
			metadata : {
				properties : {   // setter and getter are created behind the scenes, incl. data binding and type validation
					address: "String",
					title: "String",
					zoom: {
						type: "int",
						defaultValue: 10
					}
				}
			},
			
			init: function(){
				var that = this;
				this._html = new sap.ui.core.HTML({content:"<div style='height:100%;width:100%;' id='" + that.getId()+"-map'></div>"});
				jQuery.getScript( "//maps.google.com/maps/api/js?sensor=false&key=YOURKEYHERE" )
				  .done(function() {
					that.fireEvent("mapsLoaded");
				  })
				  .fail(function( jqxhr, settings, exception ) {
				  	jQuery.sap.log.error("Google Maps has thrown exception "+ exception);
				});
			},
			
			// the part creating the HTML:
			renderer : function(oRm, oControl) { // static function, so use the given "oControl" instance instead of "this" in the renderer function
				oRm.write("<div style='height:400px;width:400px;margin:18px;' "); 
				oRm.writeControlData(oControl);  // writes the Control ID and enables event handling - important!
				oRm.write(">");
				oRm.renderControl(oControl._html);
				oRm.write("</div>");
			},
			
			// an event handler:
			onAfterRendering : function() {   
				if (!this.initialized) { // after the first rendering initialize the map
					this.attachEvent("mapsLoaded", function(){
						this.initialized = true;
						var options = {
							zoom: this.getZoom(), 
							mapTypeId:"roadmap"
						};
						this._map = new google.maps.Map(jQuery.sap.domById(this.getId()+"-map"),options);
						this.fireEvent("mapRendered");
					}, this);	
				}
			},
			
			
			setZoom: function(zoomValue) {
				this.setProperty("zoom", zoomValue, true); // no rerendering required
				if (this.getDomRef()) { // if rendered, directly let the map zoom
					this._map.setZoom(zoomValue);
				} else {
					this.attachEvent("mapRendered", function(){
						this._map.setZoom(zoomValue);
					}, this);
				}
			},
			
			setAddress: function(sAddress){
				this.setProperty("address", sAddress);
				if (this.getDomRef()) {				
					this._setAddress();
				} else {
					this.attachEvent("mapRendered", this._setAddress, this);
				}
			},

			setTitle: function(sValue){
				this.setProperty("title", sValue);
				if (this._marker){
					this._marker.setTitle(sValue);
				} 
			},

			_setAddress: function(){
					var that = this;
					var geocoder = new google.maps.Geocoder();
					geocoder.geocode( { 'address': this.getAddress()}, function(results, status) {
						if (status == google.maps.GeocoderStatus.OK) {
							that._latitude=results[0].geometry.location.lat();
							that._longitude=results[0].geometry.location.lng();
							that._latlng = new google.maps.LatLng(that._latitude,that._longitude);
							if (!that._map){
								that.attachEvent("mapRendered", function(){
									that._map.setCenter(that._latlng);
									that._setMarker();
								}, that);
							} else {
								that._map.setCenter(that._latlng);
								that._setMarker();
							}
						} 
					});	
			},

			_setMarker: function(){
				this._marker = new google.maps.Marker({
					position: this._latlng,
					map: this._map,
					title: this.getTitle()
				});
			}
    	});
});