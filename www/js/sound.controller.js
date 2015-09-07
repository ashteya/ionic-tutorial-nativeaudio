(function() {
	angular.module('starter').controller('SoundController', ['$ionicPlatform', '$timeout',  '$cordovaNativeAudio', SoundController]);
	
	function SoundController($ionicPlatform, $timeout, $cordovaNativeAudio) {
		var vm = this;
		
		$ionicPlatform.ready(function() {
			$cordovaNativeAudio.preloadSimple('snare', 'audio/snare.mp3')
					   .then(function(msg) { console.log(msg); })
					   .catch(function(error) { console.error(error); });
							   
			$cordovaNativeAudio.preloadSimple('hi-hat', 'audio/highhat.mp3')
					   .then(function(msg) { console.log(msg); })
					   .catch(function(error) { console.error(error); });
							   
			$cordovaNativeAudio.preloadSimple('bass', 'audio/bass.mp3')
					   .then(function(msg) { console.log(msg); })
					   .catch(function(error) { console.error(error); });
							   
			$cordovaNativeAudio.preloadSimple('bongo', 'audio/bongo.mp3')
					   .then(function(msg) { console.log(msg); })
					   .catch(function(error) { console.error(error); });
		});
		
		vm.play = function(sound) {
			$cordovaNativeAudio.play(sound)
					   .then(function(msg) { console.log(msg); })
					   .catch(function(error) { console.error(error); });
		};
		
		return vm;
	}
})();

