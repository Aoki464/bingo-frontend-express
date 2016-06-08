'use strict';

/**
 * @ngdoc function
 * @name nadmin1App.controller:VentaCtrl
 * @description
 * # VentaCtrl
 * Controller of the nadmin1App
 */


 angular.module('SorteoApp', ['ngGrid']).controller('SorteoCtrl', function ($scope, $http, $location) {
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
     
            
    //$scope.gridOptions.pagingOptions = $scope.pagingOptions;
            console.log("asdfasdfasf" + $scope.pagingOptions.pageSizes[0]);
            if($scope.pageSize == 10)
            {
                console.log("alert");
            }
    
     //console.log("aaaaassdsdsdsd" + $scope.pagingOptions.pageSizes[0]);
    
    $scope.setPagingData = function(data,page,pageSize,premios){
       // data = $scope.mydata;
        console.log("aaaaaa", data)
        
        //var seldata = (data.results)?data.results:data;
        var seldata = data.results
        //Con el if puedo verificar si algo es nulo, y preguntar por la propiedad del objeto o en este
        //caso la columna del json, en caso de que este definido
        
        // responde false si no esta definido
        if(!data.results){
            seldata = data;
        }
      var pagedData = seldata.slice((page - 1) * pageSize, page * pageSize);
      $scope.myData = pagedData;
        $scope.listaPremios = premios;
        console.log(premios);
        
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
          $http.get('Data/sorteos.json').success(function (largeLoad) {
              console.log("asdwww",largeLoad.results);             
              
            data = largeLoad.results.filter(function(item) {
             //  console.log("imprimiendo",item) 
               var rest = (JSON.stringify(item).toLowerCase().indexOf(ft) != -1);
                console.log(item,rest);
              return rest;
                
            });
               //console.log("eeeeee",data)   
              
              
              
            $scope.setPagingData(data,page,pageSize);
          });
        } else {
          $http.get('Data/sorteos.json').success(function (largeLoad) {
              
                //Seccion para obtener las figuras y los premios
              var uneFigura = "";
              var unePremio = "";
              var l = largeLoad.results.length;
              console.log(l);
              //var json = (JSON.stringify(largeLoad.results);
                console.log("data", largeLoad.results[0].premios[0].premioGarantizado);
               //console.log("lo que sea",largeLoad.results);
              var arrayFiguras = [];
              var arrayPremios = [];
                for(var i = 0; i<largeLoad.results.length; i++)     // for(var listapremio in largeLoad.results)
                  {
                      //console.log("lo que sea",largeLoad.results[i]);                  
                      
                      arrayPremios.push(largeLoad.results[i].premios);
                      
                    for(var j = 0; j< largeLoad.results[i].premios.length;j++)   //  for (premio in listapremio.premios)
                          {     
                               arrayFiguras.push(largeLoad.results[i].premios[j].figuras);
                                                           
                          }
                      
                      
                  }              
              console.log("Todos los premios",arrayPremios);
              console.log("Todas las figuras",arrayFiguras); 
              
              
//              for (var p = 0; p<arrayPremios.length; p++)
//                  {
//                      console.log("Todos los premios",arrayPremios[p]);
//                      unePremio = unePremio + "," + arrayPremios[p][0].premioGarantizado;
//                      console.log(unePremio);
//                  }
              
              
            $scope.setPagingData(largeLoad,page,pageSize, arrayPremios);
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
        //Con esto regresa a la pagina 1 y realiza la busqueda, significa que cada vez que busque, siempre quedara en la pagina //1
        
        $scope.pagingOptions.currentPage = 1;
      if (newVal !== oldVal) {
          //$scope.pagingOptions.currentPage = 1;
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
      }
    }, true);
     
     
     
     
     
      function unirPremios(premios){
         
         console.log("entro en metodo");
         
     }
     
       
     
//      $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
     $scope.gridOptions = {
        data:  'myData',
         //El campo Field debe coincidir con su ubicacion dentro de la respuesta Json
           columnDefs: [
         {field: 'id', displayName: 'N° de Sorteo'},
         {field: 'fecha', displayName: 'Fecha'},
         {field: 'tipoSorteo', displayName: 'Tipo de sorteo'},
         {field: 'tipoPremio', displayName: 'Tipo de premio'},
         {field: 'estadoSorteo', displayName: 'Estado'},
         {field: 'valorCarton', displayName: 'Valor del carton'},
         {field: 'inscrito', displayName: 'Inscritos'},
         {field: 'listaPremios', displayName: 'Premios'}  
               
         
               
      
                
         
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