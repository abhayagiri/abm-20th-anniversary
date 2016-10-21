addSection('anniversary', () => {

  const template = `
    <section id="anniversary" class="content-section">
      <div class="container">
        <div class="row text-center">
          <div class="col-md-12">
            <h2>June 4th – The Anniversary</h2>
            <p>
              Many people gathered at Abhayagiri on June 4th, 2016
              to meet old friends, celebrate and share reflections.
            </p>
          </div>
        </div>
        <div class="row text-center">
          <div class="col-md-12">
            <h3>Photos</h3>
            <p>
              <button id="anniversary-photos" class="btn btn-primary btn-lg">
                Photos from the Event</button>
            </p>
          </div>
        </div>
        <div class="row text-center">
          <div class="col-md-12">
            <h3>Talks and Reflections</h3>
          </div>
        </div>
        {{for categories}}
          <div class="row">
            <div class="col-md-3">
            </div>
            <div class="col-md-9">
              {{for audio}}
                <div class="audio-title">
                  <h4>
                    <a href="${dvdPrefix(2)}Audio/{{url:file}}"
                       title="Abhayagiri's 20th Anniversary - {{:title}}"
                       class="listen title">
                      {{:title}}
                    </a>
                    <a href="${dvdPrefix(2)}Audio/{{url:file}}"
                       class="download" download>
                      <span class="glyphicon glyphicon-download" aria-hidden="true"></span>
                    </a>
                    <a href="${dvdPrefix(2)}Audio/{{url:file}}"
                       title="Abhayagiri's 20th Anniversary - {{:title}}"
                       class="listen listen-icon">
                      <span class="glyphicon glyphicon-headphones" aria-hidden="true"></span>
                    </a>
                  </h4>
                </div>
              {{/for}}
            </div>
          </div>
        {{/for}}
      </div>
    </section>
  `

  const el = $(
    $.templates(template).render({
      categories: audioManifestSectionForTemplate("Abhayagiri's 20th Anniversary")
    })
  )

  el.find('#anniversary-photos').on('click', (event) => {
    event.preventDefault()
    $(event.currentTarget).lightGallery({
      thumbnail: true,
      dynamic: true,
      dynamicEl: buildLightGalleryDynamicEl(photosManifest["Abhayagiri's 20th Anniversary"], 2)
    })
  })

  return el
})
