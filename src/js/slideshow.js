const slideshowTemplate = `
  <div id="slide-show-container" style="display: none">
    <div class="slide-show">
      {{for slides}}
        <div class="slide-container">
          <div class="slide {{>type}} {{>extraClass}}">
            {{if path}}
              <img data-lazy="{{url:path}}">
            {{else}}
              <img src="img/handtinytrans.gif">
            {{/if}}
            {{if caption}}
              <div class="caption">{{:caption}}</div>
            {{/if}}
          </div>
        </div>
      {{/for}}
    </div>
  </div>
`

let slideshow = null
let slideshowContainer = null

function setupSlideshow() {

  if (slideshow) {
    return
  }

  let slidesData = []
  let manifests = photosManifest["1996-2006"].concat(photosManifest["2007-2016"])

  manifests.forEach(data => {

    if (data.beforeCover) {
      slidesData.push({
        type: 'cover',
        path: null,
        caption: data.beforeCover
      })
    }
    let type
    if (data.caption) {
      type = 'image-with-caption'
    } else {
      type = 'image'
    }
    slidesData.push({
      type: type,
      path: dvdPrefix() + 'Web/img/large/' + data.file,
      caption: data.caption,
      extraClass: data.extraClass
    })

  })

  slideshowContainer = $(
    $.templates(slideshowTemplate).render({ slides: slidesData })
  )
  $(document.body).append(slideshowContainer)

  slideshow = slideshowContainer.find('.slide-show').slick({
    lazyLoad: 'ondemand',
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    arrows: false,
    dots: false,
    draggable: false,
    pauseOnFocus: false,
    pauseOnHover: false,
    infinite: true,
    speed: 1000,
    fade: true,
    cssEase: 'linear'
  })

  $(document).on('fscreenchange', (event, state, el) => {
    if (state) {
      slideshowContainer.show()
    } else {
      slideshowContainer.hide()
    }
    slideshow.slick('slickSetOption', 'autoplay', state, true)
    if (!state) {
      $(document.body).scrollTop($('#photos').offset().top)
    }
  })
}

function slideshowGoto(index) {
  slideshow.slick('slickGoTo', index)
}

function slideshowGet() {
  return slideshow.slick('slickCurrentSlide') + 1
}

function startSlideshow() {
  setupSlideshow()
  slideshowContainer.fullscreen()
}
