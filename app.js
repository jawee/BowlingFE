angular.module('bowlingApp', [])
	.controller('BowlingController', function($scope, $http) {
		var bowling = this;
		bowling.frames = [];
		bowling.score = 0;
		bowling.frameCount = 0;
		
		//public methods
		bowling.addFrame = function() {
			bowling.frameCount++;
			if(bowling.third != "" && bowling.third != null) {
				bowling.frames.push({"first": parseInt(bowling.first), "second": parseInt(bowling.second), "third": parseInt(bowling.third) });	
			} else {
				bowling.frames.push({"first": parseInt(bowling.first), "second": parseInt(bowling.second) });	
			}
			
			bowling._clearFields();

			bowling._sendFramesToServer();
		};

		//private methods 
		bowling._clearFields = function() {
			bowling.first = "";
			bowling.second = "";
			bowling.third = "";
		};

		bowling._sendFramesToServer = function() {
			var jsonString = angular.toJson({"frames": bowling.frames});
			console.log(jsonString);
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
  					console.log(data);
    				bowling.score = data.score;
 				 }).
  				error(function(data, status, headers, config) {
   					console.error(data)
  				});
		}

		
	});


