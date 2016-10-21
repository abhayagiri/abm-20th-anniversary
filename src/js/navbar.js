addSection('navbar', () => {
  let fearlessMountainHtml
  if (_version > 0) {
    fearlessMountainHtml = `<li><a href="#fearless-mountain">Fearless Mountain</a></li>`
  } else {
    fearlessMountainHtml = ''
  }
  const template = `
    <nav class="navbar navbar-custom navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header pull-left">
          <a class="navbar-top-link page-scroll" href="#top" title="Scroll to Top">
            <span class="navbar-large-screen">
              Abhayagiri's 20th Anniversary
            </span>
            <span class="navbar-small-screen">
              20th Anniversary
            </span>
          </a>
          <a class="navbar-home-link" href="https://www.abhayagiri.org/" title="Abhayagiri Homepage">
            <img src="${basePrefix()}img/logo.png" alt="Homepage">
          </a>
        </div>
        <div class="main-nav pull-right">
          <div class="button_container toggle">
            <span class="top"></span>
            <span class="middle"></span>
            <span class="bottom"></span>
          </div>
        </div>
        <div class="overlay" id="overlay">
          <nav class="overlay-menu">
            <ul>
              <li><a href="#dhamma-talks">Dhamma Talks</a></li>
              <li><a href="#photos">Photos</a></li>
              <li><a href="#books">Abundant, Exhaulted, Immeasurable</a></li>
              <li><a href="#ajahn-chah-weekend">Remembering Ajahn Chah Weekend</a></li>
              ${fearlessMountainHtml}
              <li><a href="#anniversary">The 20th Anniversary</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </nav>
  `
  const el = $(template)

  // Closes the Responsive Menu on Menu Item Click
  el.find('.navbar-collapse ul li a').click(function() {
      $('.navbar-toggle:visible').click();
  });

  // Navigation show/hide
  el.find('.toggle').click(function() {
    if (el.find('#overlay.open')) {
      $(this).toggleClass('active');
      el.find('#overlay').toggleClass('open');
    }
  });

  // jQuery for page scrolling feature - requires jQuery Easing plugin
  el.find('.overlay-menu ul li a,.scroll-top a').bind('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
  });

  // Closes the Responsive Menu on Menu Item Click
  el.find('.overlay-menu ul li a').click(function() {
    el.find('.button_container:visible').click();
  });

  // jQuery for page scrolling feature - requires jQuery Easing plugin
  $('a.page-scroll').bind('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
  });

  // jQuery to collapse the navbar on scroll
  $(window).scroll(function() {
    if (el.offset().top > 50) {
      el.addClass("top-nav-collapse");
      el.find(".scroll-top").fadeIn('1000', "easeInOutExpo");
    } else {
      el.removeClass("top-nav-collapse");
      el.find(".scroll-top").fadeOut('1000', "easeInOutExpo");
    }
  });

  return el
})
