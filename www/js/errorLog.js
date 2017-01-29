 
angular.module('OTCDEAL.errors', ['ionic']) 

.provider("$exceptionHandler",
        {  
            $get: function(errorLogService) {
                console.log("$exceptionHandler.$get()");
                return(errorLogService);
            }
        })
 
//
// Factory to provider error log service
.factory(
        "errorLogService",
        function($log, $window) {
            
            $log.info("errorLogService()");

            function log(exception, cause) {
                $log.debug("errorLogService.log()");
                
                // Default behavior, log to browser console
                $log.error.apply($log, arguments);

                logErrorToServerSide(exception, cause);
            }

            function logErrorToServerSide(exception, cause) {
  
                alert(cause);  

                $log.info("logErrorToServerSide()... NOT IMPLEMENTED");
            }
            
            // Return the logging function.
            return(log);            
        });










