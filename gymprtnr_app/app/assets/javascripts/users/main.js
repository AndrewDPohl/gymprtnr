(function () {

// Name the App as an angular module.  
// This will take in the Controllers and Factories
// as dependencies
var GymPrtnrsApp = angular.module("GymPrtnrsApp", [
    "GymPrtnrsCtrls",
    "GymPrtnrsFactories"
  ]);

GymPrtnrsApp.config(["$httpProvider", function($httpProvider){
  $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('name', 'cell', 'home', 'address')
}]);

})();