let currentIndex = 0;

function updateCarousel() {
  const carousel = document.querySelector(".carousel");
  const testimonials = document.querySelectorAll(".testimonial");
  const offset = -(testimonials[currentIndex].offsetWidth + 20) * currentIndex;
  carousel.style.transform = `translateX(${offset}px)`;
}

function nextSlide() {
  const testimonials = document.querySelectorAll(".testimonial");
  if (currentIndex < testimonials.length - 1) {
    currentIndex++;
    updateCarousel();
  }
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
}


window.addEventListener("resize", updateCarousel);
updateCarousel();

function parallax_height() {
  var scroll_top = $(window).scrollTop();
  var header_height = $(".sample-header-section").outerHeight();
  $(".sample-header").css({ height: header_height - scroll_top });
}

$(document).ready(function () {
  parallax_height();
  $(window).scroll(function () {
    parallax_height();
  });
  $(window).resize(function () {
    parallax_height();
  });
});

class StickyNavigation {

  constructor() {
    this.currentId = null;
    this.currentTab = null;
    this.tabContainerHeight = 70;
    this.tabContainer = $('.et-hero-tabs-container');
    let self = this;

    // Evento de clique nas abas
    $('.et-hero-tab').on('click', function(event) {
      self.onTabClick(event, $(this));
    });

    // Scroll e resize
    $(window).on('scroll', () => { this.onScroll(); });
    $(window).on('resize', () => { this.onResize(); });
  }

  onTabClick(event, element) {
    event.preventDefault();  // Previne comportamento padrão ao clicar
    let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
    $('html, body').animate({ scrollTop: scrollTop }, 600);
  }

  onScroll() {
    this.checkTabContainerPosition();
    this.findCurrentTabSelector();
  }

  onResize() {
    if (this.currentId) {
      this.setSliderCss();
    }
  }

  checkTabContainerPosition() {
    let offset = $('.sticky').offset().top + $('.sticky').height() - this.tabContainerHeight;
    if ($(window).scrollTop() > offset) {
      this.tabContainer.addClass('sticky-container--top');
    } else {
      this.tabContainer.removeClass('sticky-container--top');
    }
  }

  findCurrentTabSelector() {
    let newCurrentId;
    let newCurrentTab;
    let self = this;

    $('.sticky-tab').each(function() {
      let id = $(this).attr('href');
      let offsetTop = $(id).offset().top - self.tabContainerHeight;
      let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;

      if ($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
        newCurrentId = id;
        newCurrentTab = $(this);
      }
    });

    if (this.currentId != newCurrentId || this.currentId === null) {
      this.currentId = newCurrentId;
      this.currentTab = newCurrentTab;
      this.setSliderCss();
    }
  }

  setSliderCss() {
    let width = 0;
    let left = 0;

    if (this.currentTab) {
      width = this.currentTab.outerWidth();
      left = this.currentTab.offset().left;
    }

    $('.sticky-tab-slider').css({
      'width': width + 'px',
      'left': left + 'px'
    });
  }
}

new StickyNavigation();
