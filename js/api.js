angular.module('mcdapimid.api', [])


    .service('MIDApi', ['$http', function ($http) {
        return {
            query: function (merchantId, callback) {
                var data = {
                    merchantId: merchantId
                }
                $http.post('/query', data).then(function successCallback(response) {
                    callback(response.data)
                }, function errorCallback(response) {
                    $http.get('/data/dummy-response.json').then(function successCallback(response) {
                        callback(response.data)
                    }, function errorCallback(response) {
                    });
                });
            }
        };

    }]);

