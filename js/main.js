$( document ).ready(function() { // site load

  // Moments OWL carusel starting
  $('.video-owl-carousel').owlCarousel({
    loop:true,
    nav:false,
    dots:false,
    margin:10,
    responsiveClass:true,
    responsive:{
      0:{
        stagePadding: 50,
        items:1,
        loop:false
      },
      600:{
        items:3
      },
      1000:{
        items:3,
        nav:true,
        loop:false,
        mouseDrag:false
      }
    }
  });

}); // end document ready function

// video functionallity
$('.video').click(function() {
  console.log(this.paused)
  this.paused ? this.play() : this.pause();
});
