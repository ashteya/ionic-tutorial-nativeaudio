If you want to play sound effects in your Ionic app, you have the choice between using HTML5 Audio, Web Audio API or Cordova plugins.

In this tutorial we'll have a look at how to use the [Cordova Native Audio](https://github.com/floatinghotpot/cordova-plugin-nativeaudio) plugin to play sound effects and after that I'll explain why you should use Native Audio over HTML5 Audio/Web Audio API.<cut />

####The [source code](https://github.com/ashteya/ionic-tutorial-nativeaudio) can be found on GitHub.
<br />

###Installation

Let's start by adding the Native Audio plugin to our Ionic project. 
```language-markup
$ cordova plugin add cordova-plugin-nativeaudio
```

The Native Audio plugin is supported by [ngCordova](http://www.ngcordova.com), so let's install that.
```language-markup
$ bower install ngCordova --save-dev
```

In **index.html** we need to reference the ngCordova JavaScript file, **after** the Ionic bundle and **before** the Cordova script.
```language-markup
<script src="lib/ionic/js/ionic.bundle.js"></script>
<script src="lib/ngCordova/dist/ng-cordova.js"></script>
<script src="cordova.js"></script>
```

In **app.js** we'll add `ngCordova` as a dependency to our app module.
```language-javascript
angular.module('starter', ['ionic', 'ngCordova'])
```

###Let's play some sound!
In **index.html** we'll add 2 buttons for playing sounds, one for playing a sound 1 time and the other will keep looping a sound:
```language-markup
<body ng-app="starter">
	<ion-pane>
	  <ion-header-bar>
	    <h1 class="title">Native Audio</h1>
	  </ion-header-bar>
	  <ion-content ng-controller="SoundController as vm">
	    <button ng-click="vm.playGlissful()" class="button">Play Glissful (Loop)</button>
	    <button ng-click="vm.playBingBong()" class="button">Play Bing Bong (1x)</button>
	  </ion-content>
	</ion-pane>
</body>
```

In our `SoundController` we'll load the audio files and add the methods to play the different sounds:
```language-javascript
angular.module('starter').controller('SoundController', ['$ionicPlatform', '$timeout',  '$cordovaNativeAudio', SoundController]);

function SoundController($ionicPlatform, $timeout, $cordovaNativeAudio) {
	var vm = this;
	
	$ionicPlatform.ready(function() {
		$cordovaNativeAudio.preloadSimple('bingbong', 'audio/bingbong.mp3');
		$cordovaNativeAudio.preloadComplex('glissful', 'audio/glissful.mp3', 1, 1);
	});
	
	vm.playGlissful =  function() {
		$cordovaNativeAudio.loop('glissful');
		
		$timeout(function() {
			$cordovaNativeAudio.stop('glissful');
		}, 5000);	
	};
	
	vm.playBingBong = function() {
		$cordovaNativeAudio.play('bingbong');
	};
	
	return vm;
}
```

> Note: All calls to $cordovaNativeAudio return promises, so you should check if errors have occurred on all calls. I've left them out of the example above to keep it easy to follow, but check the [source code](https://github.com/ashteya/ionic-tutorial-nativeaudio) for a complete example.

Don't forget to add the audio files in the **audio** directory and reference `SoundController` in **index.html**.

Now, if you run the app on an Android or iOS device you should hear the sounds playing as expected.

####The [source code](https://github.com/ashteya/ionic-tutorial-nativeaudio) can be found on GitHub.
<br />

So, now we know how to play sounds with the Native Audio plugin, keep reading if you want to know why you shouldn't use HTML5 Audio.

###What is the difference between HTML5 Audio and Web Audio API?
You can use HTML5 Audio for simple playback of sounds. HTML5 Audio is [supported](http://caniuse.com/audio) by all browsers.

The [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) gives you more control over the playback of audio. 

> The Web Audio API provides a powerful and versatile system for controlling audio on the Web, allowing developers to choose audio sources, add effects to audio, create audio visualizations, apply spatial effects (such as panning) and much more. 

Web Audio API is still in Working Draft, but is [supported](http://caniuse.com/audio-api) by the latest versions of most browsers.

###Problems with HTML5 Audio
So in the case of playing our simple sound effects we should be able to just use HTML5 Audio. 

I tried using it and it seemed to work fine on iOS, but there was no sound on Android (tested on 4.4). I had to add Crosswalk, instead of the default WebView on Android, to hear the sound.

I also tried looping the sound and that gave a very inconsistent playback whereas with the Native Audio plugin it always played the sound exactly how I expected it to play.

Another annoying thing was that if I was playing music in the background from another app and my app would play the sound effect with HTML5 audio, it would completely stop the background music.

So, HTML5 Audio is definitely [not recommended](http://forum.ionicframework.com/t/how-to-play-local-audio-files) for Ionic apps.

###What about Web Audio API?
To be honest, after I tried HTML5 Audio, I wasn't very hopeful Web Audio API would give better results, so I didn't even try it. If you'd prefer to use that instead of a Cordova plugin, [here is a great tutorial](https://www.airpair.com/ionic-framework/posts/using-web-audio-api-for-precision-audio-in-ionic) for it.


