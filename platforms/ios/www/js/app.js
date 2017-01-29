// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('OTCDEAL', ['ionic', 'OTCDEAL.Controllers','OTCDEAL.Services','OTCDEAL.Config','OTCDEAL.Directive','ionicLazyLoad'])
.run(function($ionicPlatform,$ionicPopup,$rootScope) {
    $rootScope.productdetails = []; 
    $rootScope.productitempush = []; 
    $rootScope.categorieslist = [];
    $rootScope.Forword = false;
    $rootScope.Eachcatproducts = [];
    //$rootScope.user = [];
    $rootScope.categoriesname="";
    $rootScope.subtotal = 0;
    $rootScope.loginvariable = false;
    $rootScope.one = false;
    $rootScope.regvariable = 0;
    $rootScope.shipping_variable = [];
    $rootScope.shippingvar1 = false;
    $rootScope.shippingvar2 = false;
    $rootScope.shippingvar3 = false;
    $rootScope.customer_addcart = false;
    $rootScope.Quote_id = 0;
    $rootScope.taxcalculation = [];
    $rootScope.region_id = 0;
    $rootScope.customer_address_id =0;
    $rootScope.customer_fname = "";
    $rootScope.customer_lname = "";
    $rootScope.customer_city = "";
    $rootScope.customer_pincode = "";
    $rootScope.customer_state = "";
    $rootScope.customer_shippadd= "";
    $rootScope.customer_phone= "";
    $rootScope.customer_regionId =0;
    $rootScope.ShippingMethods = [];
    $rootScope.EmailId = "";
    $rootScope.click= 0;
    $rootScope.creditcardname = "";
 //$rootScope.image="";

$ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true); 

    } 
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                  /*  $ionicPopup.confirm({
                        title: "Internet Disconnected",
                        content: "The internet is disconnected on your device."
                    })*/
 /* alert ("internet connection error ");*/
  var alertPopup = $ionicPopup.alert({
        title: "Internet Disconnected",
        template: "internet is disconnected on your device."
      }).then(function(result) {
             ionic.Platform.exitApp();
                    });
        
                }
            }
  });
})
