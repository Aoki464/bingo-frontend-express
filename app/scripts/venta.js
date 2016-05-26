'use strict';

/**
 * @ngdoc function
 * @name nadmin1App.controller:VentaCtrl
 * @description
 * # VentaCtrl
 * Controller of the nadmin1App
 */
 angular.module('VentaApp', []).controller('VentaCtrl', function ($scope, $http) {
    $scope.venta = null;
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
   $scope.administrarVenta = function (){
        
        var service = { 
            
            save:save,
            update: update,
            read:read,
            erase: erase
                        
        };
        
        //Aqui vendrian las llamadas a los servicios encargados del crud
        
        function save(){
            
        };
        function update(){
            
        };
        function read(){
            
              $http({
             method : 'GET',           
             url : 'Data/Venta.Json',  
             headers:{'Access-Control-Allow-Credentials': 'true'}
       }).success(function(data, status, headers, config) {
             $scope.status = status;
           // La linea siguiente, vincula el javascript con la vista html para motrar datos
             $scope.usuario = data;           
           console.log("Consumo ok");            
           //$scope.usuario = data;
           console.log(data);
            if (data.id == "" || data.id == null || data.id == undefined)
            {                           
                alert("Esta venta no existe");
                
                //$scope.venta.id = data.id;
                
                alert(data.id);                
                
            }
           else
           {      
               $scope.venta = data;
               alert(data.id);
           }
       }).error(function(data, status, headers, config) {
             $scope.data = data || "Peticion fallida";
             $scope.status = status;             
       });
            
        };
        function erase(){
            
        };
        
        return service;
    }
    
    
  });
