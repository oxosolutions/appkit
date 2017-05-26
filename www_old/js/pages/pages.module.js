(function(){
	'use strict'

	angular.module('pages',[
					'page'
	]).config(config);

	function config($stateProvider,$urlRouterProvider){
		
		$stateProvider
		.state('pages', {
		    url: '/pages',
		    abstract: true,
		    templateUrl: 'templates/menu.html',
		    controller: 'PageCtrl'
		 })
		.state('pages.page', {
		    url: '/page/{page_slug}',
		    cache: false,
		    views: {
		      'menuContent': {
		        templateUrl: 'templates/page.html',
		        controller: 'PageCtrl'
		      }
		    }
		});

		$urlRouterProvider.otherwise('/pages/page/home');
	}
})();