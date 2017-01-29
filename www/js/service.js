angular.module('OTCDEAL.Services', ['ionic'])



// getting Deatails of customer from server
.factory("consumingServices", ['$http',function($http){
return {
 SearchDetails:function(id){
return $http.get('https://otcdeal.com/OTCDealWS/OTCDealSearchService.php?search_text='+id);
} ,
fetchUserDetails:function(MainCategoryid){
    return $http.get('https://otcdeal.com/OTCDealWS/OTCDealCategoriesList.php?id='+MainCategoryid);
},
ProductListfetchUserDetails :function(categorylistid){
    return $http.get('https://otcdeal.com/OTCDealWS/OTCDealProductsList.php?catid='+categorylistid);
 },
ProductDescfetchUserDetails2 : function(productid){
    return  $http.get('https://otcdeal.com/OTCDealWS/OTCDealProductInfo.php?pid='+productid);
 },
BuynowfetchUserDetails : function(registervariable){
    return  $http.get('https://otcdeal.com/OTCDealWS/OTCDealCartCustomer.php?custid='+registervariable);
 },
OrderFactoryfetchUserDetails : function(customerid){
    return $http.get('https://otcdeal.com/OTCDealWS/OTCDealCustomer_OrderList.php?id='+customerid);
 } ,

 CustomerInfofetchUserDetails : function(customerid){

   return $http.get('https://otcdeal.com/OTCDealWS/CustomerInfo.php?id='+customerid);
 }

}

}])



// sending Deatails to server from user(client)
.factory("pushingServices", ['$http',function($http){
return {
RegistrationDetails:function(data){
  return  $http.post('http://otcdeal.com/OTCDealWS/OTCDealRegistration.php',data);
},

shippingaddress:function(regvariable){
return $http.get('http://otcdeal.com/OTCDealWS/OTCDealCartCustomer.php?custid='+regvariable);
},

updateAddressDetails :function(data){
   return $http.post('http://otcdeal.com/OTCDealWS/OTCDealUpdateAddress.php',data);
},
loginDetails : function (data){

  return $http.post('http://otcdeal.com/OTCDealWS/OTCDealLoginService.php',data);
},

forgotpassword :function(data){

   return $http.post('http://otcdeal.com/OTCDealWS/OTCDealForgotPassword.php',data);
},
clientToken : function(data){
  return $http.post("http://otcdeal.com/OTCDealWS/ClientToken.php",data);
},
CustomerAddress : function(data){
  return $http.post('http://otcdeal.com/OTCDealWS/OTCDealCustomerAddress.php',data);
},
changePassword : function(data){
return $http.post('http://otcdeal.com/OTCDealWS/OTCDealChangePassword.php',data);
} ,
paymentOrder : function(data){
return $http.post('http://otcdeal.com/OTCDealWS/PaymentOrder.php',data);
},
setShippingMethod : function(data){
return $http.post('http://otcdeal.com/OTCDealWS/OTCDealSetShippingMethod.php',data)
},
CouponCode : function(data){
return $http.post('http://otcdeal.com/OTCDealWS/OTCDealCouponcode.php',data)
}

}

}])




.filter('RemoveTags', function($sce){
  return $sce.trustAsHtml;
})

.filter('pagination', function()
{
 return function(input, start)
 {
  start = +start;
  return input.slice(start);
 };
})

//End of the Service


// customer Details object
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
        var customer_address_id;
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
            },
            getcustomer_address_id :function(){
            return customer_address_id;
            },
            setcustomer_address_id :function(value){
             customer_address_id = value;
            return;
            }
        };
    })


// local variables object

.service('localVariables', function () {
    var regvariable;
    var loginvariable=false;
   return {
      setregvariable : function(value){
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


.service('productLists',function(){
   var categorieslist;
   var categoriesname;

  return {
   setcategorieslist :function (value) {
  this.categorieslist =value;

   return;
   },
   getcategorieslist : function(){

  return this.categorieslist;
   },
   setcategoriesname : function(value){
     categoriesname = value;
   return;
   },
  getcategoriesname : function(){

    return categoriesname;
  }



   }
})
