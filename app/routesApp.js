'use strict';
//aqui pongo el nombre de los servicios que creo
var inicioApp = angular.module('inicioApp', [
    'ui.router',
    'ngGrid',
    'loginApp',
    //'Paginacion',
    'listaUsuariosApp',
    'detalleRutinaApp',
    'FiguraApp',
    'ConfiguracionesApp',
    'AsignacionApp',
    'VentaApp'
]); 
 
inicioApp.config(['$stateProvider', '$urlRouterProvider',
                  function($stateProvider, $urlRouterProvider){
      
      // For any unmatched url, send to /login
      $urlRouterProvider.otherwise("/venta")
      
      $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'       

        })
//      $stateProvider
        .state('venta', {
            url: '/venta',
            templateUrl: 'views/venta.html',
            controller: 'VentaCtrl'       

        })
        .state('listaVenta', {
            url: '/listaVenta',
            templateUrl: 'views/listaVenta.html',
            controller: 'VentaCtrl'       

        })
      .state('listaFiguras', {
            url: '/listaFiguras',
            templateUrl: 'views/listaFiguras.html',
            controller: 'FiguraCtrl'       

        })
      .state('listaConfiguraciones', {
            url: '/listaConfiguraciones',
            templateUrl: 'views/configuraciones.html',
            controller: 'ConfiguracionesCtrl'       

        })
      .state('listaAsignaciones', {
            url: '/listaAsignacion',
            templateUrl: 'views/listaAsignacion.html',
            controller: 'AsignacionCtrl'       

        })
		.state('usuarios', {
            url: '/usuarios',
            templateUrl: 'views/listaUsuarios.html',
            controller: 'UsuariosCtrl'       
             
        })   		
        .state('detalle', {
            url: '/usuarios/registro/',
            templateUrl: 'views/detalleRutina.html',
            controller: 'RutinaCtrl'
        });         
}]);
 
inicioApp.service('servicioId', function() {
       return {
             id : {}
       };
});