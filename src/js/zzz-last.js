$('body').ready(() => {
  function appendSection(id) {
    let body = $('body')
    body.append(_sections[id])
  }

  appendSection('navbar')
  appendSection('about')
  appendSection('dhamma-talks')
  appendSection('photos')
  appendSection('books')
  appendSection('ajahn-chah-weekend')
  appendSection('fearless-mountain')
  appendSection('anniversary')
  appendSection('download')

  $('.audio-title .listen').on('click', (event) => {
    event.preventDefault()
    const audioEl = $(event.currentTarget)
    const audioUrl = audioEl.attr('href')
    const audioTitle = audioEl.attr('title')
    playAudio(audioUrl, audioTitle)
  })

  $('body').removeClass('loading').addClass('loaded')
  const location = window.location.hash
  if (location) {
    $('html').scrollTop($(location).offset().top)
  } else {
    $('html').scrollTop(0)
  }

})
