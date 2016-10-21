const audioPlayerTemplate = `<div id="jquery-jplayer" class="jp-jplayer"></div>`

const audioPlayerContainerTemplate = `
  <div id="jquery-jplayer-container" class="jp-audio" role="application" aria-label="media player" style="display: none">
    <div class="jp-type-single">
      <div class="jp-gui jp-interface">
        <div class="jp-controls">
          <button class="jp-play" role="button" tabindex="0">play</button>
          <button class="jp-stop" role="button" tabindex="0">stop</button>
        </div>
        <div class="jp-progress">
          <div class="jp-seek-bar">
            <div class="jp-play-bar"></div>
          </div>
        </div>
        <div class="jp-volume-controls">
          <button class="jp-mute" role="button" tabindex="0">mute</button>
          <button class="jp-volume-max" role="button" tabindex="0">max volume</button>
          <div class="jp-volume-bar">
            <div class="jp-volume-bar-value"></div>
          </div>
        </div>
        <div class="jp-time-holder">
          <div class="jp-current-time" role="timer" aria-label="time">&nbsp;</div>
          <div class="jp-duration" role="timer" aria-label="duration">&nbsp;</div>
          <div class="jp-toggles">
            <button class="jp-repeat" role="button" tabindex="0">repeat</button>
          </div>
        </div>
      </div>
      <div class="jp-details">
        <div class="jp-title" aria-label="title">&nbsp;</div>
      </div>
      <div class="jp-no-solution">
        <span>Update Required</span>
        To play the media you will need to either update your browser to a recent version or update your <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>.
      </div>
    </div>
  </div>
`

const audioPlayer = $(
  $.templates(audioPlayerTemplate).render()
)

const audioPlayerContainer = $(
  $.templates(audioPlayerContainerTemplate).render()
)

function playAudio(url, title, time) {
  // console.log([url, title, time])
  audioPlayerContainer.fadeIn()
  audioPlayer.jPlayer("setMedia", {
    title: title,
    mp3: url
  })
  audioPlayer.jPlayer("play", time || 0)
}

$(() => {

  $(document.body).append(audioPlayer)
  $(document.body).append(audioPlayerContainer)

  audioPlayer.jPlayer({
    swfPath: basePrefix() + "vendor/jPlayer/dist/jplayer",
    supplied: "mp3",
    solution: "html, flash",
    wmode: "window",
    errorAlerts: true,
    cssSelectorAncestor: "#jquery-jplayer-container",
    useStateClassSkin: true,
    autoBlur: false,
    smoothPlayBar: true,
    keyEnabled: false,
    remainingDuration: true,
    toggleDuration: true
  })

  audioPlayer.bind($.jPlayer.event.pause, function(event) {
    if (event.jPlayer.status.currentTime == 0) {
      audioPlayerContainer.fadeOut()
    }
  })

  audioPlayer.bind($.jPlayer.event.ended, function(event) {
    audioPlayerContainer.fadeOut()
  })

})
