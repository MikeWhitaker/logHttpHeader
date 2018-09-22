var controller = (function() {
    var q = require("q");
    
    var asyncFuncA = function (){
        var deferred = q.defer();
        let timeoutInMiliSeconds = Math.random() * 10000;
        console.log('Function A will take: ' + timeoutInMiliSeconds + ' to execute');
        setTimeout(function(){
            console.log('function A, done in: ' + timeoutInMiliSeconds + ' milliseconds');
            deferred.resolve();
        },timeoutInMiliSeconds);
        return deferred.promise;
    };
    
    var asyncFuncB = function (){
        var deferred = q.defer();
        let timeoutInMiliSeconds = Math.random() * 10000;
        console.log('Function B will take: ' + timeoutInMiliSeconds + ' to execute');
        setTimeout(function(){
            console.log('function B, done in: ' + timeoutInMiliSeconds + ' milliseconds');
            deferred.resolve();
        },timeoutInMiliSeconds);
        return deferred.promise;
    };

    var asyncFuncC = function (){
        var deferred = q.defer();
        let timeoutInMiliSeconds = Math.random() * 10000;
        console.log('Function C will take: ' + timeoutInMiliSeconds + ' to execute');
        
        setTimeout(function(){
            console.log('function C, done in: ' + timeoutInMiliSeconds + ' milliseconds');
            deferred.resolve();
        },timeoutInMiliSeconds);
        return deferred.promise;
    };

    var execAsyncCalls = function () {
        //What would happen if the functions register them selfs to a call back?
        
        q.all([asyncFuncA(),asyncFuncB(),asyncFuncB()])
            .then(function(){
                console.log('All the functions have been executed');
                
            });
        
        // asyncFuncA();
        // asyncFuncB();
        // asyncFuncC();
    };

    return {
        execAsyncCalls: execAsyncCalls,
    };
}());

controller.execAsyncCalls();


