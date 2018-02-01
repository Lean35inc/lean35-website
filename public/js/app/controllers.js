'use strict';

/* Controllers */

function AppCtrl($scope, $location) {

    $scope.hasTransparentClass = function(path){
      if ($location.path() == path) {
        return "transparent"
      } else {
        return ""
      }
    }

    $scope.hasActiveClass = function(path) {
      if ($location.path() == path) {
        return "active"
      } else {
        return ""
      }
    }

}

function PortfolioItemCtrl($scope, $http, $routeParams, $timeout) {
  var portfolioItems = {
    myneighborworks: {
      BigClass: 'monitor',
      Title: 'NeighborWorks America',
      ImagesUrls: ['/img/myn-monitor.png', '/img/myn2-monitor.png', '/img/myn3-monitor.png'],
      ThumbsUrls: ['/img/myn-thumb.png', '/img/myn2-thumb.png', '/img/myn3-thumb.png'],
      FullName: 'My Neighborworks Learning', 
      Description: "This is the learners' portal"+ 
                    "for NeighborWorks America Inc. People from thousands of outside organizations use this"+ 
                    "system to register for courses and events even including traveling and lodging. "+
                    "They can keep track of their course history and certifications as well."
    },
    mbac: {
      BigClass: 'monitor',
      Title: 'MBAC',
      ImagesUrls: ['/img/mbac-monitor.png', '/img/mbac2-monitor.png', '/img/mbac3-monitor.png'],
      ThumbsUrls: ['/img/mbac-thumb.png', '/img/mbac2-thumb.png', '/img/mbac3-thumb.png'],
      FullName: 'Medical Billing Analysis Web Solution', 
      Description: "This system converts existing medical billing software data such as demographic and transaction data and not only"+ 
                    "generates various reports but also allows doctors to schedule appointments remotely and auto generate encounter forms."
    },
    leap: {
      BigClass: 'monitor',
      Title: 'LEAP',
      ImagesUrls: ['/img/leap-monitor.png', '/img/leap2-monitor.png', '/img/leap3-monitor.png', '/img/leap4-monitor.png'],
      ThumbsUrls: ['/img/leap-thumb.png', '/img/leap2-thumb.png', '/img/leap3-thumb.png', '/img/leap4-thumb.png'],
      FullName: 'Learning Event Adminstration Platform (LEAP) ', 
      Description: "LEAP is a core administrative tool for neighborworks america. It is a complex intranet website with a sophiscated "+ 
                    "database backend. Many neighborworks staff use this tool on a daily basis to create events, setup courses, maintain"+ 
                    "the lists of faculty, staff and students, as well as manage event hosting venues."
    },
    wellsfargo: {
      BigClass: 'monitor',
      Title: 'Wells Fargo',
      ImagesUrls: ['/img/wf-monitor.png', '/img/wf-monitor-2.png', '/img/wf-monitor-3.png'],
      ThumbsUrls: ['/img/wf-thumb.png', '/img/wf-thumb-2.png', '/img/wf-thumb-3.png'],
      FullName: 'Wells Fargo', 
      Description: ""
    },
    captioexpenses: {
      BigClass: 'iphone',
      Title: 'Captio Expenses',
      ImagesUrls: ['/img/capexp-iphone.png', '/img/capexp2-iphone.png', '/img/capexp3-iphone.png'],
      ThumbsUrls: ['/img/capexp-thumb.png', '/img/capexp2-thumb.png', '/img/capexp3-thumb.png'],
      FullName: 'Captio Expenses', 
      Description: "This Android application helps ordinary people manage their expenses as they go about their daily lives. It captures"+ 
                    "expense information from photos of receipts, assists in organizing the information and provides convenient reporting "+ 
                    "capabilities."
    },
    'fox-whistle' : {
      BigClass: 'iphone',
      Title: 'Fox Whistle',
      ImagesUrls: ['/img/fox-iphone.png', '/img/fox2-iphone.png'],
      ThumbsUrls: ['/img/fox-thumb.png', '/img/fox2-thumb.png'],
      FullName: 'Fox Whistle', 
      Description: "Fox Whistle for IPhone is a reminder application. There are so many reminder applications on the market, but none"+ 
                    "can beat this app for its simplicity and ease of use."
    },
    'lean-startup-machine': {
      Title: 'Lean Startup Machine',
      Src: '//fast.wistia.net/embed/iframe/hirrkbolkh'
    },
    'chart-path':{
      Title: 'ChartPath',
      Src: '//fast.wistia.net/embed/iframe/68hjxju8p7'
    },
    'nissan':{
      Title: 'Nissan LEAF on Raceday',
      Src: 'http://fast.wistia.net/embed/iframe/2edlfmb7cn'
    },
    'shoeboxed':{
      Title: 'Shoeboxed.com',
      Src: 'http://fast.wistia.net/embed/iframe/3noyx6wbq5'
    }, 
    'tennessee':{
      Title: '2349 Tennessee',
      Src: 'http://fast.wistia.net/embed/iframe/re72jz31wy'
    }
  };

  var item = $routeParams.item;

  if (item === 'lean-startup-machine' || item === 'chart-path' || item === 'nissan' || item === 'shoeboxed' || item === 'tennessee') {
    $scope.IsNotVideo = false;
  } else {
    $scope.IsNotVideo = true;
  }

  $scope.PortfolioItem = portfolioItems[item];

  $timeout(function(){
    $(window).scroll(function() {
                if ($(".navbar").offset().top>30) {
                    $(".navbar-inner").addClass("sticky");
                }
                else {
                    $(".navbar-inner").removeClass("sticky");
                }
            });

            // Flex
            if ($(".flexslider").length) {
                $('.flexslider').flexslider();
            }

            servicesCircle.initialize();

            staticHeader.initialize();

            portfolioItem.initialize();
          })
  
}

PortfolioItemCtrl.$inject = ['$scope', '$http', '$routeParams', '$timeout'];

function HomeCtrl($scope, $http) {
   $scope.submit = function() {
    var data = $scope.ticket;
    
    if (data)
    {
      $http.post('/api/ticket/', data);
      // refresh form
      $scope.ticket = null;
      // show modal
      $('#myModal').modal({show: true});
    }
  };
}

HomeCtrl.$inject = ['$scope', '$http'];

function ContactCtrl($scope, $http) {
   $scope.submit = function() {
    var data = $scope.ticket;

    if (data)
    {
      $http.post('/api/ticket/', data);
      // refresh form
      $scope.ticket = null;
      // show modal
      $('#myModal').modal({show: true});
    }
  };
}

ContactCtrl.$inject = ['$scope', '$http'];


function AboutCtrl($scope, $http) {
	 $http({method: 'GET', url: '/api/article/about'}).success(function(data, status, headers, config) 
    {
      $scope.article = data;
    });
}

function LoginCtrl($scope, $http) {

}

AboutCtrl.$inject = ['$scope', '$http'];
