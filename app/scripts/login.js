'use strict';
var loginController = angular.module('loginApp', []);
 
var servicioLogin = '';

loginController.controller('LoginCtrl', function($http, $scope, $location) {
    
    
    $scope.enviar = function enviar(){
         $location.path('/usuarios'); //redirige cuando el logeo es ok 
    
       $http({
             method : 'GET',
             url : servicioLogin
       }).success(function(data, status, headers, config) {
            $scope.status = status;
            $scope.obtenerAdmin = data;
            console.log("Imprimiendo!!!"+data);
            $location.path('/usuarios'); //redirige cuando el logeo es ok
       }).error(function(data, status, headers, config) {
             $scope.data = data || "Peticion fallida";
             $scope.status = status;
       });
   };
    
       
});
