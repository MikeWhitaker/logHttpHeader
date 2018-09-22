function one() {
    
    var deferred = Q.defer(); // Don't worry yet what this is
                              // until after you understand the flow
    
    console.log("Starting one's ajax");
    $.ajax( {
        url: '/',
        success: function() {
            
            // Here's where you want to call the next function in the
	    // list if there is one. To do it, call deferred.resolve()
            console.log('Finished with one. Ready to call next.');
            deferred.resolve();
            
        }
        
    });
    
    // The deferred object has a "promise" member, 
    // which has a "then" function
    return deferred.promise;
}

function two() {
    var deferred = Q.defer();
    console.log("Starting two's ajax");
    $.ajax( {
        url: '/',
        success: function() {
            
            // Again, this is where you want to call the next function
	    // in the list if there is one.
            console.log('Finished with two. Ready to call next.');
            deferred.resolve();
            
        }
        
    });
    // The deferred object has a "promise" member,
    // which has a "then" function
    return deferred.promise;
}

function three() {
    var deferred = Q.defer();
    console.log("Starting three's ajax");
    $.ajax( {
        url: '/',
        success: function() {
            
            // Again, this is where you want to call the next function
	    // in the list if there is one.
            console.log('Finished with three. Ready to call next if there is one.');
            deferred.resolve();
            
        }
        
    });
    // The deferred object has a "promise" member, which has a "then" function
    return deferred.promise;
}

// Test it out. Call the first. Pass the functions 
// (without calling them, so no parentheses) into the then calls.

one()
    .then(two)
    .then(three);

/* =====
Think about where the "then" function comes from. Each function 
creates a new defer instance and returns that object's promise 
member. That promise object has a "then" function. On return 
from the first function, you get back a defer function, and 
call the "then" function, passing the *next* function that is 
to be called. Internally, Q stores that function. When your 
ajax call returns, in your "success" function, you call the 
next function by calling deferred.resolve().
======*/