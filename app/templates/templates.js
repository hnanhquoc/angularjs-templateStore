angular.module('templateStore.templates', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/templates', {
		templateUrl: 'templates/templates.html',
		controller: 'TemplatesCtrl'
	})
	.when('/templates/:templateID', {
		templateUrl: 'templates/template-details.html',
		controller: 'TemplateDetailsCtrl'
	})
	
}])

.controller('TemplatesCtrl', ['$scope', '$http', function($scope, $http){
	$http.get('json/templates.json').success(function(response){
		$scope.templates = response;
	});
}])

.controller('TemplateDetailsCtrl', ['$scope', '$routeParams', '$http', '$filter', function($scope, $routeParams, $http, $filter){
	var templateID = $routeParams.templateID;
	$http.get('json/templates.json').success(function(response){
		$scope.template = $filter('filter')(response, function(d){
			return d.id == templateID;
		})[0];
		$scope.mainImage = $scope.template.images[0].name;
	});
}])