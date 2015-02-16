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
//= require turbolinks
//= require_tree .
(function(){

  var GymPrtnrApp = angular.module("GymPrtnrApp", [
    "ngRoute"
    ]);

  GymPrtnrApp.config(["$routeProvider", "$locationProvider", function (){
    $routeProvider.
      when("users/create", {
        templateUrl: "views/layouts/application.html",
        controller: "GymPrtnrsCtrl"
      });
  }]);

  GymPrtnrApp.controller("GymPrtnrsCtrl", ["$scope", "Users", function ($scope, Users){
    $scope.users =[];

    $scope.updateUser = function() {
      var user = $scope.newUser;
      var that = this;
      Users.update(user).
      error(function () {
        $scope.formError = true;
      }).
      success(function (data) {
        $scope.User = {};
      });
    };


  }]);

})();