angular.module('OTCDEAL.Directive', ['ionic'])

.directive('numbersOnly', function () {
   return  {
        restrict: 'A',
        link: function (scope, element, attrs, ngModel) {
   element.bind('keydown', function (e, inputs) {
           var code = e.keyCode || e.which;
            var val = element[0].value;
   if(val.length==12 && e.keyCode!=8) {
    return false; 
   }   
       
   })
     }

}
})
