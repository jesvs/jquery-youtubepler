(function() {
  (function($) {
    window.youtubeplerPlayers = [];
    $.fn.youtubepler = function(opts) {
      var createPlayer, href, link, links, onPlayerReady, parseYouTubeUrl, player_container, video_ids, _i, _len;
      parseYouTubeUrl = function(url) {
        var ampPos, video_id;
        video_id = url.split('v=')[1];
        ampPos = video_id.indexOf('&');
        if (ampPos !== -1) {
          video_id = video_id.substring(0, ampPos);
        }
        return video_id;
      };
      player_container = $(opts.player);
      this.player_id = opts.player.replace('#', '');
      this.width = opts.width || 640;
      this.height = opts.height || 390;
      this.player = null;
      video_ids = [];
      links = this.find('a');
      for (_i = 0, _len = links.length; _i < _len; _i++) {
        link = links[_i];
        href = link.href;
        if (!href.indexOf('youtube' > -1)) {
          continue;
        }
        video_ids.push(parseYouTubeUrl(href));
        $(link).on('click', (function(_this) {
          return function(event) {
            var index;
            event.preventDefault();
            event.stopPropagation();
            links.removeClass('active');
            $(_this).addClass('active');
            index = _this.player.getPlaylist().indexOf(parseYouTubeUrl(event.target.href));
            return _this.player.playVideoAt(index);
          };
        })(this));
      }
      createPlayer = (function(_this) {
        return function() {
          return _this.player = new YT.Player(_this.player_id, {
            height: _this.height,
            width: _this.width,
            events: {
              'onReady': onPlayerReady
            }
          });
        };
      })(this);
      window.youtubeplerPlayers.push(createPlayer);
      onPlayerReady = (function(_this) {
        return function(event) {
          return event.target.cuePlaylist(video_ids);
        };
      })(this);
      return this;
    };
    if ($("script[src='https://www.youtube.com/iframe_api']").length === 0) {
      $('script:first').before("<script src='https://www.youtube.com/iframe_api'>");
    }
    return window.onYouTubeIframeAPIReady = function() {
      var createPlayer, _i, _len, _ref, _results;
      console.log("Create the players now");
      _ref = window.youtubeplerPlayers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        createPlayer = _ref[_i];
        _results.push(createPlayer());
      }
      return _results;
    };
  })(jQuery);

}).call(this);
