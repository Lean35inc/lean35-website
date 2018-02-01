'use strict';

angular.module('loadingSpinner', [])
  .config(function($httpProvider) {
    $httpProvider.responseInterceptors.push('onCompleteInterceptor');
  })
  .run(function($http, onStartInterceptor) {
    $http.defaults.transformRequest.push(onStartInterceptor);
  })
  .factory('onCompleteInterceptor', function(loadingService) {
    return function(promise) {
      var decrementRequestCount = function(response) {
        loadingService.requestCount--;

        if (loadingService.requestCount >= 0 && loadingService.ShowGlobalLoadingSpinner) {
          HidePageLoadSpinner();
        }

        //loadingService.ShowGlobalLoadingSpinner = true;

        return response;
      };
      // Normally we would just chain on to the promise but ...
      //return promise.then(decrementRequestCount, decrementRequestCount);
      // ... we are delaying the response by 2 secs to allow the loading to be seen.
      return promise.then(decrementRequestCount, decrementRequestCount);
    };
  })
  .factory('onStartInterceptor', function(loadingService) {
    return function(data, headersGetter) {
      loadingService.requestCount++;
      if (loadingService.requestCount > 0 && loadingService.ShowGlobalLoadingSpinner) {
        ShowPageLoadSpinner();
      }

      return data;
    };
  })
  .factory('loadingService', function() {
    var service = {
      requestCount: 0,
      isLoading: function() {
        return service.requestCount > 0;
      },
      ShowGlobalLoadingSpinner: true,
    };
    return service;
  });

//Private

function ShowPageLoadSpinner() {
  var operations = parseInt($('#pageLoadSpinner').attr('operations'));
  if (isNaN(operations)) {
    $('#pageLoadSpinner').attr('operations', 1);
    $('#pageLoadSpinner').modal('show');
  } else {
    $('#pageLoadSpinner').attr('operations', operations + 1);
  }
}

function HidePageLoadSpinner(isHideImmediately) {
  if (isHideImmediately) {
    $('#pageLoadSpinner').removeAttr('operations');
    $('#pageLoadSpinner').modal('hide');
  } else {
    var operations = parseInt($('#pageLoadSpinner').attr('operations'));
    if (operations == 1) {
      $('#pageLoadSpinner').removeAttr('operations');
      window.setTimeout(function () {
        if (!$('#pageLoadSpinner').attr('operations'))
          $('#pageLoadSpinner').modal('hide');
      }, 400);
    } else {
      $('#pageLoadSpinner').attr('operations', operations - 1);
    }
  }
}