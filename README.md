# Mastercard Developer API - Merchant ID - Reference Implementation - Angular/Express #

## [Demo](https://perusworld.github.io/mcdevapi-merchantid-refimpl-web/) ##

## Setup ##

1.Checkout the code
```bash
git clone https://github.com/perusworld/mcdevapi-merchantid-refimpl-web.git
```
2.Run bower install
```bash
bower install
```
3.Run npm install
```bash
npm install
```

## Running using dummy data ##
1.Start the app
```bash
node index.js
```
2.Open browser and goto [http://localhost:3000](http://localhost:3000)

## Running using MasterCard API ##
Make sure you have registered and obtained the API keys and p12 files from [https://developer.mastercard.com/](https://developer.mastercard.com/)

1.Start the app
```bash
export KEY_FILE=<your p12 file location>
export API_KEY=<your api key>
node index.js
```
2.Open browser and goto [http://localhost:3000](http://localhost:3000)

#### Some of the other options ####
```bash
export KEY_FILE_PWD=<p12 key password defaults to keystorepassword>
export KEY_FILE_ALIAS=<p12 key alias defaults to keyalias>
export SANDBOX=<sandbox or not defaults to true>
```
## Code ##
### Backend API Initialization ###
```javascript
var merchantIdentifier = require('mastercard-merchant-identifier');
var MasterCardAPI = merchantIdentifier.MasterCardAPI;
var config = {
    p12file: process.env.KEY_FILE || null,
    p12pwd: process.env.KEY_FILE_PWD || 'keystorepassword',
    p12alias: process.env.KEY_FILE_ALIAS || 'keyalias',
    apiKey: process.env.API_KEY || null,
    sandbox: process.env.SANDBOX || 'true',
}
 var authentication = new MasterCardAPI.OAuth(config.apiKey, config.p12file, config.p12alias, config.p12pwd);
    MasterCardAPI.init({
        sandbox: 'true' === config.sandbox,
        authentication: authentication
    });
```
### Backend API Call (using merchantId sent as part of JSON post) ###
```javascript
app.post('/query', function (req, res) {
    var requestData = {
        "Type": "FuzzyMatch",
        "MerchantId": req.body.merchantId
    };
    merchantIdentifier.MerchantIdentifier.query(requestData, function (error, data) {
        if (error) {
            console.error("An error occurred");
            console.dir(error, { depth: null });
            res.json({
                "MerchantIds": {
                    "Message": "0 merchants found.",
                    "ReturnedMerchants": {
                        "Merchant": []
                    }
                }
            });
        }
        else {
            res.json(data);
        }
    });
});

```
### Angular Service to query merchant details by merchant id provided by the acquirer ###
```javascript
angular.module('mcdapimid.api', [])

    .service('MIDApi', ['$http', function ($http) {
        return {
            query: function (merchantId, callback) {
                var data = {
                    merchantId: merchantId
                }
                $http.post('/query', data).then(function successCallback(response) {
                    callback(response.data)
                });
            }
        };

    }])

    .service('AccountService', ['MIDApi', function (MIDApi) {
        var ret = {
            query: function (query, callback) {
                MIDApi.query(query, function (merchantResp) {
                    callback(merchantResp)
                });
            }
        };
        return ret;

    }]);
```
### Angular Controller to get merchant details by merchant id provided by the acquirer ###
```javascript
    .controller('TransactionDetailsController', ['$scope', '$stateParams', 'Session', 'AccountService',
    function ($scope, $stateParams, Session, AccountService) {
        $scope.merchant = {};
        var query = "MICROSOFT";
        AccountService.query(query, function (data) {
            if (null != data && 0 < data.MerchantIds.ReturnedMerchants.Merchant.length) {
                $scope.merchant = data.MerchantIds.ReturnedMerchants.Merchant[0];
            }
        });
    }]);
```
### Angular Template to display the merchant details ###
```html
    <a class="item item-icon-left">
        <i class="icon ion-home"></i> Merchant
        <span class="item-note">{{transaction.merchant || merchant.LegalCorporateName}}</span>
    </a>
    <a ng-if="merchant.Address" class="item item-icon-left">
        <i class="icon ion-location"></i>
        <h2>Address</h2>
        <p>{{merchant.Address.Line1}} {{merchant.Address.Line2}} {{merchant.Address.City}} {{merchant.Address.PostalCode}}</p>
    </a>
```
