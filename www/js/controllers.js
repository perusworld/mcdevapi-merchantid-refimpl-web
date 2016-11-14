angular.module('mcdapimid.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

    })

    .controller('AccountDetailsController', ['$scope', '$stateParams', 'Session', 'AccountService',
        function ($scope, $stateParams, Session, AccountService) {
            $scope.account = {};
            AccountService.get(1, function (account) {
                $scope.$apply(function () {
                    $scope.account = account;
                });

            });
        }])

    .controller('TransactionDetailsController', ['$scope', '$stateParams', 'Session', 'AccountService',
        function ($scope, $stateParams, Session, AccountService) {
            $scope.account = {};
            $scope.transaction = {};
            $scope.merchant = {};
            AccountService.transaction($stateParams.accountId, $stateParams.id, function (account, transaction) {
                $scope.$apply(function () {
                    $scope.account = account;
                    $scope.transaction = transaction;
                    if (null == $scope.transaction.merchant) {
                        AccountService.query(transaction.query, function (data) {
                            if (null != data && 0 < data.MerchantIds.ReturnedMerchants.Merchant.length) {
                                $scope.merchant = data.MerchantIds.ReturnedMerchants.Merchant[0];
                            }
                        });
                    }
                });

            });

        }]);
