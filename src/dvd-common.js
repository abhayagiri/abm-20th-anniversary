const assetStamp = '1477087465'

const template = `
  <header id="intro-carousel" class="carousel slide">
    <div class="carousel-inner">
      <div class="item active">
        <div class="fill" style="background-image:url('Web/img/large/2007-2016/09%20Nature/4%20Forest%20Path.jpg');"></div>
          <div class="carousel-caption">
            <h1 class="">
              20th Anniversary Compilation</h1>
            <p class="intro-text ">
              A collection of Dhamma talks and photos from 1996-2016.
            </p>
            <p class="hidden-until-load">Scroll down...</p>
          </div>
        <div class="overlay-detail"></div>
      </div>
    </div>
    <div class="mouse hidden-until-load"></div>
  </header>
`

document.body.id = 'top'
document.body.className = 'loading'
document.body.innerHTML = template

requireCss(`${webUrl}css/combined.css?${assetStamp}`, () => {
  requireCss('https://fonts.googleapis.com/css?family=Raleway:100,600', () => {
    requireCss('https://fonts.googleapis.com/css?family=Open+Sans:300', () => {
      // TODO Detect IE < 9?
      // requireJs('https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js')
      // requireJs('https://oss.maxcdn.com/respond/1.4.2/respond.min.js')
      requireJs(`${webUrl}js/combined.js?${assetStamp}`)
    })
  })
})
