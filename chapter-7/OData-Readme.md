# OData-Readme

If you want to use the OData examples, please make sure that you have a **northwind** destination. Please refer to Appendix B how to create such a destination.

If you want to use the write-examples then make sure to request your session token at [http://services.odata.org/V2/]. Click **Browse the Full Access (Read-Write) Service** and copy the token.

## Example
*  Generated URL: http://services.odata.org/V2/(S(**3wekrrpefcsxstzudsyc3xdw**))/OData/OData.svc/
* Copy token: **3wekrrpefcsxstzudsyc3xdw**
* Modify the manifest.json:
```
	"dataSources": {
			"mainService": {
				"uri": "/destinations/northwind/V2/(S(3wekrrpefcsxstzudsyc3xdw))/OData/OData.svc/",