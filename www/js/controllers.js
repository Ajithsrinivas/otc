angular.module('OTCDEAL.Controllers', ['ionic'])
.controller('CreateCtrl', function($scope,$http,$location,$ionicHistory,$rootScope,$state,localVariables,pushingServices,customerDetails) {
  $scope.myGoBack = function() {
$location.path('/singin');
             };

  $scope.inputType ='password';
  $scope.Useravailable='';


$scope.registrationDetails=function(RegistrationDetails){
$scope.Useravailable='';

var  password=RegistrationDetails.Password;
var  email=RegistrationDetails.EmailId;
var  UserName =RegistrationDetails.UserName;
var  LastName= RegistrationDetails.LastName;
alert(UserName+" "+LastName+" "+email+" "+password);
var  data = { id: email , password : password ,UserName:UserName, LastName :LastName};



pushingServices.RegistrationDetails(data).then(function successCallback(response) {
   alert(JSON.stringify(response)+"sucees");
localVariables.setregvariable(response.data.records[0]);
localVariables.setloginvariable(response.data.records[1]);
customerDetails.setcustomer_fname(RegistrationDetails.UserName);
customerDetails.setcustomer_lname(RegistrationDetails.LastName);

if( $rootScope.Forword == true){
  customerDetails.setcustomer_email(email);
  pushingServices.shippingaddress(localVariables.getregvariable()).success(function(data){
    $location.path("/app/shipping_address");
  }).error(function(data, status){
$timeout(function () {
 $ionicLoading.hide();
}, 0);
        });
}
else{

   customerDetails.setcustomer_email(email);

$location.path("/app/home");
}
},function failure(response){
  //console.log(response);
 $scope.Useravailable="already emailId exists";

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


.controller('SinginCtrl', function($scope,$http,$location,$ionicHistory,$ionicPopup,$ionicLoading,$rootScope,$timeout,customerDetails,localVariables,consumingServices,pushingServices,$log,$exceptionHandler) {
$scope.myGoBack = function() {
     if ($ionicHistory.backView()==null) {

      $location.path("/app/home");
     };
                 $ionicHistory.goBack();
             };
$scope.inputType = 'password';
$scope.errorMessage='';

$scope.signIn=function(authorizationForm){



$scope.shipping_variable={};
$scope.shippingvar1=false;
$scope.shippingvar2=false;
$scope.shippingvar3=false;

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


  pushingServices.loginDetails(data).then(function successCallback(response) {
    $timeout(function () {
$ionicLoading.hide();
}, 0);


    customerDetails.setcustomer_email(email);

     localVariables.setregvariable(response.data.records[0].customer_id);

      mycall(response.data.records[0].customer_id,consumingServices,customerDetails);

  localVariables.setloginvariable(response.data.records[1]);

    var registervariable = localVariables.getregvariable(response.data.records[0].customer_id);
  consumingServices.BuynowfetchUserDetails(registervariable).success(function(response){

  $scope.shipping_variable = response.records;
    alert(JSON.stringify(response));
     alert(JSON.stringify(response.records));
  try{
    $scope.shippingvar1 = $scope.shipping_variable[0].is_default_shipping;
  }catch(error1){

  }

    try{
   $scope.shippingvar2 = $scope.shipping_variable[1].is_default_shipping;
 }catch(error1){

 }

  try{
 $scope.shippingvar3 = $scope.shipping_variable[2].is_default_shipping;
}catch(error2){

}



    if($scope.shippingvar1 === true ){

 // $rootScope.customer_address_id = $rootScope.shipping_variable[0].customer_address_id;
      customerDetails.setcustomer_address_id(response.records[0].customer_address_id);
     customerDetails.setcustomer_fname(response.records[0].firstname);
     customerDetails.setcustomer_lname(response.records[0].lastname);
     customerDetails.setcustomer_city(response.records[0].city);
     customerDetails.setcustomer_pincode(response.records[0].postcode);
     customerDetails.setcustomer_state(response.records[0].region);
     customerDetails.setcustomer_regionId(response.records[0].region_id);
     customerDetails.setcustomer_shippadd(response.records[0].street);
      customerDetails.setcustomer_phone(response.records[0].telephone);


    }

    else if($scope.shippingvar2 === true ){
     customerDetails.setcustomer_address_id(response.records[0].customer_address_id);
     customerDetails.setcustomer_fname(response.records[1].firstname);
     customerDetails.setcustomer_lname(response.records[1].lastname);
     customerDetails.setcustomer_city(response.records[1].city);
     customerDetails.setcustomer_pincode(response.records[1].postcode);
     customerDetails.setcustomer_state(response.records[1].region);
     customerDetails.setcustomer_regionId(response.records[1].region_id);
     customerDetails.setcustomer_shippadd(response.records[1].street);
      customerDetails.setcustomer_phone(response.records[1].telephone);


    }

    else if($scope.shippingvar3 === true ){
     customerDetails.setcustomer_address_id(response.records[0].customer_address_id);
     customerDetails.setcustomer_fname(response.records[2].firstname);
     customerDetails.setcustomer_lname(response.records[2].lastname);
     customerDetails.setcustomer_city(response.records[2].city);
     customerDetails.setcustomer_pincode(response.records[2].postcode);
     customerDetails.setcustomer_state(response.records[2].region);
     customerDetails.setcustomer_regionId(response.records[2].region_id);
     customerDetails.setcustomer_shippadd(response.records[2].street);
      customerDetails.setcustomer_phone(response.records[2].telephone);

    }

    else{


    }

  },function(response){



  }
  );



   if(localVariables.getloginvariable()=== false || response.data.records[0] == false){


    $scope.errorMessage='Invalid Username/Password';
    $timeout(function () {
    $scope.loading.hide();
    }, 0);
  }
   else if ($rootScope.Forword == true){

   //$rootScope.EmailId = email;

customerDetails.setcustomer_email(email);

   $http.get('http://otcdeal.com/OTCDealWS/OTCDealCartCustomer.php?custid='+localVariables.getregvariable())
  .success(function(data){
    $scope.data =data;

    $location.path("/app/shipping_address");
  });
  }
  else{
 //$rootScope.EmailId = response.data.records[0].email;
  customerDetails.setcustomer_email(response.data.records[0].email);


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



pushingServices.forgotpassword(data).then(function successCallback(response) {
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
.controller('AppCtrl', function($scope,$window,$ionicModal,$ionicHistory, $ionicLoading,$timeout,$ionicPopup,$location,$rootScope,localVariables,consumingServices) {

$scope.regvariable=localVariables.getregvariable();
$scope.loginvariable=localVariables.getloginvariable();

$scope.logout = function(){
//$rootScope.loginvariable = false;
//$rootScope.regvariable = 0;
 localVariables.setregvariable(0);
localVariables.setloginvariable(false);
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


consumingServices.fetchUserDetails(MainCategoryid).success(function(response){
        $scope.cat = response.records;
     // console.log(JSON.stringify(response.records));
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
.controller('HomeCtrl', function($scope,$state,$rootScope, $ionicLoading,$timeout,consumingServices,productLists) {

  //Author by veera
  //this is function using for categorydeals in homepage

$scope.HomeCategorylist = function(categorylistid,name){

  var spinnerHtml = '<span data-animation="true" data-tags="spinner, waiting, refresh, animation" data-pack="default" class="ion-loading-c"></span>';
$scope.loading = $ionicLoading.show({content: 'Loading...' + spinnerHtml});

consumingServices.ProductListfetchUserDetails(categorylistid).success(function(response){
 // alert("success from product;list")
       $rootScope.Eachcatproducts = response.records;
       angular.forEach($rootScope.Eachcatproducts,function(value, key) {
    value.image= value.image.replace('http:' ,'https:');

   },[]);

//$rootScope.categoriesname=name;
  $scope.categoriesname=name;
 productLists.setcategoriesname(name);


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
.controller('CategoryCtrl',function($scope,$http,$rootScope,$ionicLoading,$timeout,$state,consumingServices,productLists) {


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

consumingServices.ProductListfetchUserDetails(categorylistid).success(function(response){

    ///$rootScope.categoriesname=group.name ;

   productLists.setcategoriesname(group.name);

       $rootScope.Eachcatproducts = response.records;
      //console.log($rootScope.Eachcatproducts);
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
  alert("sjhgfjhsd"+MainCategoryid);

  var spinnerHtml = '<span data-animation="true" data-tags="spinner, waiting, refresh, animation" data-pack="default" class="ion-loading-c"></span>';
$scope.loading = $ionicLoading.show({content: 'Loading...' + spinnerHtml});

consumingServices.fetchUserDetails(MainCategoryid).success(function(response){


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

consumingServices.ProductListfetchUserDetails(categorylistid).success(function(response){
 $rootScope.Eachcatproducts = response.records;

   $rootScope.categoriesname=name;

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

.controller('ProductDetailsCtrl', function($scope,$rootScope,$rootScope,$location,$state) {




})
//End of the controller

//This controller Delete the Cart Products and Redirect to HomePage
.controller('CartCtrl', function($scope,$rootScope,$timeout,$location,$ionicHistory,$state, $ionicPopup,localVariables) {

  $scope.checkout = function(){
    if(localVariables.getloginvariable()=== false ){
       $rootScope.Forword = true;

    $location.path('/singin');
    }

    else if(localVariables.getregvariable()=== 0 ){
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
  alert(JSON.stringify(productdetails)+"productdetails");
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
           cssClass: 'popbg',
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


  if(localVariables.getloginvariable()=== false ){
    $rootScope.Forword = true;
$location.path('/singin');
  }

  else if(localVariables.getregvariable() === 0 ){
     $rootScope.Forword = true;
$location.path('/singin');

  }

  else{

    $state.go('app.shipping_address');

  }

};


})
//End of the controller


.controller('ShippingAddressCtrl', function($scope,$rootScope,$http,$state,$ionicLoading,$timeout,$ionicPopup,$location,customerDetails,localVariables,pushingServices) {



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




var firstname=customerDetails.getcustomer_fname();
var customerlastname=customerDetails.getcustomer_lname();
var postcode=customerDetails.getcustomer_pincode();
var street=customerDetails.getcustomer_shippadd();
var city=customerDetails.getcustomer_city();
var region=customerDetails.getcustomer_state();
var telephone=customerDetails.getcustomer_phone();
var regionId=customerDetails.getcustomer_regionId();



  var custId=localVariables.getregvariable();

 var quoteId=$rootScope.Quote_id;
  var productitempush=$rootScope.productitempush;
  var custAddrId =customerDetails.getcustomer_address_id();
 var email=customerDetails.getcustomer_email();

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



var data={
firstname:$scope.ShippingAddressDetails.firstname,
lastname:$scope.ShippingAddressDetails.lastname,
street:$scope.ShippingAddressDetails.street,
city:$scope.ShippingAddressDetails.city,
region:$scope.ShippingAddressDetails.StatesList.name,
postcode: $scope.ShippingAddressDetails.postcode,
telephone:$scope.ShippingAddressDetails.telephone,
regionId:$scope.ShippingAddressDetails.StatesList.id,
custId:custId,
email:email,
quoteId:quoteId,
custAddrId:custAddrId,
productitempush:productitempush
}

//$http.post('http://otcdeal.com/OTCDealWS/OTCDealUpdateAddress.php',data)
 pushingServices.updateAddressDetails(data).then(
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
.controller('SearchCtrl', function($ionicHistory,$scope,$rootScope,$http,$ionicLoading,$timeout,consumingServices) {
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


/*search.SearchDetails(id).success(function(response){
   if(response.length==0){
    $scope.flag=true;
$scope.Result="There are no products matching the selection.";
   }*/

consumingServices.SearchDetails(id).success(function(response){
   if(response.length==0){
    $scope.flag=true;
$scope.Result="There are no products matching the selection.";
   }


$scope.result=response;

//console.log($scope.result);
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
 .controller('paymentctrl', function($scope,$location,$rootScope,$http,$state,$ionicLoading,$timeout,$filter,localVariables,customerDetails,pushingServices) {
$scope.nonce="";
//console.log($rootScope.regvariable);
 document.getElementById("try").style.visibility = "hidden";

var data={
   id:localVariables.getregvariable(),
firstName:$rootScope.fname,
    lastName:$rootScope.lname,
     email:customerDetails.getcustomer_email(),
        phone:$rootScope.phone
}


  pushingServices.clientToken(data).then(function(response) {
      var clientToken=response.data;
 braintree.setup(clientToken, "dropin", {
  container: "payment-form",
   onPaymentMethodReceived: function (obj) {
   // console.log(obj);
    $scope.nonce=obj.nonce;
    $scope.type=obj.type;
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
  alert('please select payment option');
}else{


var data={paymentmethod:$scope.nonce,amount:$rootScope.taxcalculation[3].amount,quoteId : $rootScope.sessionquoteid,
shipTitle:$rootScope.shipTitle,
type:$scope.type};
pushingServices.paymentOrder(data).then(
    function successCallback(response) {

  $rootScope.orderId = response.data;

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
.controller('ProductListCtrl', function($scope,$state,$rootScope,$filter,$http,$ionicLoading,$timeout,consumingServices){

$scope.productltpush = function(productid) {
$rootScope.click = 0;
  var spinnerHtml = '<span data-animation="true" data-tags="spinner, waiting, refresh, animation" data-pack="default" class="ion-loading-c"></span>';
$scope.loading = $ionicLoading.show({content: 'Loading...' + spinnerHtml});

consumingServices.ProductDescfetchUserDetails2(productid).success(function(response2){

$rootScope.productdetails = response2.records;
 angular.forEach($rootScope.productdetails,function(value, key) {
    value.image= value.image.replace('http' ,'https');

   },[]);

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
.controller('ShippingMethodsCtrl', function($scope,$rootScope,$http,customerDetails,$state,$ionicLoading,$timeout,pushingServices,localVariables){

$scope.CouponArray = {};

$scope.Apply = function(e){

   if($scope.CouponArray.couponcode == null || $scope.CouponArray.couponcode == "") {
      $scope.error = "please enter coupon code";
      $scope.success = "";
 }
else{
    var qouteid = $rootScope.sessionquoteid;
    var  customerid = localVariables.getregvariable();

        var data={
couponcode:$scope.CouponArray.couponcode,
quoteid:qouteid,
customerid:customerid,
}

pushingServices.CouponCode(data).then(function(response) {

$scope.error = "";
$scope.success = "";

if(response.data.indexOf('coupon successfully applied') >= 0){
$scope.success = "coupon successfully applied";
$scope.error = "";
$scope.shipmethodtax($rootScope.shipcodedata,$rootScope.shipTitle);
}
if(response.data.indexOf('please enter valid coupon code') >= 0){
$scope.success = "";
$scope.error = "please enter valid coupon code";
     $scope.shipmethodtax($rootScope.shipcodedata,$rootScope.shipTitle);
}
},function failureCallback(error){

 alert("error"+error.status);
 if(error.status == 500){
  $scope.error = "you already used";
$scope.success = "";
 }

})

    }
  }








  $rootScope.one = false;

$scope.shipmethodtax = function(code,mTitle){
$rootScope.firstvalue = $rootScope.ShippingMethods[0];
     $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  $rootScope.one = true;
  $rootScope.shipcodedata = code;
$rootScope.shipTitle = mTitle;

  var shipcode = code;
  var qouteid = $rootScope.sessionquoteid;

var data={
shipcode:shipcode,
quoteId:qouteid
}


  pushingServices.setShippingMethod(data).then(
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
.controller('MyAccountCtrl', function($scope,$rootScope,$state,$ionicHistory,$http,$timeout,$ionicLoading,localVariables,consumingServices){


$scope.ErrorClass=true;

$scope.accountinformation = function(){

$state.go('app.AccountInformation');


}
$scope.MyOrders = function(){

var customerid = localVariables.getregvariable();
consumingServices.OrderFactoryfetchUserDetails(customerid).success(function(response){
     $rootScope.orderstatus = response.records;


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
.controller('AddressBookCtrl', function($scope,$rootScope,$http,$state,$ionicLoading,$timeout,$ionicPopup,customerDetails,localVariables,pushingServices){

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
 var firstname=customerDetails.getcustomer_fname();
 var customerlastname=customerDetails.getcustomer_lname();
var street=customerDetails.getcustomer_shippadd();
var city= customerDetails.getcustomer_city();
var region=customerDetails.getcustomer_state();
var telephone=customerDetails.getcustomer_phone();
var regionId = customerDetails.getcustomer_regionId();
  var postcode=customerDetails.getcustomer_pincode();

 var custId=localVariables.getregvariable();
 var quoteId=$rootScope.Quote_id;
  var custAddrId =$rootScope.customer_address_id;
  var productitempush=$rootScope.productitempush;
var email=customerDetails.getcustomer_email();
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

 pushingServices.CustomerAddress(data).then(
  function successCallback(response) {
$scope.addressstatus = response.status

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
.controller('AccountInformationCtrl', function($scope,$rootScope,$state,$ionicHistory,$http,$filter,$timeout,customerDetails,localVariables){

var vm=this;

$scope.customer_fname=customerDetails.getcustomer_fname();
$scope.customer_lname=customerDetails.getcustomer_lname();
$scope.EmailId=customerDetails.getcustomer_email();
$scope.Useravailable="";
$scope.UserDetails={
id:localVariables.getregvariable(),
usermail:customerDetails.getcustomer_email(),
oldPassword:"",
newPassword:"",
ConfirmPassword:""
}

$scope.reset = true;
 $scope.FormClearObject={};
$scope.changepassword=function(){
$scope.Useravailable="";
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

var id=localVariables.getregvariable();

var userid=customerDetails.getcustomer_email();
var op=$scope.UserDetails.oldPassword;
var np=$scope.UserDetails.newPassword;

var data={
  id:id,
 username:userid,
  op:op,
  np:np
};


pushingServices.changePassword(data).then(function successCallback(response) {
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









function mycall(customerid,consumingServices,customerDetails){
consumingServices.CustomerInfofetchUserDetails(customerid).then(function(response){
customerDetails.setcustomer_fname(response.data.records[0].firstname);
customerDetails.setcustomer_lname(response.data.records[0].lastname);

return true;
},function(error){


})
}
