'use strict';
var registroController = angular.module('registroController', [
    'usuariosController'
  ]);
var servicio = '';
 
registroController.controller('RegistroCtrl', function($http, $scope, servicioId) {
 
       if (servicioId.id.numero != null){
             localStorage.idLocal = servicioId.id.numero; 
       }
       console.log('La id seleccionada es:' + localStorage.idLocal);
       $http({
             method : 'GET',
             url : servicio + localStorage.idLocal
       }).success(function(data, status, headers, config) {
             $scope.status = status;
             $scope.obtenerUsuario = data;
       }).error(function(data, status, headers, config) {
             $scope.data = data || "Peticion fallida";
             $scope.status = status;
       });    
       
});
