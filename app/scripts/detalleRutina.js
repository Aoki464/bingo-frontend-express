'use strict';
var registroController = angular.module('detalleRutinaApp', []);
var servicioDetalle = 'http://appgym-udea-api.herokuapp.com/rutina/345';
 
registroController.controller('RutinaCtrl', function($http, $scope, servicioId) {
 
      /* if (servicioId.id.numero != null){
             localStorage.idLocal = servicioId.id.numero; 
       }*/
    
       console.log('La id seleccionada es:' + localStorage.idLocal);
       $http({
             method : 'GET',
             url : servicioDetalle //+ localStorage.idLocal
       }).success(function(data, status, headers, config) {
             $scope.status = status;
             $scope.rutina = data;
           console.log(data);
       }).error(function(data, status, headers, config) {
             $scope.data = data || "Peticion fallida";
             $scope.status = status;
       });    
       
});
