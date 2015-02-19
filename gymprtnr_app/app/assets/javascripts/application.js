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
      when("/search", {
        templateUrl: "sites/search.html",
        controller: "SportsCtrl"
      }).
      when("/update", {
        templateUrl: "sites/update.html",
        controller: "GymPrtnrsCtrl"
      }).
      when("/about", {
        templateUrl: "sites/about.html",
        controller: "GymPrtnrsCtrl"
      }).
      when("/contact", {
        templateUrl: "sites/contact.html",
        controller: "GymPrtnrsCtrl"
      }).
      when("/sports", {
        templateUrl: "sites/sports.html",
        controller: "SportsCtrl"
      }).
      when("/results/:id", {
        templateUrl: "sites/results.html",
        controller: "ResultsCtrl"
      }).
      otherwise("/index");
  }]);

  GymPrtnrApp.factory("Sport", ["$http", function ($http) {
    return {
      info: function () {
        return $http.get('http://localhost:3000/sports.json');
      },
      getSimilar: function (sportId) {
        return $http.get("/sports/" + sportId +"/users");
      }
      // add: function (sport) {
      //   return $http.post("sports.json", {sport: sport});
      // }
    }
  }]);

  GymPrtnrApp.factory("CurrentUser", ["$http", function ($http) {
    return {
      info: function () {
        return $http.get("user_info");
      },
      update: function (user) {
        return $http.patch("users.json", {user: user});
      },
      addSport: function(sport) {
        return $http.post("users_sports.json", {sport: sport});
      }
    }
  }]);

  GymPrtnrApp.controller("GymPrtnrsCtrl", ["$scope", "CurrentUser", "$location", function ($scope, CurrentUser, $location){


    $scope.users =[];
    CurrentUser.info()
      .success(function(user) {
        $scope.user = user;
        console.log(user);
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
    $scope.addUsersSports = function(sport) {
      var user = $scope.user;
      console.log("Sport was: ", sport);
      CurrentUser.addSport(sport).
        success(function () {
          $location.path("/sports");
        });
    };
  }]);


  GymPrtnrApp.controller("SportsCtrl", ["$scope", "$http", "Sport", "$routeParams", "$location", function ($scope, $http, Sport, $routeParams, $location) {


    Sport.info().then(function(resp) {
      console.log('Success', resp);
      $scope.sports = resp.data
    })

    $scope.sportSearch = function () {
      $location.path("/results/"+ this.sport.id);
    }


  }]);

  GymPrtnrApp.controller("ResultsCtrl", ["$scope", "$http", "Sport", "$routeParams", "$location", function ($scope, $http, Sport, $routeParams, $location) {

    $scope.results = [];
    console.log("ID", $routeParams.id)
    Sport.getSimilar($routeParams.id).
      success(function (users) {
        $scope.results  = $scope.results.concat(users);
      });

    $scope.contactUser = function () {
      var user_id = this.result.id;
      $http.post("/users/:id/contact").
        success(function (data) {
          
        });
    }
  }]);

})();