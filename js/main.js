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
    var s = parseInt(video_frame.currentTime % 60);
    if (s<10) s = '0' + s;
    var m = parseInt((video_frame.currentTime / 60) % 60);

    $(video_frame).parent().find('.progress-bar').css('width', progress+'%').attr('aria-valuenow', progress);
    $(video_frame).parent().find('.timer').html(m+":"+s);

    if(video_frame.currentTime===video_frame.duration) {
      window.clearInterval(video_frame.timer);
      $(video_frame).parent().find('.control .play').html('<span class="icon-loop"></span>');
    }
  }, 100);
});

// Popup window for video content
$('.card .video-preview .control').dblclick(function() {
  stopAllPlay();
  $('#videoPop').modal('show');

  var video_src = $(this).parent().find('.video source').attr('src');
  var video_type = $(this).parent().find('.video source').attr('type');
  var play_time = $(this).parent().find('.video').get(0).currentTime;

  var title = $(this).parent().parent().find('.card-title').html();
  var text = $(this).parent().parent().find('.card-text').html();

  $('#videoPop .video').html('<source src="' + video_src + '" type="' + video_type + '"></source>');
  $('#videoPop .video').get(0).currentTime = play_time;
  $('#videoPop .video').get(0).play();

  $('#videoPop .modal-footer .title').html(title);
  $('#videoPop .modal-footer .text').html(text);
});

$('#videoPop').on('hidden.bs.modal', function (e) {
  stopAllPlay();
})

function stopAllPlay() {
  $('.video').each(function() {
    if(this.paused==='undefined') return false;
    this.pause();
    $(this).parent().find('.control .play').html('<span class="icon-play"></span>');
  });
}

function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}
