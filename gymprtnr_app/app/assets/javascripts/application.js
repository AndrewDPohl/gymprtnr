// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require angular
//= require angular-route
//= require turbolinks
//= require_tree .
(function(){

  var GymPrtnrApp = angular.module("GymPrtnrApp", [
    "ngRoute"
    ]);

  GymPrtnrApp.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }]);

  GymPrtnrApp.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider){
    $routeProvider.
      when("/index", {
        templateUrl: "sites/index.html",
        controller: "GymPrtnrsCtrl"
      }).
      when("/update", {
        templateUrl: "sites/update.html",
        controller: "GymPrtnrsCtrl"
      }).
      when ("/about", {
        templateUrl: "sites/about.html",
        controller: "GymPrtnrsCtrl"
      }).
      when ("/contact", {
        templateUrl: "sites/contact.html",
        controller: "GymPrtnrsCtrl"
      }).
      when ("/search", {
        templateUrl: "sites/search.html",
        controller: "SportsCtrl"
      });
  }]);

 GymPrtnrApp.factory("Sports", ["$http", function ($http) {
    return {
      info: function () {
        return $http.get("sports");
      }
    }
  }]);

  GymPrtnrApp.factory("CurrentUser", ["$http", function ($http) {
    return {
      info: function () {
        return $http.get("user_info");
      },
      update: function (user) {
        return $http.patch("users.json", {user: user});
      }
    }
  }]);

  GymPrtnrApp.controller("GymPrtnrsCtrl", ["$scope", "CurrentUser", "$location", function ($scope, CurrentUser, $location){


    $scope.users =[];
    CurrentUser.info()
      .success(function(user) {
        $scope.user = user;
      });
    $scope.updateUser = function() {
     var user = $scope.user;
     CurrentUser.update(user).
      error(function () {
        $scope.formError = true;
      }).
      success(function (data) {
        $location.path("/")
      });
    };
  }]);


  GymPrtnrApp.controller("SportsCtrl", ["$scope", "$http", "Sports", "$location", function ($scope, $http, Sports, $location) {
    // $scope.sports = Sports.query();
    $scope.sports = [];
    // console.log(sports);
    Sports.info()
    .success(function(sport) {
      console.log(sport);
    });
  }]);

})();