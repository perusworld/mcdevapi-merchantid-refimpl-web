angular.module('mcdapimid.services', [])

    .factory('Session', function ($http) {
        var Session = {
            data: {},
            set: function (key, value) {
                Session.data[key] = value;
            },
            get: function (key) {
                return Session.data[key];
            }
        };
        return Session;
    })

    .factory('BlankFactory', [function () {

    }])

    .service('AccountService', ['MIDApi', function (MIDApi) {
        var accounts = [
            {
                id: 1,
                type: 'checking',
                name: 'Checking 123',
                balance: '12345.67',
                transactions: [
                    {
                        id: 4,
                        date: '09/03/2016',
                        desc: 'STARBUCKS #087345',
                        amt: 8.99,
                        icon: 'coffee',
                        merchant: 'STARBUCKS',
                        category: 'Food'
                    },
                    {
                        id: 3,
                        date: '09/02/2016',
                        desc: '12th Street #4554',
                        amt: 9.99,
                        category: 'Store',
                        merchant: null,
                        query: 'MICROSOFT',
                        icon: 'bag'
                    },
                    {
                        id: 2,
                        date: '09/01/2016',
                        desc: 'WAL-MART #1245',
                        amt: 80.99,
                        category: 'Shopping',
                        merchant: 'WAL-MART',
                        icon: 'ios-cart'
                    },
                    {
                        id: 1,
                        date: '09/01/2016',
                        desc: 'STARBUCKS #8768768',
                        amt: 12.56,
                        icon: 'coffee',
                        merchant: 'STARBUCKS',
                        category: 'Food'
                    }
                ]
            }
        ];
        var ret = {
            get: function (id, callback) {
                setTimeout(function () {
                    callback(accounts.find(function(account) { return id == account.id }))
                }, 1000);
            },
            transaction: function (account, id, callback) {
                ret.get(account, function (account) {
                    callback(account, account.transactions.find(function (trans) { return trans.id == id }));
                })
            },
            query: function (query, callback) {
                MIDApi.query(query, function (merchantResp) {
                    callback(merchantResp)
                });
            }
        };
        return ret;

    }]);