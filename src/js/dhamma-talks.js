addSection('dhamma-talks', () => {

  template = `
    <section id="dhamma-talks" class="content-section">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Dhamma Talks</h2>
          </div>
        </div>
        {{for categories}}
          <div class="row">
            <div class="col-md-2">
              <h3>{{:category}}</h2>
            </div>
            <div class="col-md-10">
              {{for audio}}
                <div class="audio-title">
                  <h4>
                    <a href="${dvdPrefix()}Audio/{{url:file}}"
                       title="{{:title}} by {{:speaker}}"
                       class="listen title">
                      {{:title}}
                    </a>
                    <a href="${dvdPrefix()}Audio/{{url:file}}"
                       class="download" download>
                      <span class="glyphicon glyphicon-download" aria-hidden="true"></span>
                    </a>
                    <a href="${dvdPrefix()}Audio/{{url:file}}"
                       title="{{:title}} by {{:speaker}}"
                       class="listen listen-icon">
                      <span class="glyphicon glyphicon-headphones" aria-hidden="true"></span>
                    </a>
                  </h4>
                  <div class="speaker">{{:speaker}}</div>
                  <div class="summary">{{:summary}}</div>
                </div>
              {{/for}}
            </div>
          </div>
        {{/for}}
      </div>
    </section>
  `

  el = $($.templates(template).render({
    categories: audioManifestSectionForTemplate('Dhamma Talks')
  }))

  return el
})
