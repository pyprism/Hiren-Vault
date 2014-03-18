//Horrible code~  :O  ~
var hiren = angular.module('Hiren',['ngRoute']);

hiren.config(
	function($routeProvider){
		$routeProvider
		.when("/" ,{
			templateUrl:'partials/home.html'
			//controller: 'hirenx'
		})
		.when("/new" ,{
			templateUrl:'partials/Save-New-Data.html',
			controller: 'hirenw'
		})
		.when('/search' ,{
			templateUrl: 'partials/search.html' ,
			controller : 'hirenx'
		//})
		//.otherwise({
		//	redirectTo: '/'
		});
		//$locationProvider.html5Mode(true);
	});



var rootURL = "http://localhost/";

hiren.controller('hirenw' , function($scope ,$http , $location){
 	$http.get( rootURL + 'alpha').success(function(data){
		$scope.message = data ;
	});
	$scope.click = function(value){
			$location.path("/artist/" + value + "/");
	}
});

hiren.controller('hirenx' , function($scope , $http , $location , $routeParams){

	$http.post( (rootURL + 'artistname') , {'alpha' : $routeParams.alpha }).success(function(data){
		$scope.message = data;
		});
	$scope.click = function(value){
		$location.path("/artist/" + $routeParams.alpha + "/" + encodeURI(value) + "/");
	}
});

