"use strict";

var logHeader = (function() {
  var http = require("http"),
    httpHeaders = require("http-headers"),
    q = require("q"),
    _ = require("underscore"),
    promiseList = [],
    targets = require("./targetObjects.json");
    var resultList = [];
    var complete = false;
    var callBack = function(){};

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
          // let result = JSON.stringify(resp.headers)
          let result = resp.headers;

          resultList.push(result);
          console.log(result);
          deferred.resolve();
        });
      })
      .on("error", e => {
        // let result = JSON.stringify("ERROR:" + e.message);
        let result = "ERROR:" + e.message;
        resultList.push(result);
        console.error(result);
        deferred.resolve();
      });

    return deferred.promise;
  };

  var getResultList = function () {
    return resultList;
  };



  var execAsyncCalls = function() {
    //What would happen if the functions register them selfs to a call back?

    complete = false;

    _(targets).each(s => {
      promiseList.push(getHeader(s));
    });

    q.all(promiseList)
    .catch(function(e){
        console.log(e.message);
    })
    .done(function() {
      complete = true;
      console.log("All the calls have been executed");
      callBack(resultList);
    });
  };

  var isComplete = function () {
    return complete;
  };

  var setCallBack = function (cb) {
    callBack = cb;
  };

  return {
    execAsyncCalls: execAsyncCalls,
    getResultList: getResultList,
    isComplete: isComplete,
    setCallBack : setCallBack
  };
})();

var fileWriter = (function(){
  var fs = require('fs');

  var exec = function(data){
    let json = JSON.stringify(data);
    fs.writeFile('output.json', json, 'utf8', function(e){
      if(e){
        console.error(e);
      }
    });

  };


  return {
    exec: exec
  }

}());

logHeader.setCallBack(fileWriter.exec)
logHeader.execAsyncCalls();

