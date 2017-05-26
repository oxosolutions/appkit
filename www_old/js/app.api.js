(function(){
	'use strict'

	angular
		.module('appService',[])
		.factory('api',apiServices);

		function apiServices($http, localStorageService){

			var api = {};

			api.baseUrl = 'http://makemyfolio.com/api/android/';

			api.pages = {
	            getPagesList: function(){
	            	return $http({
			            	method: 'GET',
			            	url: api.baseUrl+'?app_id=11&app_secret=sqEPgLq79sRTtZ9GZRPUbuNK'
			            })
	            }
	        };
			return api;
		}
})();