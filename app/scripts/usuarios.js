'use strict';
var usuariosController = angular.module('usuariosController', [ 
    'ngGrid'
  ]);

var servicio = 'http://appgym-udea-api.herokuapp.com/usuario/';

usuariosController.controller('CuadriculaCtrl', function($http, $scope, servicioId) {
       
   $http({
         method : 'GET',
         url :  servicio
   }).success(function(data, status, headers, config) {
         $scope.status = status;
         $scope.obtenerJson = data;//cuando  el servicio se cambia quemados por obtenerJson
       console.log("IMPRIMIENDO JSON "  + data);
   }).error(function(data, status, headers, config) {
         $scope.data = data || "Peticion fallida";
         $scope.status = status;
   });    
   
   $scope.edit = function edit(row){        
    servicioId.id.numero = row.entity.id;
   };
   
    $scope.botonDetalle = '<button type="button" class="btn btn-default btn-circle" name="detalle" ng-click="edit(row)" ui-sref="registro"> <i class="glyphicon glyphicon-search"></i></button> '
    
    $scope.gridOpciones = { 
       data: 'obtenerJson',
       columnDefs: [
         {field: 'id', displayName: 'Cedula'},
         {field: 'name', displayName: 'Nombre'},
         {field: 'lastname', displayName: 'Apellido'},
         {field: 'email', displayName: 'E-mail'},
         {field: 'na', displayName: 'Visitas Totales'},
         {field: 'sumarVisita', displayName: 'Sumar Visita'},
         {displayName: 'Editar Usuario', cellTemplate: $scope.botonDetalle}
       ],
    };
});
