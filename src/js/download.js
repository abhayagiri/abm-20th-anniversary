if (_version < 2) {
  let template = `
    <section id="download" class="cta-one-section content-section alt-bg-light">
      <div class="container">
        <div class="row text-center">
          <div class="col-md-12">
            <h2>Download</h2>
  `
  if (_version == 0) {
    template += `
            <h3>Compilation Audio and Photos</h3>
            <p>
              This is a very large file everything on this page.
              Please note that downloading this file can take
              <em>several hours</em> depending on the speed of your Internet
              connection.
            </p>
            <h3>
              <a href="${basePrefix()}Abhayagiri%27s%2020th%20Anniversary%20Compilation.zip"
                 class="btn btn-default btn-lg">
                Download (4,100 MB ZIP)
              </a>
            </h3>
    `
  }
  template += `
            <h3>June 4th Audio and Photos</h3>
            <p>
              This file contains the audio and photos taken on June 4th, the
              day of the the anniversary. It <em>does not</em> include anything
              else.
            </p>
            <h3>
              <a href="${basePrefix()}Abhayagiri%27s%2020th%20Anniversary%20Extras.zip"
                 class="btn btn-default btn-lg">
                Download (250 MB ZIP)
              </a>
            </h3>
          </div>
        </div>
      </div>
    </section>
  `
  addSection('download', template)
}
