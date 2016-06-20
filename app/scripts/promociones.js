'use strict';

/**
 * @ngdoc function
 * @name nadmin1App.controller:VentaCtrl
 * @description
 * # VentaCtrl
 * Controller of the nadmin1App
 */


 angular.module('PromocionApp', ['ngGrid']).controller('PromocionCtrl', function ($scope, $http, $location) {
    $scope.venta = null;
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
     //Lee la lista de ventas
//     
//          $http({
//         method : 'GET',
//         url :  'Data/arregloVenta.json',
//         //cache: false,
//         headers:{'Access-Control-Allow-Credentials': 'true'
//                 }
//       
//   }).success(function(data, status, headers, config) {
//                 
//         $scope.status = status;
//         $scope.mydata = data.results;
//       //$scope.friendsWithCopy = HashKeyCopier.copyHashKeys( $scope.friendsWithCopy, $scope.listaUsuarios );
//         console.log("IMPRIMIENDO JSON "  + data.results);
//            //     console.log("lo que sea", JSON.stringify(data.results[0]).toLowerCase());
//         $location.path('/listaVenta');
//   }).error(function(data, status, headers, config) {
//         $scope.data = data || "Peticion fallida";
//         $scope.status = status;
//       alert("Error al mostrar la lista de usuarios, por favor actualize su navegador");
//   }); 
      
 
    
       //Paginacion y filtrado
   
       $scope.filterOptions = {
        filterText: '',
        useExternalFilter: true
    };
      $scope.totalServerItems = 0; 
  
        //Se debe sacar la propiedad paging options fuera del metodo de readlist para que pueda leer la propiedad en el 
       //gridOptions
       $scope.pagingOptions = {
        
        pageSizes: [10],
        pageSize: 10,
        currentPage: 1
    };
     
            
    /*Esta es la funcion encargada de que la data del json se muestre correctamente en la tabla del formulario     */
     
     /*Lo que hace el metodo es analizar el json de respuesta del servicio $http y organizar correctamente las figuras de cada sorteo y crear un arreglo de respuesta creado para que solomuestre los campos necesarios
     de dicha respuesta*/
     function respuestaTablaPromociones(largeLoad){
         
         //Esta variable ayudara a unir los grupos de figuras para que sean mostrados como un solo string
            var uneFigura = "";
            //Este es el arreglo que almacenara la data que se mostrara en la tabla dentro del formulario
              var respuesta = [];
              var aux = [];
         //Los ciclos se vuelven mas rapidos si se agregan como en la linea 142
              for(var i = 0, promociones= largeLoad.results.length; i< promociones; i++)
                  {
                      for(var j = 0,figuras = largeLoad.results[i].figuras.length; j<figuras;j++)
                          {
                              uneFigura = uneFigura + ", " + largeLoad.results[i].figuras[j].nombre;
                          }                      
                    //  aux.push(uneFigura.substring(1));
                     // console.log("todas las figuras", aux);
                      
                      
                      
                      var promocion = {
                          nombre: largeLoad.results[i].nombre,
                          estado: largeLoad.results[i].estado,
                          sorteo: null,
                          condicion1: largeLoad.results[i].condicion1,
                          condicion2: largeLoad.results[i].condicion2,
                          incremento: largeLoad.results[i].incremento,
                          premioBase: largeLoad.results[i].premioBase,
                          premioMonto: largeLoad.results[i].premioMonto,
                          figura: uneFigura.substring(1)
                          
                          
                      }
                      uneFigura ="";
                      
                      console.log("este es el objeto formado", promocion)
                      
                      var numeroSorteo = largeLoad.results[i].numSorteo;
                      
                      if(numeroSorteo == null || numeroSorteo == "")
                          {
                              promocion.sorteo = "Todos";
                          }
                      respuesta.push(promocion);
                      
                  }
              
                  console.log("aqui estan todas las figuras", respuesta);
         
         return respuesta;
         
     }     
    
     
    $scope.setPagingData = function(data,page,pageSize){
       // data = $scope.mydata;
        console.log("aaaaaa", data)
        
        //var seldata = (data.results)?data.results:data;
        var seldata = data
        //Con el if puedo verificar si algo es nulo, y preguntar por la propiedad del objeto o en este
        //caso la columna del json, en caso de que este definido
        
        // responde false si no esta definido
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
       
     
       
    //Aqui llama al servicio para listar las promociones y ponerlos dentro de la paginacion
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
      setTimeout(function () {
        var data;
          
        if (searchText) {
          var ft = searchText.toLowerCase();
          $http.get('Data/Promociones.json').success(function (largeLoad) {
              console.log("asdwww",largeLoad.results);
            
            data = respuestaTablaPromociones(largeLoad).filter(function(item) {
             //  console.log("imprimiendo",item) 
               var rest = (JSON.stringify(item).toLowerCase().indexOf(ft) != -1);
                console.log(item,rest);
              return rest;
                
            });
              
              
               //console.log("eeeeee",data)              
            $scope.setPagingData(data,page,pageSize);
          });
        } else {
          $http.get('Data/Promociones.json').success(function (largeLoad) {
            $scope.setPagingData(respuestaTablaPromociones(largeLoad),page,pageSize);
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
     
     
     
     
$scope.botonEditar = '<button type="button" class="btn btn-default btn-circle" name="detalle" ng-click="" > <i class="glyphicon glyphicon-edit"></i></button> ';
     
   $scope.botonBorrar = '<button type="button" class="btn btn-default btn-circle" name="detalle" ng-click=""> <i class="glyphicon glyphicon-remove"></i></button>';
     
    
     
     $scope.gridOptions = {
        data:  'myData',
         //El campo Field debe coincidir con su ubicacion dentro de la respuesta Json
           columnDefs: [         
         {field: 'nombre', displayName: 'Nombre'},
         {field: 'estado', displayName: 'Estado'},
         {field: 'sorteo', displayName: 'Sorteo(s)'},
         {field: 'condicion1', displayName: 'Condicion 1'},
         {field: 'condicion2', displayName: 'Condicion 2'},
         {field: 'incremento', displayName: 'Incremento'},
         {field: 'premioBase', displayName: 'Base del premio'},
         {field: 'premioMonto', displayName: 'Monto del premio'},
         {field: 'figura', displayName: 'Figura'},
         {displayName: 'Editar', cellTemplate: $scope.botonEditar},
         {displayName: 'Borrar', cellTemplate: $scope.botonBorrar},
        
               
       ],       
        filterOptions: $scope.filterOptions,  
       
        pagingOptions: $scope.pagingOptions, 
           
        enablePaging: true,
        //enablePinning: true,        
        totalServerItems: 'totalServerItems',
        keepLastSelected: true,
        multiSelect: false,
        showColumnMenu: true,
        showFilter: false,
        showGroupPanel: true,
        showFooter: true,
         enableColumnResize: true,
         //useExternalSorting: true,
        //useExternalFilter: true,
        //sortInfo: $scope.sortOptions,        
        useExternalSorting: false
           
    };  
  
     
     
     
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
        
     
          
    
            
            
};
           
//console.log("aaaaassdsdsdsd" + $scope.gridOptions.pagingOptions.pageSizes[0]);
       
       
  
       
        function erase(){
            
        };
        
        return service;
};
     
 
    
 $scope.refresh = true;
       
});