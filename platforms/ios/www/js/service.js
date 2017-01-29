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
    return $http.get('https://otcdeal.com/OTCDealWS/OrderList1.php?id='+customerid);
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
