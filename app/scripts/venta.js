'use strict';

/**
 * @ngdoc function
 * @name nadmin1App.controller:VentaCtrl
 * @description
 * # VentaCtrl
 * Controller of the nadmin1App
 */


 angular.module('VentaApp', ['ngGrid']).controller('VentaCtrl', function ($scope, $http, $location, servicioId) {
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
            readList: readList,
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
             $scope.listaVenta = data;           
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
       
        function readList(){          
        
           $scope.edit = function edit(row){        
    servicioId.id.numero = row.entity.id;    
   };
          
                  $http({
         method : 'GET',
         url :  'Data/arregloVenta.json',
         //cache: false,
         headers:{'Access-Control-Allow-Credentials': 'true'
                 }
       
   }).success(function(data, status, headers, config) {
                 
         $scope.status = status;
         $scope.mydata = data.results;
       //$scope.friendsWithCopy = HashKeyCopier.copyHashKeys( $scope.friendsWithCopy, $scope.listaUsuarios );
         console.log("IMPRIMIENDO JSON "  + data.results);
            //     console.log("lo que sea", JSON.stringify(data.results[0]).toLowerCase());
         $location.path('/listaVenta');
   }).error(function(data, status, headers, config) {
         $scope.data = data || "Peticion fallida";
         $scope.status = status;
       alert("Error al mostrar la lista de usuarios, por favor actualize su navegador");
   }); 
      
 
    
       //Paginacion y filtrado
   
       $scope.filterOptions = {
        filterText: '',
        useExternalFilter: true
    };
       
    $scope.pagingOptions = {
        pageSizes: [10, 20, 30],
        pageSize: 10,
        currentPage: 1
    };
    
     $scope.totalServerItems = 0;
    
    $scope.setPagingData = function(data,page,pageSize){
       // data = $scope.mydata;
        console.log("aaaaaa", data)
        
        //var seldata = (data.results)?data.results:data;
        var seldata = data.results
        //Con el if puedo verificar si algo es nulo, y preguntar por la propiedad del objeto o en este
        //caso la columna del json, en caso de que este definido
        
        // responde false si no esta defino
        if(!data.results){
            seldata = data;
        }
      var pagedData = seldata.slice((page - 1) * pageSize, page * pageSize);
      $scope.myData = pagedData;
        
        console.log("fff",pagedData);
      
        $scope.totalServerItems = seldata.length;
      if (!$scope.$$phase) {
        $scope.$apply();
      }
    };
       
       
    //Aqui llama al servicio para listar los usuarios y ponerlos dentro de la paginacion
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
      setTimeout(function () {
        var data;
          
        if (searchText) {
          var ft = searchText.toLowerCase();
          $http.get('Data/arregloVenta.json').success(function (largeLoad) {
              console.log("asdwww",largeLoad.results);
            
            data = largeLoad.results.filter(function(item) {
             //  console.log("imprimiendo",item) 
               var rest = (JSON.stringify(item).toLowerCase().indexOf(ft) != -1);
                console.log(item,rest);
              return rest;
                
            });
               console.log("eeeeee",data)
            $scope.setPagingData(data,page,pageSize);
          });
        } else {
          $http.get('Data/arregloVenta.json').success(function (largeLoad) {
            $scope.setPagingData(largeLoad,page,pageSize);
          });
        }
      }, 100);
    };

    
    
    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function (newVal, oldVal) {
      
      if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
      }
    }, true);

    
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        //Con esto regresa a la pagina 1 y realiza la busqueda, significa que cada vez que busque, siempre quedara en la pagina 1
        
        $scope.pagingOptions.currentPage = 1;
      if (newVal !== oldVal) {
          //$scope.pagingOptions.currentPage = 1;
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
      }
    }, true);
            
            
};
           

       
       
  
       
        function erase(){
            
        };
        
        return service;
};
       
      //console.log("asd",$scope.data);
       $scope.gridOptions = {
        data:  'myData',
           columnDefs: [
         {field: 'id', displayName: 'id'},
         {field: 'fecha', displayName: 'fecha'}
         
       ],       
        filterOptions: $scope.filterOptions,
        enablePaging: true,
        //enablePinning: true,
        pagingOptions: $scope.pagingOptions, 
        totalServerItems: 'totalServerItems',
        keepLastSelected: true,
        multiSelect: false,
        showColumnMenu: true,
        showFilter: true,
        showGroupPanel: true,
        showFooter: true,
        //useExternalFilter: true,
        //sortInfo: $scope.sortOptions,        
        useExternalSorting: false
           
       
           
           
    };  
    
 
       
});
