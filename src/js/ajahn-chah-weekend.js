addSection('ajahn-chah-weekend', () => {

  const template = `
    <section id="ajahn-chah-weekend" class="content-section">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Remembering Ajahn Chah Weekend</h2>
            <p>On April 28-29, 2001, over 200 people gathered in Portola Valley 
               to honor the life and teachings of Ajahn Chah.</p>
          </div>
        </div>
        <div class="row text-center">
          <div class="col-md-12">
            <button id="ajahn-chah-weekend-photos" class="btn btn-primary btn-lg">
              Photos from the Event</button>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <h3>Talks</h3>
          </div>
        </div>
        {{for categories}}
          <div class="row">
            <div class="col-md-3">
              <h4>{{:category}}</h4>
            </div>
            <div class="col-md-9">
              {{for audio}}
                <div class="audio-title">
                  <h4>
                    <a href="${dvdPrefix()}Audio/{{url:file}}"
                       title="Ajahn Chah Weekend - {{:title}}"
                       class="listen title">
                      {{:title}}
                    </a>
                    <a href="${dvdPrefix()}Audio/{{url:file}}"
                       class="download" download>
                      <span class="glyphicon glyphicon-download" aria-hidden="true"></span>
                    </a>
                    <a href="${dvdPrefix()}Audio/{{url:file}}"
                       title="Ajahn Chah Weekend - {{:title}}"
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

  const el = $($.templates(template).render({
    categories: audioManifestSectionForTemplate('Ajahn Chah Weekend')
  }))

  el.find('#ajahn-chah-weekend-photos').on('click', (event) => {
    event.preventDefault()
    $(event.currentTarget).lightGallery({
      thumbnail: true,
      dynamic: true,
      dynamicEl: buildLightGalleryDynamicEl(photosManifest['Ajahn Chah Weekend'])
    })
  })

  return el
})
