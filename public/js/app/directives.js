'use strict';

/* Directives */


var mymodule = angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

  mymodule.directive('modal', function factory(){
  	return {
  		restrict: 'E',
  		templateUrl : '/templates/modal',
  		replace: true,
  		transclude: true,
		scope: {
		    title: '@title',             // the title uses the data-binding from the parent scope
		    content: '@content'            // set up visible to accept data-binding
		}
  	}
  });
