angular.module('mcdapimid.routes', [])

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('accountDetails', {
                url: '/account-details',
                templateUrl: 'templates/account-details.html',
                controller: 'AccountDetailsController'
            }).state('transactionDetails', {
                url: '/transaction-details/:accountId/:id',
                templateUrl: 'templates/transaction-details.html',
                controller: 'TransactionDetailsController'
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/account-details');
    });