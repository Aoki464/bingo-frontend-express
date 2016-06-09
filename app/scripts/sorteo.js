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
     
            
    
            console.log("asdfasdfasf" + $scope.pagingOptions.pageSizes[0]);
            if($scope.pageSize == 10)
            {
                console.log("alert");
            }
    
     
    
     /*Esta es la funcion encargada de que la data del json se muestre correctamente en la tabla del formulario     */
     
     /*Lo que hace el metodo es analizar el json de respuesta del servicio $http y organizar correctamente los premios y las figuras de cada sorteo y crear un arreglo de respuesta creado para que solo*/
      function respuestaTablaSorteo(largeLoad){
         //largeload = 0;
          
          //  var arrayFiguras = [];
              //var arrayPremios = [];
              
            //  var auxPremios = [];
              
               var uneFigura = "";
              var unePremio = "";
              //Este es el arreglo que almacenara la data que se mostrara en la tabla dentro del formulario
              var respuesta = [];
              //Los ciclos se vuelven mas rapidos si se agregan como en la linea 142
                for(var i = 0, results = largeLoad.results.length; i<results; i++)     // for(var listapremio in largeLoad.results)
                  {
                      //console.log("lo que sea",largeLoad.results[i]);                  
                      
                    //  arrayPremios.push(largeLoad.results[i].premios);
                      
                    for(var j = 0, premios = largeLoad.results[i].premios.length; j< premios;j++)   //  for (premio in listapremio.premios)
                    {     
                              // arrayFiguras.push(largeLoad.results[i].premios[j].figuras);
                        unePremio = unePremio + ", " + largeLoad.results[i].premios[j].premioGarantizado;
                              
                         
                            for(var k = 0, figuras = largeLoad.results[i].premios[j].figuras.length; k < figuras; k++)
                              {
                                  uneFigura = uneFigura + ", " + largeLoad.results[i].premios[j].figuras[k].nombre;
                              }
                                   
                              
                    }
                      
                      /*Deben estar en esta parte del ciclo ya que los datos del json estan especificamente dentro del arreglo de premios, para entenderlo, ver el json de respuesta*/
                      
                     // arrayPremios.push(unePremio.substring(1));
                      console.log("premios" + unePremio.substring(1));
                      
                      //arrayFiguras.push(uneFigura.substring(1));
                      console.log("Figuras" + uneFigura.substring(1));
                     /* Cree un nuevo objeto para almacenar correctamente la respuesta de la consulta $http y poder mostrarla en
                      la tabla correspondiente a la lista de sorteos*/
                      var sorteo = {
                          id: largeLoad.results[i].id,
                          fecha: largeLoad.results[i].fecha,
                          tipoSorteo: largeLoad.results[i].tipoSorteo,
                          tipoPremio: largeLoad.results[i].tipoPremio,
                          estadoSorteo: largeLoad.results[i].estadoSorteo,
                          valorCarton: largeLoad.results[i].valorCarton,
                          inscritos: largeLoad.results[i].inscrito,
                          premios: unePremio.substring(1),
                          figuras: uneFigura.substring(1)                             
                      };
                      respuesta.push(sorteo);
                      
                       /*Tengo que limpiar los string que agrupan los premios y las figuras para que almacene cada grupo
                       individualmente*/
                               unePremio = "";
                      
                            
                               uneFigura = "";
                      
                      
                      
                  }       
              
          
              console.log("todos los sorteos aqui", respuesta);
              
          
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
    
     
       
    //Aqui llama al servicio para listar los usuarios y ponerlos dentro de la paginacion
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
      setTimeout(function () {
        var data;
          
        if (searchText) {
             
          var ft = searchText.toLowerCase();
          $http.get('Data/sorteos.json').success(function (largeLoad) {
//           
              
              
            data = respuestaTablaSorteo(largeLoad).filter(function(item) {
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
             
              
              
                console.log("data", largeLoad.results[0].premios[0].premioGarantizado);
               
            
          // saludar(largeLoad)
              
            $scope.setPagingData(respuestaTablaSorteo(largeLoad),page,pageSize);
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
         {field: 'inscritos', displayName: 'Inscritos'},
         {field: 'premios', displayName: 'Premios'},  
         {field: 'figuras', displayName: 'Figuras'} 
               
         
               
      
                
         
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
