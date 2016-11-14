angular.module('mcdapimid.filters', [])
.filter('tocurrency', ['$filter', 'iso4217', function ($filter, iso4217) {
    return function (input, symbol, convert) {
        var ret = "";
        if (symbol) {

        } else {
            symbol = 'USD';
        }
        var currency = iso4217.getCurrencyByCode(symbol);
        ret = $filter('currency')(input, currency.symbol, currency.fraction);
        return ret;
    };
}]);