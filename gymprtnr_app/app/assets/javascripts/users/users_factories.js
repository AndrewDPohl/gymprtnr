var GymPrtnrsFactories = angular.module("GymPrtnrsFactories", []);

// We want a factory that is going to help us
// when doing CRUD with a Contact or Contacts
// i.e. we need something to help do http
GymPrtnrsFactories.factory("Contacts", ["$http", function($http){
  return {
    all: function() {
      return $http.get("/contacts.json");
    },
    create: function(contact){
      return $http.post("/contacts.json", {contact: contact});
    },
    update: function(contact){
      return $http.patch("/contacts/" + contact.id + ".json", {contact: contact});
    },
    delete: function(contact){
      return $http.delete("/contacts/" + contact.id + ".json");
    }
  };
}]);