angular.module('bowlingApp', [])
	.controller('BowlingController', function($scope, $http) {
		var bowling = this;
		bowling.frames = [];
		bowling.score = 0;
		console.log(angular.toJson(bowling.frames));

		bowling.addFrame = function() {
			bowling.frames.push({"first": parseInt(bowling.first), "second": parseInt(bowling.second) });

			var jsonString = angular.toJson({"frames": bowling.frames});

			$http({
				url: 'http://192.168.1.90:49213/api/bowling',
				dataType: 'json',
				method: 'POST',
				data: jsonString,
				headers: {
					"Content-Type": "application/json"
					}
				}).
  				success(function(data, status, headers, config) {
    				bowling.score = data;
 				 }).
  				error(function(data, status, headers, config) {
   					console.error(data)
  				});
		};
	});


