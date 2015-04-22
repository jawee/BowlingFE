angular.module('bowlingApp', [])
	.controller('BowlingController', function($scope, $http) {
		var bowling = this;
		bowling.frames = [];
		bowling.score = 0;
		bowling.frameCount = 0;

		bowling.clearFields = function() {
			bowling.first = "";
			bowling.second = "";
			bowling.third = "";
		};

		bowling.sendFramesToServer = function() {
			var jsonString = angular.toJson({"frames": bowling.frames});
			$http({
				url: 'http://localhost:49213/bowling',
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
		}

		bowling.addFrame = function() {
			bowling.frameCount++;
			if(bowling.third != "") {
				bowling.frames.push({"first": parseInt(bowling.first), "second": parseInt(bowling.second), "third": parseInt(bowling.third) });	
			} else {
				bowling.frames.push({"first": parseInt(bowling.first), "second": parseInt(bowling.second) });	
			}
			
			bowling.clearFields();

			bowling.sendFramesToServer();
		};
	});


