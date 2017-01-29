angular.module('OTCDEAL.Config', ['ionic'])
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$httpProvider) {
  $ionicConfigProvider.backButton.text('').icon('ion-chevron-left');
  $httpProvider.defaults.transformRequest = function(data){
        if (data === undefined) {
            return data;
        }
        return serialize(data);
    };
 $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

  $stateProvider
.state('root', {
    url: '/root',

        templateUrl: 'templates/root.html'
    })
.state('create', {
    url: '/create',
  templateUrl: 'templates/create.html',
 controller: 'CreateCtrl'

    })
.state('singin', {
    url: '/singin',

        templateUrl: 'templates/singin.html',
        controller: 'SinginCtrl'
    })
.state('search', {
    url: '/search',

        templateUrl: 'templates/search.html',
        controller: 'SearchCtrl'
    })

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.category', {
    url: '/category',
    views: {
      'menuContent': {
        templateUrl: 'templates/category.html',
         controller: 'CategoryCtrl'
      }
    }
  })
.state('app.MyAccount', {
      url: '/MyAccount',
      views: {
        'menuContent': {
          templateUrl: 'templates/MyAccount.html',
          controller: 'MyAccountCtrl'
          
        }
      }
    })
.state('app.AccountInformation', {
      url: '/AccountInformation',
      views: {
        'menuContent': {
          templateUrl: 'templates/AccountInformation.html',
         controller: 'AccountInformationCtrl'
        }
      }
    })
.state('app.AddressBook', {
      url: '/AddressBook',
      views: {
        'menuContent': {
          templateUrl: 'templates/AddressBook.html',
          controller: 'AddressBookCtrl'
          
        }
      }
    })
.state('app.MyOrders', {
      url: '/MyOrders',
      views: {
        'menuContent': {
          templateUrl: 'templates/MyOrders.html',
          controller: 'MyOrdersCtrl'
         
        }
      }
    })
  .state('app.productlist', {
      url: '/productlist',
      views: {
        'menuContent': {
          templateUrl: 'templates/productlist.html',
          controller: 'ProductListCtrl'
        }
      }
    })
   .state('app.product_Details', {
      url: '/product_Details',
      views: {
        'menuContent': {
          templateUrl: 'templates/product_Details.html',
          controller: 'ProductDetailsCtrl'
        }
      }
    })
    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })
.state('app.cart', {
      url: '/cart',
      views: {
        'menuContent': {
          templateUrl: 'templates/cart.html',
          controller: 'CartCtrl'
        }
      }
    })
.state('app.shipping_address', {
      url: '/shipping_address',
      views: {
        'menuContent': {
          templateUrl: 'templates/shipping_address.html',
          controller: 'ShippingAddressCtrl'
        }
      }
    })
.state('app.shipping_methods', {
      url: '/shipping_methods',
      views: {
        'menuContent': {
          templateUrl: 'templates/shipping_methods.html',
          controller: 'ShippingMethodsCtrl'
        }
      }
    })
.state('app.payment', {
      url: '/payment',
      views: {
        'menuContent': {
          templateUrl: 'templates/payment.html',
          controller: 'ShippingAddressCtrl'
        }
      }
    })
.state('order_conform', {
      url: '/order_conform',

          templateUrl: 'templates/order_conform.html',
          controller: 'OrderCtrl'

    });
 /*.state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });*/
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/root');
});
