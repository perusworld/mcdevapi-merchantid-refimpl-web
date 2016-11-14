angular.module('mcdapimid', ['ionic', 'mcdapimid.controllers', 'mcdapimid.routes', 'mcdapimid.services', 'mcdapimid.filters', 'mcdapimid.api', 'isoCurrency', 'isoCurrency.common'])

  .config(
  [function () {
  }]
  )

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
    });
  });
