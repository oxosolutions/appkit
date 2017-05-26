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
			            	url: api.baseUrl+'?app_id='+getParameterByName('app_id')+'&app_secret='+getParameterByName('app_secret')
			            })
	            }
	        };
			return api;
		}
})();