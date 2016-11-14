var express = require('express');
var bodyParser = require('body-parser');

var fs = require('fs')
var app = express();
var merchantIdentifier = require('mastercard-merchant-identifier');
var MasterCardAPI = merchantIdentifier.MasterCardAPI;

var dummyData = null;
fs.readFile('www/data/dummy-response.json', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    dummyData = JSON.parse(data);
});

var config = {
    p12file: process.env.KEY_FILE || null,
    p12pwd: process.env.KEY_FILE_PWD || 'keystorepassword',
    p12alias: process.env.KEY_FILE_ALIAS || 'keyalias',
    apiKey: process.env.API_KEY || null,
    sandbox: process.env.SANDBOX || 'true',
}

var useDummyData = null == config.p12file;
if (useDummyData) {
    console.log('p12 file info missing, using dummy data')
} else {
    console.log('has p12 file info, using MasterCardAPI')
    var authentication = new MasterCardAPI.OAuth(config.apiKey, config.p12file, config.p12alias, config.p12pwd);
    MasterCardAPI.init({
        sandbox: 'true' === config.sandbox,
        authentication: authentication
    });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('www'));

app.post('/query', function (req, res) {
    if (useDummyData) {
        res.json(dummyData);
    } else {
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

    }
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});






