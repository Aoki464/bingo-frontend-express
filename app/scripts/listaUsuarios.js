'use strict';
var usuariosController = angular.module('listaUsuariosApp', []);
var servicioUsuarios = 'http://appgym-udea-api.herokuapp.com/usuario';
var servicioSumarVisita = 'http://appgym-udea-api.herokuapp.com/usuario';


usuariosController.controller('UsuariosCtrl', function($http, $scope, $state, servicioId) {
       
   $http({
         method : 'GET',
         url :  servicioUsuarios
   }).success(function(data, status, headers, config) {
         $scope.status = status;
         $scope.listaUsuarios = data;
         console.log("IMPRIMIENDO JSON "  + data);
   }).error(function(data, status, headers, config) {
         $scope.data = data || "Peticion fallida";
         $scope.status = status;
   });    
   
   $scope.edit = function edit(row){        
    servicioId.id.numero = row.entity.id;
   };
   
    $scope.botonDetalle = '<button type="button" class="btn btn-default btn-circle" name="detalle" ng-click="edit(row)" ui-sref="detalle"> <i class="glyphicon glyphicon-search"></i></button> '
    
    
   $scope.sumar = function sumar(){
       
       $http({
             method : 'GET',
             url :  servicioSumarVisita
       }).success(function(data, status, headers, config) {
             $scope.status = status;
             $state.go($state.$current, null, { reload: true });
       }).error(function(data, status, headers, config) {
             $scope.data = data || "Peticion fallida";
             $scope.status = status;
       }); 
       console.log("Click en sumar");
   };
    
    $scope.botonSumarVisita = '<button type="button" class="btn btn-default btn-circle" name="detalle" ng-click="sumar()" > <i class="glyphicon glyphicon-plus"></i></button> '
    
    $scope.gridOpciones = { 
       data: 'listaUsuarios',
       columnDefs: [
         {field: 'id', displayName: 'Cedula'},
         {field: 'name', displayName: 'Nombre'},
         {field: 'lastname', displayName: 'Apellido'},
         {field: 'email', displayName: 'E-mail'},
         {field: 'na', displayName: 'Visitas Totales'},
         {displayName: 'Sumar Visita', cellTemplate: $scope.botonSumarVisita},
         {displayName: 'Editar Usuario', cellTemplate: $scope.botonDetalle}
       ],
    };
});
