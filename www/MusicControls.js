var musicControls = {
  updateCallback: function () {},

  create: function (data, successCallback, errorCallback) {
    data.artist = !isUndefined(data.artist) ? data.artist : '';
    data.track = !isUndefined(data.track) ? data.track : '';
    data.album = !isUndefined(data.album) ? data.album : '';
    data.cover = !isUndefined(data.cover) ? data.cover : '';
    data.ticker = !isUndefined(data.ticker) ? data.ticker : '';
    data.duration = !isUndefined(data.duration) ? data.duration : 0;
    data.elapsed = !isUndefined(data.elapsed) ? data.elapsed : 0;
    data.isPlaying = !isUndefined(data.isPlaying) ? data.isPlaying : true;
    data.hasPrev = !isUndefined(data.hasPrev) ? data.hasPrev : true;
    data.hasNext = !isUndefined(data.hasNext) ? data.hasNext : true;
    data.hasSkipForward = !isUndefined(data.hasSkipForward) ? data.hasSkipForward : false;
    data.hasSkipBackward = !isUndefined(data.hasSkipBackward) ? data.hasSkipBackward : false;
    data.skipForwardInterval = !isUndefined(data.skipForwardInterval) ? data.skipForwardInterval : 0;
    data.skipBackwardInterval = !isUndefined(data.skipBackwardInterval) ? data.skipBackwardInterval : 0;
    data.hasClose = !isUndefined(data.hasClose) ? data.hasClose : false;
    data.dismissable = !isUndefined(data.dismissable) ? data.dismissable : false;

    cordova.exec(successCallback, errorCallback, 'MusicControls', 'create', [data]);
  },

  updateIsPlaying: function (isPlaying, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, 'MusicControls', 'updateIsPlaying', [{isPlaying: isPlaying}]);
  },
  updateElapsed: function (args, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, 'MusicControls', 'updateElapsed', [{
      elapsed: args.elapsed,
      isPlaying: (args.isPlaying === undefined) ? '' : !!args.isPlaying
    }]);
  },
  updateDismissable: function (dismissable, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, 'MusicControls', 'updateDismissable', [{dismissable: dismissable}]);
  },

  destroy: function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, 'MusicControls', 'destroy', []);
  },

  // Register callback
  subscribe: function (onUpdate) {
    musicControls.updateCallback = onUpdate;
  },
  // Start listening for events
  listen: function () {
    console.log('MS.JS.listen');
    cordova.exec(musicControls.receiveCallbackFromNative, function (res) {
      console.log('listen.res', res);
    }, 'MusicControls', 'watch', []);
  },
  receiveCallbackFromNative: function (messageFromNative) {
    console.log('MS.JS.rcbfn.0', messageFromNative);
    console.log('MS.JS.rcbfn.0-1', musicControls.updateCallback);
    musicControls.updateCallback(messageFromNative);
    console.log('MS.JS.rcbfn.1', messageFromNative);
    cordova.exec(musicControls.receiveCallbackFromNative, function (res) {
      console.log('rcbfn.res', res);
    }, 'MusicControls', 'watch', []);
  }

};

function isUndefined(val) {
  return val === undefined;
}

module.exports = musicControls;
