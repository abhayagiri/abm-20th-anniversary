function buildLightGalleryDynamicEl(manifest, requiredVersion) {
  let dynamicEl = []
  manifest.forEach((data) => {
    dynamicEl.push({
      downloadUrl: dvdPrefix(requiredVersion) + 'Photos/' + data.file,
      src: dvdPrefix(requiredVersion) + 'Web/img/large/' + data.file,
      thumb: dvdPrefix(requiredVersion) + 'Web/img/thumb/' + data.file,
      width: data.large.width,
      subHtml: data.caption
    })
  })
  return dynamicEl
}

addSection('photos', () => {

  const template = `
    <section id="photos" class="content-section">
      <div class="container text-center">
        <div class="row">
          <div class="col-md-12">
            <h2 style="text-stroke: 1px black">Photos</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <a href="#" id="photos-1996-2006-gallery" class="btn btn-default btn-lg">1996-2006 Photos</a>
          </div>
          <div class="col-md-6">
            <a href="#" id="start-slideshow" class="btn btn-default btn-lg">1996-2016 Slideshow</a>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <a href="#" id="photos-2007-2016-gallery" class="btn btn-default btn-lg">2007-2016 Photos</a>
          </div>
          <div class="col-md-6">
            <a href="#" id="picture-board-gallery" class="btn btn-default btn-lg">Picture Boards</a>
          </div>
        </div>
      </div>
    </section>
  `

  el = $(
    $($.templates(template).render())
  )

  el.find('#photos-1996-2006-gallery').on('click', (event) => {
    event.preventDefault()
    $(event.currentTarget).lightGallery({
      thumbnail: true,
      dynamic: true,
      dynamicEl: buildLightGalleryDynamicEl(photosManifest['1996-2006'])
    })
  })

  el.find('#photos-2007-2016-gallery').on('click', (event) => {
    event.preventDefault()
    $(event.currentTarget).lightGallery({
      thumbnail: true,
      dynamic: true,
      dynamicEl: buildLightGalleryDynamicEl(photosManifest['2007-2016'])
    })
  })

  el.find('#picture-board-gallery').on('click', (event) => {
    event.preventDefault()
    $(event.currentTarget).lightGallery({
      thumbnail: false,
      dynamic: true,
      dynamicEl: buildLightGalleryDynamicEl(photosManifest['Picture Boards'], 2)
    })
  })

  el.find('#start-slideshow').on('click', (event) => {
    event.preventDefault()
    startSlideshow()
  })

  return el

})
