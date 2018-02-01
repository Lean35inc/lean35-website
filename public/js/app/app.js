'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'loadingSpinner']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {templateUrl: '/partials/home', controller: HomeCtrl});
    $routeProvider.when('/about-us', {templateUrl: '/partials/about-us', controller: HomeCtrl});
    $routeProvider.when('/services', {templateUrl: '/partials/services', controller: HomeCtrl});
    $routeProvider.when('/contact', {templateUrl: '/partials/contact', controller: ContactCtrl});
    $routeProvider.when('/portfolio', {templateUrl: '/partials/portfolio', controller: ContactCtrl});
    $routeProvider.when('/portfolio/:item', {templateUrl: '/partials/portfolio-item', controller: PortfolioItemCtrl});
    // $routeProvider.when('/login', {templateUrl: 'partials/login', controller: LoginCtrl});
    $routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }]);