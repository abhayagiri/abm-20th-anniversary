addSection('books', () => {

  const template = `
    <section id="books" class="content-section text-center">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Abundant, Exhaulted, Immeasurable</h2>
            <p>By Luang Por Pasanno</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <a href="${dvdPrefix()}Books/Abundant_Exalted_Immeasurable_web.pdf"
               id="read-button" class="btn btn-primary btn-lg">Preview</a>
            &nbsp;&nbsp;&nbsp;or download&nbsp;&nbsp;&nbsp;
            <a href="${dvdPrefix()}Books/Abundant_Exalted_Immeasurable.epub"
               class="btn btn-default btn-lg" download>Epub</a>
            <a href="${dvdPrefix()}Books/Abundant_Exalted_Immeasurable.mobi"
               class="btn btn-default btn-lg" download>Mobi</a>
            <a href="${dvdPrefix()}Books/Abundant_Exalted_Immeasurable_web.pdf"
               class="btn btn-default btn-lg" download>PDF</a>
          </div>
        </div>
      </div>
    </section>
  `

  el = $($.templates(template).render())

  el.find('#read-button').magnificPopup({
    items: {
      type: 'inline',
      src: '<div id="read-popup" class="white-popup"></div>'
    },
    callbacks: {
      open: () => {
        PDFObject.embed(`${dvdPrefix()}Books/Abundant_Exalted_Immeasurable_web.pdf`,
          '#read-popup');
      }
    }
  })

  return el
})
