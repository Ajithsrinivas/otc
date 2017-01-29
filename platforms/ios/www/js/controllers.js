angular.module('OTCDEAL.Controllers', ['ionic'])
.controller('CreateCtrl', function($scope,$http,$location,$ionicHistory,$rootScope,$state) {
  $scope.myGoBack = function() {
$location.path('/singin');  
                // $ionicHistory.goBack();
             };


  $scope.inputType ='password';
  $scope.Useravailable='';


$scope.registrationDetails=function(RegistrationDetails){
$scope.Useravailable='';
var  password=RegistrationDetails.Password;
var email=RegistrationDetails.EmailId;
var  UserName =RegistrationDetails.UserName;
 var LastName= RegistrationDetails.LastName;
var data = { id: email , password : password ,UserName:UserName, LastName :LastName};

$http.post('http://otcdeal.com/OTCDealWS/OTCDealRegistration.php',data).then(function successCallback(response) {
  
$rootScope.regvariable = response.data.records[0];
$rootScope.loginvariable = response.data.records[1];
$rootScope.customer_fname=RegistrationDetails.UserName;
$rootScope.customer_lname=RegistrationDetails.LastName;
if( $rootScope.Forword == true){
  $rootScope.EmailId = email;
 
  $http.get('http://otcdeal.com/OTCDealWS/OTCDealCartCustomer.php?custid='+$rootScope.regvariable)
  .success(function(data){
    //$scope.data =data;
    $location.path("/app/shipping_address");
  }).error(function(data, status){
$timeout(function () {
 $ionicLoading.hide();
}, 0);
        });
}
else{

$rootScope.EmailId = email;
 
$location.path("/app/home");
}
},function failure(response){
  console.log(response);
 $scope.Useravailable="already emailId exists";
 //}

});

}
$scope.hideShowPassword=function(){
if ($scope.inputType == 'password')
      $scope.inputType = 'text';
    else
      $scope.inputType = 'password';
  };


})
//End of this Controller


.controller('SinginCtrl', function($scope,$http,$location,$ionicHistory,$ionicPopup,CustomerInfo,$ionicLoading,$rootScope,BuynowFactory,$timeout) {
$scope.myGoBack = function() {
     if ($ionicHistory.backView()==null) {

      $location.path("/app/home");
     };
                 $ionicHistory.goBack();
             };
$scope.inputType = 'password';
$scope.errorMessage='';

$scope.signIn=function(authorizationForm){
  $ionicLoading.show({
  content: 'Loading',
  animation: 'fade-in',
  showBackdrop: true,
  maxWidth: 200,
  showDelay: 0
  });

var email =authorizationForm.emailId;

 var password=authorizationForm.password;
var data = { emailId: email,passwordId:password};

  $http.post('http://otcdeal.com/OTCDealWS/OTCDealLoginService.php',data).then(function successCallback(response) {
    $timeout(function () {
$ionicLoading.hide();
}, 0);

   $rootScope.EmailId = email;

  $rootScope.regvariable = response.data.records[0].customer_id;
    mycall(response.data.records[0].customer_id,CustomerInfo,$rootScope);
    $rootScope.loginvariable = response.data.records[1];

     var registervariable = $rootScope.regvariable;
//alert("customerid"+$rootScope.regvariable);
  BuynowFactory.fetchUserDetails(registervariable).success(function(response){

  $rootScope.shipping_variable = response.records;

  try{
    $rootScope.shippingvar1 = $rootScope.shipping_variable[0].is_default_shipping;
  }catch(error1){

  }

    try{
   $rootScope.shippingvar2 = $rootScope.shipping_variable[1].is_default_shipping;
 }catch(error1){

 }

 try{
 $rootScope.shippingvar3 = $rootScope.shipping_variable[2].is_default_shipping;
}catch(error2){

}



    if($rootScope.shippingvar1 === true ){

  $rootScope.customer_address_id = $rootScope.shipping_variable[0].customer_address_id;

  $rootScope.customer_fname = $rootScope.shipping_variable[0].firstname;

   $rootScope.customer_lname = $rootScope.shipping_variable[0].lastname;

     $rootScope.customer_city = $rootScope.shipping_variable[0].city;

     $rootScope.customer_pincode = $rootScope.shipping_variable[0].postcode;

     $rootScope.customer_state = $rootScope.shipping_variable[0].region;
     $rootScope.customer_regionId= $rootScope.shipping_variable[0].region_id;


     $rootScope.customer_shippadd= $rootScope.shipping_variable[0].street;

       $rootScope.customer_phone = $rootScope.shipping_variable[0].telephone;
    }

    else if($rootScope.shippingvar2 === true ){

  $rootScope.customer_address_id = $rootScope.shipping_variable[1].customer_address_id;

  $rootScope.customer_fname = $rootScope.shipping_variable[1].firstname;

   $rootScope.customer_lname = $rootScope.shipping_variable[1].lastname;
   $rootScope.customer_regionId = $rootScope.shipping_variable[1].region_id;

     $rootScope.customer_city = $rootScope.shipping_variable[1].city;

     $rootScope.customer_pincode = $rootScope.shipping_variable[1].postcode;

     $rootScope.customer_state = $rootScope.shipping_variable[1].region;

     $rootScope.customer_shippadd= $rootScope.shipping_variable[1].street;

       $rootScope.customer_phone = $rootScope.shipping_variable[1].telephone;
    }

    else if($rootScope.shippingvar3 === true ){



  $rootScope.customer_address_id = $rootScope.shipping_variable[2].customer_address_id;

  $rootScope.customer_fname = $rootScope.shipping_variable[2].firstname;

   $rootScope.customer_lname = $rootScope.shipping_variable[2].lastname;

     $rootScope.customer_city = $rootScope.shipping_variable[2].city;

     $rootScope.customer_pincode = $rootScope.shipping_variable[2].postcode;

     $rootScope.customer_state = $rootScope.shipping_variable[2].region;

     $rootScope.customer_shippadd= $rootScope.shipping_variable[2].street;

       $rootScope.customer_phone = $rootScope.shipping_variable[2].telephone;
       $rootScope.customer_regionId = $rootScope.shipping_variable[2].region_id;

    }

    else{


    }

  },function(response){


  }
  );



   if($rootScope.loginvariable === false || response.data.records[0] == false){


    $scope.errorMessage='Invalid Username/Password';
    $timeout(function () {
    $scope.loading.hide();
    }, 0);
  }
   else if ($rootScope.Forword == true){

$rootScope.EmailId = email;

   $http.get('http://otcdeal.com/OTCDealWS/OTCDealCartCustomer.php?custid='+$rootScope.regvariable)
  .success(function(data){
    $scope.data =data;  

    $location.path("/app/shipping_address");
  });
  }
  else{
 $rootScope.EmailId = response.data.records[0].email;

 $location.path("/app/home");
  }
  }, function errorCallback(response) {

  });

}

$scope.showPopup=function(){
  $scope.data = {};
  $scope.users=false;
   $scope.available=true;
  $scope.messageError="";
   $scope.messageerror="message-error";
$ionicPopup.show({
templateUrl:'templates/popup-template.html',
 scope: $scope,
 buttons: [
 { text: '<b>cancel</b>',
  type: 'button-positive'
},
 {
   text: '<b>Send</b>',
   type: 'button-positive',
   onTap: function(e) {
     $scope.messageError="";
if($scope.data.EmailId){
var email=$scope.data.EmailId;
  var data={emailId:email};
$http.post('http://otcdeal.com/OTCDealWS/OTCDealForgotPassword.php',data).then(function successCallback(response) {
$scope.available=true;
if(response.data=="1"){
     $scope.messageerror="successcolor";
$scope.messageError="Please check your email";
}else{
   $scope.messageerror="message-error";
  $scope.messageError="Emaild Id does not exists";
}
  }, function errorCallback(response) {

 
  });
}

$scope.users=true;
  e.preventDefault();
   }
 }
 ]
});
}
$scope.hideShowPassword=function(){
if ($scope.inputType == 'password')
      $scope.inputType = 'text';
    else
      $scope.inputType = 'password';
  };


})
//end of this Controller

//Author By Veera
  //this Controller for Login/Logout,Popup,MainCategories Getting From Services
.controller('AppCtrl', function($scope,$window,$ionicModal,$ionicHistory, $ionicLoading,$timeout,MainFactory,$ionicPopup,$location,$rootScope) {

$scope.logout = function(){
$rootScope.loginvariable = false;
$rootScope.regvariable = 0;
$rootScope.productitempush.length = 0;
$rootScope.ShippingMethods.length = 0;
$rootScope.taxcalculation.length = 0;
$window.location.reload(true);
$location.path('root');
}
$scope.homepagenav = function(){

  $ionicHistory.nextViewOptions({
    historyRoot: true
})
$location.path('app/home');
}
  //Author By Baji
  //When Ever Cart is Zero, Click on the Cart page,The Page is Redirect to HomePage
  $scope.showPopup = function(){

    if($scope.productitempush.length == 0){
      var alertPopup = $ionicPopup.alert({
        title: 'cart',
        template: ' No product in your cart'
      })

      $ionicHistory.nextViewOptions({
    historyRoot: true
  })
      $location.path('/app/home');
    }
      else{
        $location.path('app/cart');
    }
  };
  //End this Function

  //Author By Shubani
  //Busy Indicator
  var spinnerHtml = '<span data-animation="true" data-tags="spinner, waiting, refresh, animation" data-pack="default" class="ion-loading-c"></span>';
$scope.loading = $ionicLoading.show({content: 'Loading...' + spinnerHtml});
var MainCategoryid="2"


MainFactory.fetchUserDetails(MainCategoryid).success(function(response){
        $scope.cat = response.records;
        $timeout(function () {
 $ionicLoading.hide();
}, 0);
    }).error(function(data, status){
 
             $timeout(function () {
 $ionicLoading.hide();
}, 0);
        });
})
//End of this Controller

//Author By Baji
//This controller for Getting Productlist
.controller('HomeCtrl', function($scope,ProductListFactory,$state,$rootScope, $ionicLoading,$timeout) {

  //Author by veera
  //this is function using for categorydeals in homepage
 
$scope.HomeCategorylist = function(categorylistid,name){

  var spinnerHtml = '<span data-animation="true" data-tags="spinner, waiting, refresh, animation" data-pack="default" class="ion-loading-c"></span>';
$scope.loading = $ionicLoading.show({content: 'Loading...' + spinnerHtml});

ProductListFactory.fetchUserDetails(categorylistid).success(function(response){
 // alert("success from product;list")
       $rootScope.Eachcatproducts = response.records;
       angular.forEach($rootScope.Eachcatproducts,function(value, key) {
    value.image= value.image.replace('http:' ,'https:');
   
   },[]);

$rootScope.categoriesname=name;
        $timeout(function () {
 $ionicLoading.hide();
}, 0);$state.go('app.productlist');
    }).error(function(data, status){
       
             $timeout(function () {
 $ionicLoading.hide();
}, 0);
        });






};
//end of function

})

//Author By
//This Controller for Getting Categories from service
.controller('CategoryCtrl', function($scope,$http,MainFactory,$rootScope,ProductListFactory,$ionicLoading,$timeout,ProductListFactory,$state) {

  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
   
    if(group.category_id == 251 ||group.category_id == 254 || group.category_id == 253 || group.category_id == 252){
      $ionicLoading.show({
     content: 'Loading',
     animation: 'fade-in',
     showBackdrop: true,
     maxWidth: 200,
     showDelay: 0
   });

var categorylistid = group.category_id;
$scope.noMoreItemsAvailable = false;

ProductListFactory.fetchUserDetails(categorylistid).success(function(response){

  $rootScope.categoriesname=group.name ;
       $rootScope.Eachcatproducts = response.records;
      console.log( $rootScope.Eachcatproducts );
     //alert($rootScope.Eachcatproducts.length);
     if($rootScope.Eachcatproducts ==[]){$scope.noMoreItemsAvailable = true;}
     angular.forEach($rootScope.Eachcatproducts,function(value, key) {
    value.image= value.image.replace('http' ,'https');
   
   },[]);
        $timeout(function () {
 $ionicLoading.hide();
}, 0);
$state.go('app.productlist');

    }).error(function(data, status){
          
             $timeout(function () {
 $ionicLoading.hide();
}, 0);
        });



    }
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

$scope.MainCategory=function(MainCategoryid,name){

  var spinnerHtml = '<span data-animation="true" data-tags="spinner, waiting, refresh, animation" data-pack="default" class="ion-loading-c"></span>';
$scope.loading = $ionicLoading.show({content: 'Loading...' + spinnerHtml});

MainFactory.fetchUserDetails(MainCategoryid).success(function(response){
 // console.log(response);

       $rootScope.categorieslist = response.records;
$rootScope.categoriesname=name;
        $timeout(function () {
 $ionicLoading.hide();
}, 0);$state.go('app.category');
    }).error(function(data, status){
         alert('Internal Server Error');
             $timeout(function () {
 $ionicLoading.hide();
}, 0);
        });




}
$scope.categorylist = function(categorylistid,name){

var spinnerHtml = '<span data-animation="true" data-tags="spinner, waiting, refresh, animation" data-pack="default" class="ion-loading-c"></span>';
$scope.loading = $ionicLoading.show({content: 'Loading...' + spinnerHtml});


ProductListFactory.fetchUserDetails(categorylistid).success(function(response){

/*alert(categorylistid);
alert(categorylistid==225);
  if(MainCategoryid==225){

  alert('hi');
}
*/

       $rootScope.Eachcatproducts = response.records;
$rootScope.categoriesname=name;
//console.log($rootScope.Eachcatproducts);
//alert("subhani");
      angular.forEach($rootScope.Eachcatproducts,function(value, key) {
    value.image= value.image.replace('http' ,'https');
   
   },[]);
        $timeout(function () {
 $ionicLoading.hide();
}, 0);
$state.go('app.productlist');

    }).error(function(data, status){
            alert('Internal Server Error');
             $timeout(function () {
 $ionicLoading.hide();
}, 0);
        });






};
})
//End of the controller

//Author by veera
//This controller

.controller('ProductDetailsCtrl', function($scope,$rootScope,ProductDescFactory,$rootScope,$location,$state,BuynowFactory) {

 


})
//End of the controller

//This controller Delete the Cart Products and Redirect to HomePage
.controller('CartCtrl', function($scope,$rootScope,$timeout,$location,$ionicHistory,$state, $ionicPopup) {
  
  $scope.checkout = function(){
    if($rootScope.loginvariable === false ){
       $rootScope.Forword = true;

    $location.path('/singin');
    }

    else if($rootScope.regvariable === 0 ){
       $rootScope.Forword = true;

    $location.path('/singin');

    }

    else{

      $state.go('app.shipping_address');

    }


  }
  $scope.inc = function(){
    $scope.cartitem.status += 1
  };
  $scope.dec = function(){
    $scope.cartitem.status -= 1
  };
  $scope.total = function(){
    var total = 0;
    angular.forEach($scope.productitempush,function(cartitem){
      total += cartitem.status * cartitem.price;
    })
    $rootScope.subtotal = total;
      return total;
  };
  $scope.delete = function(index){
if($rootScope.productitempush.length == 1){
  $ionicHistory.nextViewOptions({
    historyRoot: true
  });
  $rootScope.subtotal = 0;
     $location.path('app/home');
  }
     $scope.productitempush.splice(index, 1);
  };
$scope.NoOfQtry=function()
{
var NoOfQtry=0;
if($rootScope.productitempush.length==0){
  $rootScope.NoOfQtry1 = NoOfQtry;
  return NoOfQtry;
}else{
angular.forEach($scope.productitempush,function(productitempush){
     NoOfQtry+= parseInt(productitempush.status);
 $rootScope.NoOfQtry1 = NoOfQtry;
   return NoOfQtry;
    })}
}



$scope.addcart = function(productdetails){
  $rootScope.click = $rootScope.click+1;
    if($rootScope.productitempush.length == 0 )
{/*
 angular.forEach($rootScope.productdetails,function(value, key) {
    value.image= value.image.replace('http' ,'https');
   
   },[]);*/
  $scope.productitempush.push({
       name: productdetails[0].name,
       id:productdetails[0].product_id,
       image:productdetails[0].image,
       price:productdetails[0].price,
       status:$scope.name
   });
         var cartPopup = $ionicPopup.show({

       scope: $scope,
       cssClass: 'popbg' ,

       template: '<p class="padding pop-text">added in your cart</p>'
       })
       $timeout(function() {
       cartPopup.close();
     }, 1000);

}
else {
  for (var j=0; j<$rootScope.productitempush.length; j++){
        var j = $rootScope.productitempush.length-1;
            if($rootScope.productdetails[0].name !== $rootScope.productitempush[j].name) {

                $scope.productitempush.push({
                 name: productdetails[0].name,
                 id:productdetails[0].product_id,
                 image:productdetails[0].image,
                 price:productdetails[0].price,
                 status:$scope.name
             });
             var cartPopup = $ionicPopup.show({
           scope: $scope,
           cssClass: 'popbg' ,

           template: '<p class="padding pop-text">added in your cart</p>'
           })
           $timeout(function() {
           cartPopup.close();
         }, 1000);    }
         else{
          if($rootScope.click == 1){
                 }
                    else{
                           $scope.qty = parseInt($scope.productitempush[j].status);
                                          $scope.qty += parseInt($scope.name);
                     $scope.productitempush[j].status = $scope.qty;
                     var cartPopup = $ionicPopup.show({
                   scope: $scope,
                   cssClass: 'popbg' ,

                   template: '<p class="padding pop-text">added in your cart</p>'
                   })
                   $timeout(function() {
                   cartPopup.close();
                 }, 1000);

                            }
       }
       }
}
    };

$scope.buynow = function(productdetails,productitempush){
  $rootScope.click = $rootScope.click+1;
  if($rootScope.productitempush.length == 0 )
{

  $scope.productitempush.push({
       name: productdetails[0].name,
       id:productdetails[0].product_id,
       image:productdetails[0].image,
       price:productdetails[0].price,
       status:$scope.name
   });
 }
else {
  
  for (var j=0; j<$rootScope.productitempush.length; j++){
        var j = $rootScope.productitempush.length-1;
              if($rootScope.productdetails[0].name !== $rootScope.productitempush[j].name) {
                $scope.productitempush.push({
                 name: productdetails[0].name,
                 id:productdetails[0].product_id,
                 image:productdetails[0].image,
                 price:productdetails[0].price,
                 status:$scope.name
             });

        }
         else{
if($rootScope.click == 1){
}
else{
                     $scope.qty = parseInt($scope.productitempush[j].status);
                     $scope.qty += parseInt($scope.name);
                     $scope.productitempush[j].status = $scope.qty;


                           }
       }
       }


}


  if($rootScope.loginvariable === false ){
    $rootScope.Forword = true;

$location.path('/singin');
  }

  else if($rootScope.regvariable === 0 ){
     $rootScope.Forword = true;

$location.path('/singin');

  }

  else{

    $state.go('app.shipping_address');

  }

}; 


})
//End of the controller

 
.controller('ShippingAddressCtrl', function($scope,$rootScope,$http,$state,$ionicLoading,$timeout,$ionicPopup,$location) {
  $scope.States = [ {"id":0,"name": "Please select State or Province"},
                       {"id": 1, "name": "Alabama"},
                      {"id": 2, "name": "Alaska"},
                      {"id": 3, "name": "American Samoa"},
                      {"id": 4, "name": "Arizona"},
                      {"id": 5, "name": "Arkansas"},
                      {"id": 6, "name": "Armed Forces Africa"},
                      {"id": 7, "name": "Armed Forces Americas"},
                      {"id": 8, "name": "Armed Forces Canada"},
                      {"id": 9, "name": "Armed Forces Europe"},
                      {"id": 10, "name": "Armed Forces Middle East"},
                      {"id": 11, "name": "Armed Forces Pacific"},
                      {"id": 12, "name": "California"},
                      {"id": 13, "name": "Colorado"},
                      {"id": 14, "name": "Connecticut"},
                      {"id": 15, "name": "Delaware"},
                      {"id": 16, "name": "District of Columbia"},
                      {"id": 17, "name": "Federated States Of Micronesia"},
                      {"id": 18, "name": "Florida"},
                      {"id": 19, "name": "Georgia"},
                      {"id": 20, "name": "Guam"},
                      {"id": 21, "name": "Hawaii"},
                      {"id": 22, "name": "Idaho"},
                      {"id": 23, "name": "Illinois"},
                      {"id": 24, "name": "Indiana"},
                      {"id": 25, "name": "Iowa"},
                      {"id": 26, "name": "Kansas"},
                      {"id": 27, "name": "Kentucky"},
                      {"id": 28, "name": "Louisiana"},
                      {"id": 29, "name": "Maine"},
                      {"id": 30, "name": "Marshall Islands"},
                      {"id": 31, "name": "Maryland"},
                      {"id": 32, "name": "Massachusetts"},
                      {"id": 33, "name": "Michigan"},
                      {"id": 34, "name": "Minnesota"},
                      {"id": 35, "name": "Mississippi"},
                      {"id": 36, "name": "Missouri"},
                      {"id": 37, "name": "Montana"},
                      {"id": 38, "name": "Nebraska"},
                      {"id": 39, "name": "Nevada"},
                      {"id": 40, "name": "New Hampshire"},
                      {"id": 41, "name": "New Jersey"},
                      {"id": 42, "name": "New Mexico"},
                      {"id": 43, "name": "New York"},
                      {"id": 44, "name": "North Carolina"},
                      {"id": 45, "name": "North Dakota"},
                     {"id": 46, "name": "Northern Mariana Islands"},
                     {"id": 47, "name": "Ohio"},
                     {"id": 48, "name": "Oklahoma"},
                     {"id": 49, "name": "Oregon"},
                     {"id": 50, "name": "Palau"},
                      {"id": 51, "name": "Pennsylvania"},
                      {"id": 52, "name": "Puerto Rico"},
                    {"id": 53, "name": "Rhode Island"},
                     {"id": 54, "name": "South Carolina"},
                     {"id": 55, "name": "South Dakota"},
                     {"id": 56, "name": "Tennessee"},
                     {"id": 57, "name": "Texas"},
                     {"id": 58, "name": "Utah"},
                     {"id": 59, "name": "Vermont"},
                      {"id": 60, "name": "Virgin Islands"},
                      {"id": 61, "name": "Virginia"},
                      {"id": 62, "name": "Washington"},
                      {"id": 63, "name": "West Virginia"},
                        {"id": 64, "name": "Wisconsin"},
                      {"id": 65, "name": "Wyoming"}
  ];


  var customerlastname=$rootScope.customer_lname;
  var postcode=$rootScope.customer_pincode;
  var street=$rootScope.customer_shippadd;
  var city=$rootScope.customer_city;
  var region=$rootScope.customer_state;
  var firstname=$rootScope.customer_fname;
  var telephone =$rootScope.customer_phone;
  var regionId = $rootScope.customer_regionId;
  var custId=$rootScope.regvariable;
 var quoteId=$rootScope.Quote_id;
  var custAddrId =$rootScope.customer_address_id;
  var productitempush=$rootScope.productitempush;
  var email=$rootScope.EmailId;
var StatesList={};

  $scope.ShippingAddressDetails={
    firstname:firstname,
    lastname:customerlastname  ,
   postcode:postcode,
   street:street,
    city:city,
    region:region,
    telephone:telephone,
    regionId:regionId,
    custId:custId,
    quoteId:quoteId,
    custAddrId:custAddrId,
    productitempush:productitempush,
    StatesList:StatesList
  };
$scope.ShippingAddressDetails.StatesList.id=regionId

$scope.KeyPress=function(event){
  var foo =event.target.value;
  var s=foo.split("-").join("");
  var maxvalue="";
 if (s.length > 0 && s.length<8) {
  s = s.match(new RegExp('.{1,3}', 'g')).join("-");
event.target.value=s;

}
}



  $scope.shipaddress=function(){
   if($scope.ShippingAddressDetails.StatesList.id==0){
      
      $ionicPopup.alert({
              title: 'PLEASE SELECT THE STATE'
              
            }).then(function(res) {
              
            });
    }else{
     $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
      $rootScope.one = false;
var  firstname= $scope.ShippingAddressDetails.firstname;
var lastname = $scope.ShippingAddressDetails.lastname;
var postcode  = $scope.ShippingAddressDetails.postcode;
var street=$scope.ShippingAddressDetails.street;
var city=$scope.ShippingAddressDetails.city;
var region =$scope.ShippingAddressDetails.region;
var  telephone=$scope.ShippingAddressDetails.telephone;
var regionId=$scope.ShippingAddressDetails.StatesList.id;
var  region= $scope.ShippingAddressDetails.StatesList.name;

var data={
firstname:firstname,
lastname:lastname,
street:street,
city:city,
region:region,
postcode:postcode,
telephone:telephone,
regionId:regionId,
custId:custId,
email:email,
quoteId:quoteId,
custAddrId:custAddrId,
productitempush:productitempush
}

$http.post('http://otcdeal.com/OTCDealWS/OTCDealUpdateAddress.php',data).then(
  function successCallback(response) {


$rootScope.ShippingMethods = response.data.records;

$rootScope.sessionquoteid=$rootScope.ShippingMethods.pop();
//$rootScope.var11=$rootScope.ShippingMethods[$rootScope.shipping_variable.length-1];


$timeout(function () {
    $ionicLoading.hide();

  }, 2000);
$state.go('app.shipping_methods');
$timeout(function() {

            var el = document.getElementById('secondbutton');
        angular.element(el).triggerHandler('click');
        }, 0);

  },
  function failureCallback(response){

alert('Internal Server Error');
$timeout(function () {
    $ionicLoading.hide();

  }, 2000);
alert('error');
  })
    }


  };













})

//This controller for searching products
.controller('SearchCtrl', function($ionicHistory,search,$scope,$rootScope,ProductDescFactory,$http,$ionicLoading,$timeout) {
$scope.Result;
$scope.flag=false;
$scope.myGoBack = function() {
$ionicHistory.goBack();
};
$scope.getValue = function (key) {
  $scope.flag=false;
if($scope.NodeId_1.length>5){

var id =$scope.NodeId_1;

$scope.loading = $ionicLoading.show({content: 'Loading...'});
search.SearchDetails(id).success(function(response){
   if(response.length==0){
    $scope.flag=true;   
$scope.Result="There are no products matching the selection.";
   }


$scope.result=response;

console.log($scope.result);
$timeout(function () {

$ionicLoading.hide();
}, 0);
}, function errorCallback(response) {
// called asynchronously if an error occurs
// or server returns response with an error status.
});
}
}
})

//End of the controller

 //this controller
 .controller('paymentctrl', function($scope,$location,$rootScope,$http,$state,$ionicLoading,$timeout,$filter) {
$scope.nonce="";
//console.log($rootScope.regvariable);
 document.getElementById("try").style.visibility = "hidden";

var data={
   id:$rootScope.regvariable,
  
firstName:$rootScope.fname,
    lastName:$rootScope.lname,
    email:$rootScope.EmailId,
        phone:$rootScope.phone
   

}

$http.post("http://otcdeal.com/OTCDealWS/ClientToken.php",data)
    .then(function(response) {
        //console.log(response.data);
     //   $scope.token=response.data;
       // console.log($scope.token);
        var clientToken=response.data;
      //  alert(JSON.stringify(clientToken));
        //console.log(clientToken);

braintree.setup(clientToken, "dropin", { 
  container: "payment-form", 
   onPaymentMethodReceived: function (obj) { 
       
    //doSomethingWithTheNonce(obj.nonce); 
 //   alert(JSON.stringify(obj));
    console.log(obj);
    $scope.nonce=obj.nonce;
    $scope.type=obj.type;
   // alert($scope.type);
    $scope.payshow=true;
    $scope.continueShow=false; 
 document.getElementById("try1234").style.visibility = "hidden";
 document.getElementById("try").style.visibility = "visible";
    
    
    } 
});
    });
    $scope.showpay=function() {

if ($scope.nonce==''){



}else
{


}
    
    }

 $scope.pay = function() {
  //alert('pay function ');

if($scope.nonce==""){
  alert('please select payment option')
}else{


var data={paymentmethod:$scope.nonce,amount:$rootScope.taxcalculation[3].amount,quoteId : $rootScope.sessionquoteid,
shipTitle:$rootScope.shipTitle,
type:$scope.type};
console.log(data);
$http.post('http://otcdeal.com/OTCDealWS/PaymentOrder.php',data).then(
    function successCallback(response) {

  $rootScope.orderId = response.data;
//alert("datatttt"+JSON.stringify(response));
alert("datatttt"+JSON.stringify($rootScope.orderId));
  $state.go('order_conform');
    },
    function failureCallback(response){
 alert('Internal Server Error'+JSON.stringify(response));
  $state.go('root');
  

    }) 

 }
}


  })
//End of the Controller

//This controller Getting the product list from service
.controller('ProductListCtrl', function($scope,$state,$rootScope,ProductDescFactory,$filter,$http,$ionicLoading,$timeout){

//alert("iam from controller ProductListCtrl");


$scope.productltpush = function(productid) {
        //$rootScope.image = image;

$rootScope.click = 0;
  var spinnerHtml = '<span data-animation="true" data-tags="spinner, waiting, refresh, animation" data-pack="default" class="ion-loading-c"></span>';
$scope.loading = $ionicLoading.show({content: 'Loading...' + spinnerHtml});
ProductDescFactory.fetchUserDetails2(productid).success(function(response2){

$rootScope.productdetails = response2.records;
 angular.forEach($rootScope.productdetails,function(value, key) {
    value.image= value.image.replace('http' ,'https');
   
   },[]);
//console.log($rootScope.productdetails);
    $timeout(function () {
 $ionicLoading.hide();
}, 0);$state.go('app.product_Details');
}, function errorCallback(response) {
// called asynchronously if an error occurs.replace("data-", "");
// or server returns response wit

alert('Internal Server Error');
$timeout(function () {
$scope.loading.hide();
}, 0);

});

    };

})
.controller('ShippingMethodsCtrl', function($scope,$rootScope,$http,$state,$ionicLoading,$timeout){





  $rootScope.one = false;

$scope.shipmethodtax = function(code){
$rootScope.firstvalue = $rootScope.ShippingMethods[0];
     $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });


  $rootScope.one = true;

  var shipcode = code;
  var qouteid = $rootScope.sessionquoteid;

var data={
shipcode:shipcode,
quoteId:qouteid
}
$http.post('http://otcdeal.com/OTCDealWS/OTCDealSetShippingMethod.php',data).then(
  function successCallback(response) {

$rootScope.taxcalculation = response.data;
alert(JSON.stringify($rootScope.taxcalculation));


$timeout(function () {
$scope.loading.hide();
}, 0);
  },
  function failureCallback(response){

alert('Internal Server Error');
  $timeout(function () {
           $ionicLoading.hide();
           }, 0);
  })
}
$scope.submitForm = function(){
  $ionicLoading.show({
 content: 'Loading',
 animation: 'fade-in',
 showBackdrop: true,
 maxWidth: 200,
 showDelay: 0
});

$timeout(function () {
           $ionicLoading.hide();
           }, 0);

$state.go('app.payment');
}


})
.controller('MyAccountCtrl', function($scope,$rootScope,$state,$ionicHistory,OrderFactory,$http,$timeout,$ionicLoading){

 
$scope.ErrorClass=true;

$scope.accountinformation = function(){
  
$state.go('app.AccountInformation');


}
$scope.MyOrders = function(){

var customerid = $rootScope.regvariable;
alert("sahgfjdafs"+customerid);

OrderFactory.fetchUserDetails(customerid).success(function(response){

       $rootScope.orderstatus = response.records;
       //alert("orders"+JSON.stringify($rootScope.orderstatus));
      
        $timeout(function () {
 $ionicLoading.hide();
}, 0);

$state.go('app.MyOrders');

    }).error(function(data, status){
           alert('Internal Server Error');
             $timeout(function () {
 $ionicLoading.hide();
}, 0);
        });
  



}
$scope.AddressBook = function(){

 
 


  
$state.go('app.AddressBook');


}

  
})
.controller('AddressBookCtrl', function($scope,$rootScope,$http,$state,$ionicLoading,$timeout,$ionicPopup){
  //alert("controller");

$scope.MyStates = [ {"id":0,"name": "Please select State or Province"},
                       {"id": 1, "name": "Alabama"},
                      {"id": 2, "name": "Alaska"},
                      {"id": 3, "name": "American Samoa"},
                      {"id": 4, "name": "Arizona"},
                      {"id": 5, "name": "Arkansas"},
                      {"id": 6, "name": "Armed Forces Africa"},
                      {"id": 7, "name": "Armed Forces Americas"},
                      {"id": 8, "name": "Armed Forces Canada"},
                      {"id": 9, "name": "Armed Forces Europe"},
                      {"id": 10, "name": "Armed Forces Middle East"},
                      {"id": 11, "name": "Armed Forces Pacific"},
                      {"id": 12, "name": "California"},
                      {"id": 13, "name": "Colorado"},
                      {"id": 14, "name": "Connecticut"},
                      {"id": 15, "name": "Delaware"},
                      {"id": 16, "name": "District of Columbia"},
                      {"id": 17, "name": "Federated States Of Micronesia"},
                      {"id": 18, "name": "Florida"},
                      {"id": 19, "name": "Georgia"},
                      {"id": 20, "name": "Guam"},
                      {"id": 21, "name": "Hawaii"},
                      {"id": 22, "name": "Idaho"},
                      {"id": 23, "name": "Illinois"},
                      {"id": 24, "name": "Indiana"},
                      {"id": 25, "name": "Iowa"},
                      {"id": 26, "name": "Kansas"},
                      {"id": 27, "name": "Kentucky"},
                      {"id": 28, "name": "Louisiana"},
                      {"id": 29, "name": "Maine"},
                      {"id": 30, "name": "Marshall Islands"},
                      {"id": 31, "name": "Maryland"},
                      {"id": 32, "name": "Massachusetts"},
                      {"id": 33, "name": "Michigan"},
                      {"id": 34, "name": "Minnesota"},
                      {"id": 35, "name": "Mississippi"},
                      {"id": 36, "name": "Missouri"},
                      {"id": 37, "name": "Montana"},
                      {"id": 38, "name": "Nebraska"},
                      {"id": 39, "name": "Nevada"},
                      {"id": 40, "name": "New Hampshire"},
                      {"id": 41, "name": "New Jersey"},
                      {"id": 42, "name": "New Mexico"},
                      {"id": 43, "name": "New York"},
                      {"id": 44, "name": "North Carolina"},
                      {"id": 45, "name": "North Dakota"},
                     {"id": 46, "name": "Northern Mariana Islands"},
                     {"id": 47, "name": "Ohio"},
                     {"id": 48, "name": "Oklahoma"},
                     {"id": 49, "name": "Oregon"},
                     {"id": 50, "name": "Palau"},
                      {"id": 51, "name": "Pennsylvania"},
                      {"id": 52, "name": "Puerto Rico"},
                    {"id": 53, "name": "Rhode Island"},
                     {"id": 54, "name": "South Carolina"},
                     {"id": 55, "name": "South Dakota"},
                     {"id": 56, "name": "Tennessee"},
                     {"id": 57, "name": "Texas"},
                     {"id": 58, "name": "Utah"},
                     {"id": 59, "name": "Vermont"},
                      {"id": 60, "name": "Virgin Islands"},
                      {"id": 61, "name": "Virginia"},
                      {"id": 62, "name": "Washington"},
                      {"id": 63, "name": "West Virginia"},
                        {"id": 64, "name": "Wisconsin"},
                      {"id": 65, "name": "Wyoming"}
  ];
var telephone = "";
  var customerlastname=$rootScope.customer_lname;
  var postcode=$rootScope.customer_pincode;
  var street=$rootScope.customer_shippadd;
  var city=$rootScope.customer_city;
  var region=$rootScope.customer_state;
  var firstname=$rootScope.customer_fname;
  var telephone =$rootScope.customer_phone;
  var regionId = $rootScope.customer_regionId;
  var custId=$rootScope.regvariable;
 var quoteId=$rootScope.Quote_id;
  var custAddrId =$rootScope.customer_address_id;
  var productitempush=$rootScope.productitempush;
  var email=$rootScope.EmailId;
var MyStatesList={};

$scope.MyAddressDetails={
    firstname:firstname,
    lastname:customerlastname  ,
   postcode:postcode,
   street:street,
    city:city,
    region:region,
    telephone:telephone,
    regionId:regionId,
    custId:custId,
    quoteId:quoteId,
    custAddrId:custAddrId,
    productitempush:productitempush,
    MyStatesList:MyStatesList
  };
$scope.MyAddressDetails.MyStatesList.id=regionId

$scope.KeyPress=function(event){ 
  var foo =event.target.value;
  var s=foo.split("-").join("");
  var maxvalue=""; 
 if (s.length > 0 && s.length<8) {
  s = s.match(new RegExp('.{1,3}', 'g')).join("-");
event.target.value=s;

}
}


$scope.Myshipaddress=function(){
  //alert("hai");
   if($scope.MyAddressDetails.MyStatesList.id==0){

      $ionicPopup.alert({
              title: 'PLEASE SELECT THE STATE'

            }).then(function(res) {

            });
    }else{
     $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
      $rootScope.one = false;
var  firstname= $scope.MyAddressDetails.firstname;
var lastname = $scope.MyAddressDetails.lastname;
var postcode  = $scope.MyAddressDetails.postcode;
var street=$scope.MyAddressDetails.street;
var city=$scope.MyAddressDetails.city;
var region =$scope.MyAddressDetails.region;
var  telephone=$scope.MyAddressDetails.telephone;
var regionId=$scope.MyAddressDetails.MyStatesList.id;
var  region= $scope.MyAddressDetails.MyStatesList.name;

var data={
firstname:firstname,
lastname:lastname,
street:street,
city:city,
region:region,
postcode:postcode,
telephone:telephone,
regionId:regionId,
custId:custId,
email:email,
quoteId:quoteId,
custAddrId:custAddrId,
productitempush:productitempush
}
//alert("dattatatatat"+JSON.stringify(data));
$http.post('http://otcdeal.com/OTCDealWS/OTCDealAddress.php',data).then(
  function successCallback(response) {


//alert("responseee"+JSON.stringify(response));
$scope.addressstatus = response.status
//alert("hai");
//$rootScope.sessionquoteid=$rootScope.ShippingMethods.pop();
//$rootScope.var11=$rootScope.ShippingMethods[$rootScope.shipping_variable.length-1];


$timeout(function () {
    $ionicLoading.hide();

  }, 2000);

 var cartPopup = $ionicPopup.show({

       

       template: '<p class="padding">Address saved successfully</p>'
       })
       $timeout(function() {
       cartPopup.close();
     }, 1000);

$state.go('app.MyAccount');
$timeout(function() {

            var el = document.getElementById('secondbutton');



            angular.element(el).triggerHandler('click');
        }, 0);

  },
  function failureCallback(response){

alert('Internal Server Error');
$timeout(function () {
    $ionicLoading.hide();
 
  }, 2000);
alert('error');

  })



    }


  };


  
})
.controller('MyOrdersCtrl', function($scope,$rootScope,$state,$ionicHistory){

  })
.controller('AccountInformationCtrl', function($scope,$rootScope,$state,$ionicHistory,$http,$filter,$timeout){
      
var vm=this;
    
$scope.Useravailable="";   
$scope.UserDetails={  
id:$rootScope.regvariable,
usermail:$rootScope.EmailId, 
oldPassword:"",  
newPassword:"",    
ConfirmPassword:""
}  
 
$scope.reset = true;
 $scope.FormClearObject={};
$scope.changepassword=function(){ 

$scope.FormClearObject.AccountForm.$setUntouched();
$scope.UserDetails={  
oldPassword:"",  
newPassword:"",    
ConfirmPassword:""
}    
  $scope.reset = $scope.reset ? false : true; 
      
}   
  
$scope.ChangingPassword=function(){   

  $scope.messageerror="message-error";
  if($scope.UserDetails.newPassword!=$scope.UserDetails.ConfirmPassword){
   $scope.Useravailable="password not matches ";
    return; 
  } 
   


  $scope.Useravailable="";
var id=$scope.UserDetails.id;
var userid=$scope.UserDetails.usermail;
var op=$scope.UserDetails.oldPassword;
var np=$scope.UserDetails.newPassword;
    
var data={  
  id:id,
 username:userid,
  op:op,
  np:np 
};       

$http.post('http://otcdeal.com/OTCDealWS/OTCDealChangePassword.php',data).then(function successCallback(response) { 
if(response.data.indexOf("Your")==1 && response.status=="200"){  
    $scope.messageerror="successcolor"; 
    $scope.Useravailable="your password changed successfully";
}  
else if(response.data.indexOf("Incorrect")==1 && response.status=="200"){
   $scope.Useravailable="incorrect old password";
}    
 
},function failureCallback(error){

 $scope.Useravailable="network error";
}) 


}

})


.controller('OrderCtrl', function($scope,$rootScope,$state,$ionicHistory){
$scope.continue=function(){
    $rootScope.productitempush.length = 0;
    $rootScope.ShippingMethods.length = 0;
    $rootScope.taxcalculation.length = 0;


    $ionicHistory.nextViewOptions({
      historyRoot: true
  })
$state.go('app.home');
}
 
})
var serialize = function(obj, prefix) {
  var str = [];
  for(var p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push(typeof v == "object" ?
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
};


function mycall(customerid,CustomerInfo,RootScope){ 
CustomerInfo.fetchUserDetails(customerid).then(function(response){
  RootScope.customer_fname = response.data.records[0].firstname; 
 RootScope.customer_lname  =response.data.records[0].lastname; 
return true;
},function(error){     
 

})
}
 



