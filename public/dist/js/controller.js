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
			controller: 'hirenX'
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

Hiren.controller('hirenX' , function($scope ,$http , $location){
    $http.post('new')
});

Hiren.controller('hirenxxz' , function($scope , $http , $location , $routeParams){

	$http.post( (rootURL + 'artistname') , {'alpha' : $routeParams.alpha }).success(function(data){
		$scope.message = data;
		});
	$scope.click = function(value){
		$location.path("/artist/" + $routeParams.alpha + "/" + encodeURI(value) + "/");
	}
});

