angular.module('OTCDEAL.Services', ['ionic'])
.factory("search", ['$http',function($http){
    var obj = {};

    obj.SearchDetails = function(id){ 

return $http.get('https://otcdeal.com/OTCDealWS/OTCDealSearchService.php?search_text='+id);
}
return obj;
}])



//search function complete

   
//Author By Shubani
//This Factory for Main Categories calling from Soap Service
.factory("MainFactory", ['$http',function($http){
    var obj = {};
    obj.fetchUserDetails = function(MainCategoryid){
//alert("idddd"+MainCategoryid);
        return $http.get('https://otcdeal.com/OTCDealWS/OTCDealCategoriesList.php?id='+MainCategoryid);
    }
 return obj;
}])
//End of the Service

//Author By Veera 
//This filter Using for Remove the html tags
.filter('RemoveTags', function($sce){
  return $sce.trustAsHtml;
})
//End of the Filter

//Author By veera
//This Factory for Productlist  calling from Soap Service

.factory("ProductListFactory", ['$http',function($http){
var obj = {};
obj.fetchUserDetails = function(categorylistid){
//alert("vcatttttttt"+categorylistid)
return $http.get('https://otcdeal.com/OTCDealWS/OTCDealProductsList.php?catid='+categorylistid);
}
return obj;
}])
//End of the Service

//Author By veera
//This Factory for ProductDescription  calling from Soap Service

.factory("ProductDescFactory", ['$http',function($http){
    var obj2 = {};

    obj2.fetchUserDetails2 = function(productid){
    return $http.get('https://otcdeal.com/OTCDealWS/OTCDealProductInfo.php?pid='+productid);
    }
 return obj2;
}]) 
//End of the Service

//Author By veera
//This Factory for CustomerShipping Details  calling from Soap Service
.filter('pagination', function()
{
 return function(input, start)
 {
  start = +start;
  return input.slice(start);
 };
})

.factory("BuynowFactory", ['$http',function($http){
    var obj = {};
  obj.fetchUserDetails = function(registervariable){

        return $http.get('https://otcdeal.com/OTCDealWS/OTCDealCartCustomer.php?custid='+registervariable);
    }
 return obj;
}])
//End of the Service
//Author By veera
//This Factory for orders status

.factory("OrderFactory", ['$http',function($http){
    var obj = {};

    obj.fetchUserDetails = function(customerid){
    return $http.get('https://otcdeal.com/OTCDealWS/OTCDealCustomer_OrderList.php?id='+customerid);
    }
 return obj;
}])  
   
.factory("CustomerInfo", ['$http',function($http){
    var obj = {}; 
  obj.fetchUserDetails = function(customerid){    
    return $http.get('https://otcdeal.com/OTCDealWS/CustomerInfo.php?id='+customerid);
    }
 return obj; 
}])


//End of the Service
.service('customerDetails', function () {      
        var customer_fname;
        var customer_lname;
        var customer_city;
        var customer_pincode;
        var customer_state;
        var customer_regionId;
        var customer_shippadd;
        var customer_phone;
        var customer_email;
        return {  
            getcustomer_fname: function () {    
            return customer_fname; 
            }, 
            setcustomer_fname: function(value) {
                customer_fname=value;
            return;
            } ,

            getcustomer_lname: function () {   

            return customer_lname; 
            },
            setcustomer_lname: function(value) {
                customer_lname=value;
            return;  
             } ,
  
           getcustomer_city: function () {   
            return customer_city; 
            }, 
            setcustomer_city: function(value) {
                customer_city=value;
            return;  
            } ,
   
            getcustomer_pincode: function () {   
            return customer_pincode; 
            }, 
            setcustomer_pincode: function(value) {
                customer_pincode=value;
            return;  
            },   

            getcustomer_state: function () {   
            return customer_state; 
            }, 
            setcustomer_state: function(value) {
                customer_state=value;
            return;  
            } ,   
            getcustomer_regionId: function () {    
            return customer_regionId; 
            }, 
            setcustomer_regionId: function(value) {  
                customer_regionId=value;
            return;  
            },   
            getcustomer_shippadd: function () {    
            return customer_shippadd; 
            }, 
            setcustomer_shippadd: function(value) {  
                customer_shippadd=value;
            return;  
            },   
              getcustomer_phone: function () {    
            return customer_phone; 
            },   
            setcustomer_phone: function(value) {   
                customer_phone=value;
            return;      
            }, 
            getcustomer_email: function () {     
            return customer_email; 
            },   
            setcustomer_email: function(value) {   
                customer_email=value;
            return;      
            }

        };
    })


.service('localVariables', function () {   
    var regvariable;
    var loginvariable=false;
   return { 
      setregvariable :function(value){
      regvariable=value;
       return;
      },     
      getregvariable :function(){
      return regvariable;
       } ,
      setloginvariable :function(value){
      loginvariable=value;
       return;
      },       
      getloginvariable :function(){
      return loginvariable;
       }       
   }
    })


  .factory('jsonFactory', function ($q, $http) {

var url="";
 if(ionic.Platform.isAndroid()==true){
url="/assets/www/"; 
 }
    return { 
      getOtherStuff: function () { 
     
        var deferred = $q.defer(), 
 
            httpPromise = $http.get(url+'data/states.json');
  
        httpPromise.then(function (response) {
          console.log(reponse);
          deferred.resolve(response);
        }, function (error) {
          console.log(error);
        });
        return deferred.promise;
      }
    };
  });