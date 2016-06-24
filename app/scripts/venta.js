'use strict';

/**
 * @ngdoc function
 * @name nadmin1App.controller:VentaCtrl
 * @description
 * # VentaCtrl
 * Controller of the nadmin1App
 */


 angular.module('VentaApp', ['ngGrid']).controller('VentaCtrl', function ($scope, $http, $location) {
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
        useExternalFilter: true,
        caso:1
    };
     
  /*     $scope.filterAsesor = {
        filterTextAsesor: '',         
        useExternalFilter: true,
        caso: 2
    };*/
     
     $scope.filterSorteo = {
        filterTextSorteo: '',         
        useExternalFilter: true,
        caso: 3
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
    
    $scope.setPagingData = function(data,page,pageSize){
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
            console.log ("lo que ahi aqui", $scope.filterOptions.filterText);
              if ($scope.filterOptions.filterText != '')
              {
                  var ft = searchText.toLowerCase();
                  $http.get('http://localhost:8084/war/jaxrs/venta?caso=' + $scope.filterOptions.caso +'&pagina=1&token=3jfuhpqilm1o1h5kt8i5lf8lou7slcksn2k5lhaqnqts2iq16j9f&keyword1=&keyword2=').success(function (largeLoad) {
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
              }
            
            //Se encarga del filtro del sorteo
          if ($scope.filterSorteo.filterTextSorteo != '')
              {
                  
                  //Se modifica la url para que acepte el caso y el texto que entra en el filtro de busqueda
                  
                          var ft = searchText.toLowerCase();
                          $http.get('http://localhost:8084/war/jaxrs/venta?caso=' + $scope.filterSorteo.caso +'&pagina=1&token=3jfuhpqilm1o1h5kt8i5lf8lou7slcksn2k5lhaqnqts2iq16j9f&keyword1=' + $scope.filterSorteo.filterTextSorteo.toString() + '&keyword2=').success(function (largeLoad) {
                        console.log("entro",largeLoad.results);

                    data = largeLoad.results.filter(function(item) {
                     //  console.log("imprimiendo",item) 
                       var rest = (JSON.stringify(item).toLowerCase().indexOf(ft) != -1);
                        console.log(item,rest);
                      return rest;

                    });
                       //console.log("eeeeee",data)              
                    $scope.setPagingData(data,page,pageSize);
                  });
              }
            
          /*  if ($scope.filterAsesor.filterTextAsesor != '')
              {
                  
                  //Se modifica la url para que acepte el caso y el texto que entra en el filtro de busqueda
                  
                          var ft = searchText.toLowerCase();
                          $http.get('http://localhost:8084/war/jaxrs/venta?caso=' + $scope.filterAsesor.caso +'&pagina=1&token=2l3qbo7gbroh9qgarilvlcejcs0psegehvo4de8fd4c275oba06s&keyword1=' + $scope.filterAsesor.filterTextAsesor.toString() + '&keyword2=').success(function (largeLoad) {
                        console.log("entroAsesor",largeLoad.results);

                    data = largeLoad.results.filter(function(item) {
                     //  console.log("imprimiendo",item) 
                       var rest = (JSON.stringify(item).toLowerCase().indexOf(ft) != -1);
                        console.log(item,rest);
                      return rest;

                    });
                       //console.log("eeeeee",data)              
                    $scope.setPagingData(data,page,pageSize);
                  });
              }*/
            
          
        } else {
          $http.get('http://localhost:8084/war/jaxrs/venta?caso=' + $scope.filterOptions.caso +'&pagina=1&token=3jfuhpqilm1o1h5kt8i5lf8lou7slcksn2k5lhaqnqts2iq16j9f&keyword1=&keyword2=').success(function (largeLoad) {
            $scope.setPagingData(largeLoad,page,pageSize);
              
              
              
          });
            
            $http.get('http://localhost:8084/war/jaxrs/sorteo/all?keyword=').success(function (largeLoad) {
            //$scope.setPagingData(largeLoad,page,pageSize);
              console.log("esta es la data", largeLoad.data[0].codigo);
          
                
                var comboSorteo = document.getElementById("comboFiltroSorteo");
                //comboSorteo.options.length = 0;
                
                for(var i = 0, data2 = largeLoad.data.length; i< data2; i++){
                    
                    //console.log("este es el codigo", largeLoad.data[i].codigo);
                var option = document.createElement("option");
                option.text = largeLoad.data[i].codigo;
                
                comboSorteo.appendChild(option);
                    
                }
                
                
              
              
          });
        }
      }, 100);
    };

     
    
    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function (newVal, oldVal) {
      
        var filtro =$scope.filterOptions.filterText;
        
        
        if($scope.filterOptions.filterText != '')
            {        
              filtro = $scope.filterOptions.filterText;
               // alert ("hola");
                //document.getElementById("comboSorteo").selectedIndex = -1;
                
            }
        if($scope.filterSorteo.filterTextSorteo != '')
            {
                filtro = $scope.filterSorteo.filterTextSorteo;
            }
       /* if($scope.filterAsesor.filterTextAsesor != '')
            {
                filtro = $scope.filterAsesor.filterTextAsesor;
            }*/
        
      if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, filtro);
       
      }       
    }, true);
     
     

     
     
     
    
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        //Con esto regresa a la pagina 1 y realiza la busqueda, significa que cada vez que busque, siempre quedara en la pagina 1
        
        $scope.pagingOptions.currentPage = 1;
      if (newVal !== oldVal) {
          //$scope.pagingOptions.currentPage = 1;
         
          
          
         $scope.filterSorteo.filterTextSorteo = ""; 
          
          
          
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
          
      }
           
    }, true);
     
    /* $scope.$watch('filterAsesor', function (newVal, oldVal) {
        //Con esto regresa a la pagina 1 y realiza la busqueda, significa que cada vez que busque, siempre quedara en la pagina 1
        
        $scope.pagingOptions.currentPage = 1;
      if (newVal !== oldVal) {
          document.getElementById("comboFiltroSorteo").selectedIndex = -1;
          document.getElementById("filtroTodos").text = "";
          //$scope.pagingOptions.currentPage = 1;
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterAsesor.filterTextAsesor);
      }
    }, true);*/
    
         
     $scope.$watch('filterSorteo', function (newVal, oldVal) {
        //Con esto regresa a la pagina 1 y realiza la busqueda, significa que cada vez que busque, siempre quedara en la pagina 1
       
           
       
        $scope.pagingOptions.currentPage = 1;
      if (newVal !== oldVal) {
          //$scope.pagingOptions.currentPage = 1;
          console.log("aqui aqui");
                     
          $scope.filterOptions.filterText =  "";
                     
          
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterSorteo.filterTextSorteo);
          
      }
   
    }, true);
     
      
     
     

     

     $scope.gridOptions = {
        data:  'myData',
         //El campo Field debe coincidir con su ubicacion dentro de la respuesta Json
           columnDefs: [
       //  {field: 'id', displayName: 'ID'},
         {field: 'fecha', displayName: 'Fecha'},
         {field: 'sorteo.codigo', displayName: 'Sorteo'},
         {field: 'asesor.nombre', displayName: 'Asesor'},
         {field: 'carton[0].nombre', displayName: 'Tablas'},    
         {field: 'serie', displayName: 'Serie'}
        
               
                
         
       ],       
        filterOptions: $scope.filterOptions,  
         /*Esta propiedad cambia todos los textos dentro del ng-grid a excepcion de la data y el contenido de las mismas*/
        i18n: 'es',
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
            exportList: exportList,
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
       
        function exportList(){          
        
     
             /*  $http({
             method : 'post',           
             url : 'http://localhost:8084/war/jaxrs/venta/exportar?nombre=VENTAS&encabezados=Sorteo%2CFecha%2CAsesor%2CTablas%2CSerie%2C&token=3jfuhpqilm1o1h5kt8i5lf8lou7slcksn2k5lhaqnqts2iq16j9f',  
             headers:{'Access-Control-Allow-Credentials': 'true'}
       }).success(function(data, status, headers, config) {
             $scope.status = status;
           // La linea siguiente, vincula el javascript con la vista html para motrar datos
            // $scope.listaVenta = data;           
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
       });*/
    
            $http.post('http://localhost:8084/war/jaxrs/venta/exportar?nombre=VENTAS&encabezados=Sorteo%2CFecha%2CAsesor%2CTablas%2CSerie%2C&token=3jfuhpqilm1o1h5kt8i5lf8lou7slcksn2k5lhaqnqts2iq16j9f').then(function(response) {
             $scope.status = status;
           // La linea siguiente, vincula el javascript con la vista html para motrar datos
            // $scope.listaVenta = data;           
           console.log("Consumo ok");            
           //$scope.usuario = data;
           console.log(response.data);
                //Con esto usa la respuesta que recibe de la consulta y realiza la descarga del archivo
                document.location=response.data.moreInfo;
                
                
            
           
       }, function(data, status, headers, config) {
             $scope.data = data || "Peticion fallida";
             $scope.status = status;             
       });
            
        };
           
//console.log("aaaaassdsdsdsd" + $scope.gridOptions.pagingOptions.pageSizes[0]);
       
       
  
       
        function erase(){
            
        };
        
        return service;
};
     
 
    
 $scope.refresh = true;
       
});
