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
$('.card .video-preview .control .play').click(function() {
  var video = $(this).parent().parent().find('.video').get(0);
  if(video.paused==='undefined') return false;
  // video.paused ? video.play() : video.pause();
  if(video.paused) {
    video.play();
    $(this).html('<span class="icon-pause"></span>');
  }
  else {
    video.pause();
    $(this).html('<span class="icon-play"></span>');
    window.clearInterval(video.timer);
  }
});

$('.video').on("play", function() {
  var video_frame = this;
  this.timer = setInterval(function () {
    var progress = Math.round((video_frame.currentTime / video_frame.duration) * 100);
    $(video_frame).parent().find('.progress-bar').css('width', progress+'%').attr('aria-valuenow', progress);
    if(video_frame.currentTime===video_frame.duration) {
      window.clearInterval(video_frame.timer);
      $(video_frame).parent().find('.control .play').html('<span class="icon-loop"></span>');
    }
  }, 100);
});
