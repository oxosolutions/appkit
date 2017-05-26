(function(){

	'use strict'
	
	angular.module('page',[])
		.directive('dynamic', function ($compile) {
		  return {
		    restrict: 'A',
		    replace: true,
		    link: function (scope, ele, attrs) {
		      scope.$watch(attrs.dynamic, function(html) {
		        ele.html(html);
		        $compile(ele.contents())(scope);
		      });
		    }
		  };
		})
		.controller('PageCtrl',PageCtrl);

		function PageCtrl($scope,$state,$ionicHistory, api, $compile, localStorageService, $ionicLoading, $ionicPopup){
			
			if(localStorageService.get('appKit') == null){
		    	$ionicLoading.show({
			        template: '<ion-spinner icon="android"></ion-spinner>',
			        noBackdrop: false
			    });
		        api.pages.getPagesList().then(function(res){
		            $scope.pages = res.data.data.app_pages;
		            angular.forEach(res.data.data.app_pages, function(page, mediaKey){
		            	$ionicLoading.hide();
		                var images = [];
		                if($(page['content']).find('img') != undefined){
		                    $(page['content']).find('img').each(function(){
		                        if(jQuery.inArray($(this).attr('src'), images) == -1){
		                            images.push($(this).attr('src'));
		                        }
		                    });
		                }
		                try{
		                    angular.forEach(images, function(mediaLink,key){
		                        var fileSplited = mediaLink.split('/');
		                        var fileLength = fileSplited.length;
		                        var fileName = fileSplited[fileLength-1];
		                        var downloadUrl = mediaLink;
		                        var relativeFilePath = fileName;
		                          window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
		                              fileSystem.root.getDirectory(res.data.data.app_directory, {create: true, exclusive: true});
		                              var fileTransfer = new FileTransfer();
		                              fileTransfer.download(
		                                  downloadUrl,

		                              // The correct path!
		                              fileSystem.root.toURL() + res.data.data.app_directory+'/' + relativeFilePath,

		                                  function (entry) {
		                                      console.log('Download done '+ relativeFilePath);
		                                  },
		                                  function (error) {
		                                      alert("Error during download. Code = " + error.code);
		                                  }
		                              );
		                          });
		                    });
		                }catch(e){

		                }
		                
		            });
		            localStorageService.set('appKit',res);
		            var content = $.grep(res.data.data.app_pages, function(key, val){
				    	return key.slug == $state.params.page_slug;
				    });
				    $scope.appName = res.data.data.app_name;
				    $scope.html = content[0].content;
				    $scope.footer = res.data.data.app_footer_content;
					$ionicHistory.clearHistory();
					$ionicHistory.nextViewOptions({
				      disableAnimate: false,
				      disableBack: true
				    });
		        });
		    }else{
		        var appKitData = localStorageService.get('appKit');
		        $scope.pages = appKitData.data.data.app_pages;
		        var content = $.grep(appKitData.data.data.app_pages, function(key, val){
			    	return key.slug == $state.params.page_slug;
			    });
			    $scope.appName = appKitData.data.data.app_name;
			    $scope.html = content[0].content;
			    setTimeout(function(){
			    	$('img').each(function(key){
				    	var liveImage = $(this).attr('src');
				    	var fileSplited = liveImage.split('/');
                        var fileLength = fileSplited.length;
                        var fileName = fileSplited[fileLength-1];
                        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
                            fileSystem.root.toURL() + res.data.data.app_directory+'/' + fileName;
                        });
				    });
			    },2000);
			    $scope.footer = appKitData.data.data.app_footer_content;
				$ionicHistory.clearHistory();
				$ionicHistory.nextViewOptions({
			      disableAnimate: false,
			      disableBack: true
			    });
		    }


		    $scope.refresh = function(){
		    	/*localStorageService.set('appKit',null);
		    	$state.go($state.current,{},{reload:true});*/
		    	if(window.Connection) {
			      	if(navigator.connection.type == Connection.NONE) {
			        	$ionicPopup.confirm({
			          		title: 'No Internet Connection',
			          		content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
			        	}).then(function(result) {
			          		
			        	});
			      	}else{
			      		localStorageService.set('appKit',null);
		    			$state.go($state.current,{},{reload:true});
			      	}
			    }
		    }
		}
})();