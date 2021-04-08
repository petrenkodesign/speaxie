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
  if(this.paused==='undefined') return false;
  console.log(this.paused);
  this.paused ? this.play() : this.pause();
  window.clearInterval(this.timer);
});

$('.video').on("play", function() {
  var video_frame = this;
  this.timer = setInterval(function () {
    var progress = Math.round((video_frame.currentTime / video_frame.duration) * 100);
    if(video_frame.currentTime===video_frame.duration) window.clearInterval(video_frame.timer);
    $(video_frame).parent().find('.progress-bar').css('width', progress+'%').attr('aria-valuenow', progress);
  }, 100);
});
