(($) ->
  $.fn.youtubepler = (opts) ->
    parseYouTubeUrl = (url) ->
      video_id = url.split('v=')[1]
      ampPos   = video_id.indexOf '&'
      if ampPos != -1
        video_id = video_id.substring 0, ampPos
      video_id

    player_container = $(opts.player)
    @width = opts.width or 640
    @height = opts.height or 390
    @player = null

    # get video ids
    video_ids = []
    links = this.find 'a'
    for link in links
      href = link.href
      continue unless href.indexOf 'youtube' > -1   # skip if link isn't youtube
      video_ids.push( parseYouTubeUrl( href ) )     # store youtube id in array
      
      # link click listener
      $(link).on 'click', (event) =>
        event.preventDefault()
        event.stopPropagation()
        links.removeClass 'active'
        $(this).addClass 'active'
        index = @player.getPlaylist().indexOf(parseYouTubeUrl(event.target.href))
        @player.playVideoAt index

    # create player
    player_container.append $("<script src='https://www.youtube.com/iframe_api'>")
    window.onYouTubeIframeAPIReady = () =>
      @player = new YT.Player 'player',
        height: @height
        width: @width
        events:
          'onReady': onPlayerReady
    
    onPlayerReady = (event) =>
      event.target.cuePlaylist video_ids

    return this
)(jQuery)
