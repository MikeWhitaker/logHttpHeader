"use strict";

var controller = (function() {
  var http = require("http"),
    httpHeaders = require("http-headers"),
    q = require("q"),
    _ = require("underscore"),
    promiseList = [],
    targets = require("./targetObjects.json");

  /*   
       var stubFunction = function() {
       var deferred = q.defer();
    
       deferred.resolve();
       return deferred.promise;
       };
  */

  var getHeader = function(targetObj) {
    promiseList.push(this);
    var deferred = q.defer();

    var options = {
      host: targetObj.address,
      path: targetObj.path,
      method: "GET"
    };

    http
      .get(targetObj.address, resp => {
        var responseString = "";

        resp.on("data", function(data) {
          responseString += data;
        });
        resp.on("end", function() {
          resp.headers.label = targetObj.label;
          console.log(JSON.stringify(resp.headers));
          deferred.resolve();
        });
      })
      .on("error", e => {
        console.error("ERROR:" + e.message);
        deferred.resolve();
      });

    return deferred.promise;
  };

  var execAsyncCalls = function() {
    //What would happen if the functions register them selfs to a call back?

    _(targets).each(s => {
      promiseList.push(getHeader(s));
    });

    q.all(promiseList)
    .catch(function(e){
        console.log(e.message);
    })
    .done(function() {
      console.log("All the calls have been executed");
    });
  };

  return {
    execAsyncCalls: execAsyncCalls
  };
})();

controller.execAsyncCalls();
