(function(){
	'use strict'

	angular.module('pages',[
					'home',
					'about',
					'gallery',
					'contact_us'
	]).config(config);

	function config($stateProvider,$urlRouterProvider){
		$stateProvider
		.state('page', {
		    url: '/page',
		    abstract: true,
		    templateUrl: 'templates/menu.html',
		    controller: 'AppCtrl'
		 })
		.state('page.home', {
		    url: '/home',
		    views: {
		      'menuContent': {
		        templateUrl: 'templates/home.html',
		        controller: 'HomeCtrl'
		      }
		    }
		})
		.state('page.gallery', {
		    url: '/gallery',
		    views: {
		      'menuContent': {
		        templateUrl: 'templates/gallery.html',
		        controller: 'GalleryCtrl'
		      }
		    }
		})
		.state('page.contact_us', {
		    url: '/contact_us',
		    views: {
		      'menuContent': {
		        templateUrl: 'templates/contact_us.html',
		        controller: 'ContactUsCtrl'
		      }
		    }
		})
		.state('page.about', {
		    url: '/about',
		    views: {
		      'menuContent': {
		        templateUrl: 'templates/about.html',
		        controller: 'AboutCtrl'
		      }
		    }
		});

		$urlRouterProvider.otherwise('/page/home');
	}
})();