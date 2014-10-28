# jquery.youtubepler

Create a YouTube player with a playlist from a list of links.

## Installation

Include script *after* the jQuery library:

```
<div id="player"></div>
<ul id="youtube_links">
  <li>
    <a href="http://www.youtube.com/watch?v=qItugh-fFgg">
      All Your Base Are Belong To Us
    </a>
    <a href="http://www.youtube.com/watch?v=dMH0bHeiRNg">
      Evolution of Dance
    </a>
  </li>
</ul>
<script src="/path-to-your-js/jquery.youtubepler.js"></script>
```

## Usage

The *player* option is required.

```
$(document).ready(function() {

  $('#youtube_links').youtubepler({
    player: '#player'
  });

});
```

## Configuration

The player's dimension can be configured:

* width (default 640px)
* height (default 390px)

```
  $('#youtube_links').youtubepler({
    player: '#player',
    width: 640,
    height: 390
  });
```

## Author

[Jesús Sánchez](www.jesvs.com)
