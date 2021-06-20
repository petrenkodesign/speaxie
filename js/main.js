$( document ).ready(function() { // site load

  getReviews(); // load reviews content

  // Moments and Lessons OWL carusel starting
  $('.video-owl-carousel').owlCarousel({
    loop:false,
    nav:false,
    dots:false,
    margin:10,
    mouseDrag:false,
    responsiveClass:true,
    responsive:{
      0:{
        stagePadding: 50,
        items:1
      },
      600:{
        stagePadding: 50,
        items:2
      },
      1000:{
        items:3,
        nav:true
      }
    }
  });

  // Material OWL carusel starting
  $('.material-owl-carousel').owlCarousel({
    loop:false,
    nav:false,
    dots:false,
    mouseDrag:false,
    responsiveClass:true,
    responsive:{
      0:{
        stagePadding: 50,
        items:1,
      },
      600:{
        stagePadding: 50,
        items:3
      },
      1000:{
        items:4
      }
    }
  });

  // Gallery OWL carusel starting
  $('.image-owl-carousel').owlCarousel({
    loop:false,
    nav:false,
    dots:false,
    margin:10,
    mouseDrag:false,
    responsiveClass:true,
    responsive:{
      0:{
        stagePadding: 20,
        items:1,
      },
      600:{
        items:3
      },
      1000:{
        items:3
      }
    }
  });

  // Reviews OWL carusel starting
  $('.review-owl-carousel').owlCarousel({
    loop:false,
    nav:true,
    dots:false,
    margin:10,
    mouseDrag:false,
    responsiveClass:true,
    responsive:{
      0:{
        stagePadding: 50,
        items:1,
      },
      600:{
        items:2
      },
      1000:{
        items:2
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
  // document.querySelector('#videoPop').querySelector('.video').load();
  $('#videoPop .video').get(0).load();
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

// Popup window for gallery
$('.gallery .item').on('click', function() {
  var carusel='';
  var title = $(this).find('img').attr('alt');
  var current_item = $(this).attr('data-id');
  var total_items = $('.gallery .item').length;

  $('.gallery .item').each(function(i){
    var card_img = $(this).find('img').attr('src');
    var card_title = $(this).find('img').attr('alt');
    var card_id = $(this).attr('data-id');

    carusel += '<div data-id="' + card_id  + '" class="carousel-item';
    if(current_item===card_id) carusel += ' active';
    carusel += '">';
    carusel += '<img src="' + card_img + '" alt="' + card_title + '" class="d-block w-100">';
    carusel += '</div>';
  });

  $('#matPop .carousel-inner').html(carusel);
  $('#matPop .title').html(title);
  $('#matPop .items-num .current-item').text(current_item);
  $('#matPop .items-num .total-item').text(total_items);
  $('#matPop').modal('show');
});

// Popup window for material content
var materials_preview = {
    first_reading: {
      0:{file:'contents.jpg', alt:'Page 1'},
      1:{file:'page_09.jpg', alt:'Page 2'},
      2:{file:'page_10.jpg', alt:'Page 3'},
      3:{file:'page_19.jpg', alt:'Page 4'},
      4:{file:'page_20.jpg', alt:'Page 5'}
    },
    little_hands: {
      0:{file:'LH_SB1_Sample-page-002.jpg', alt:'Page 1'},
      1:{file:'LH_SB1_Sample-page-003.jpg', alt:'Page 2'},
      2:{file:'LH_SB1_Sample-page-004.jpg', alt:'Page 3'},
      3:{file:'LH_SB1_Sample-page-005.jpg', alt:'Page 4'},
      4:{file:'LH_SB1_Sample-page-006.jpg', alt:'Page 5'},
      5:{file:'LH_SB1_Sample-page-007.jpg', alt:'Page 6'},
      6:{file:'LH_SB1_Sample-page-008.jpg', alt:'Page 7'},
      7:{file:'LH_SB1_Sample-page-009.jpg', alt:'Page 8'}
    },
    phonics: {
      0:{file:'R_page_01.jpg', alt:'Page 1'},
      1:{file:'R_page_02.jpg', alt:'Page 2'},
      2:{file:'R_page_03.jpg', alt:'Page 3'},
      3:{file:'R_page_05.jpg', alt:'Page 4'},
      4:{file:'page_23.jpg', alt:'Page 5'},
      5:{file:'page_24.jpg', alt:'Page 6'},
      6:{file:'page_25.jpg', alt:'Page 7'},
      7:{file:'page_26.jpg', alt:'Page 8'}
    },
    smart_english: {
      0:{file:'page_07_zoom.jpg', alt:'Page 1'},
      1:{file:'page_08_zoom.jpg', alt:'Page 2'},
      2:{file:'page_11_zoom.jpg', alt:'Page 3'},
      3:{file:'page_12_zoom.jpg', alt:'Page 4'},
      4:{file:'page_20_zoom.jpg', alt:'Page 5'}
    }
};


$('.materials .card').on('click', function() {
  var carusel='';
  // var title = $(this).find('.card-title').html();
  // var current_item = $(this).attr('data-id');
  var current_dir = $(this).attr('data-dir');
  var total_items = $('.materials .card').length;

  var card_id = 1;
  Object.values(materials_preview[current_dir]).forEach(function(val){
    carusel += '<div data-id="' + card_id  + '" class="carousel-item';
    if(card_id===1) carusel += ' active';
    carusel += '">';
    carusel += '<img src="storage/materials/'+ current_dir + '/' + val.file + '" alt="' + val.alt + '">';
    carusel += '</div>';
    card_id++;
  });

  $('#matPop .carousel-inner').html(carusel);
  $('#matPop .title').html(materials_preview[current_dir][0].alt);
  $('#matPop .items-num .current-item').text(1);
  $('#matPop .items-num .total-item').text(card_id-1);
  $('#matPop').modal('show');
});

// Material modal Slider numerology
$('#matPop').on('slid.bs.carousel', function() {
  var total_items = $(this).find('.carousel-item').length;
  var curent_item = parseInt($(this).find('.carousel-inner .active').attr('data-id'));
  var title = $(this).find('.carousel-inner .active img').attr('alt');

  $(this).find('.items-num .current-item').text(curent_item);
  $(this).find('.items-num .total-item').text(total_items);
  $(this).find('.title').html(title);
})

// Reset material modal data
$('#matPop').on('hidden.bs.modal', function (e) {
  $('#matPop .carousel-inner').html('<div class="carousel-item active"><img src="img/image.jpg"></div>');
  $('#matPop .items-num .current-item').text(0);
  $('#matPop .items-num .total-item').text(0);
  $('#matPop .title').html("Title");
});

// Get review data from json
function getReviews() {
  $.getJSON( "content/reviews.json", function( data ) {
    var html='';
    $.each(data, function(index, val) {
      html+= '<div class="item" data-id="' + index + '">';
      html+= '<ul class="list-group">';
      html+= '<li class="list-group-item border-0">';
      html+= '<div class="d-flex align-items-center">';
      html+= '<div class="flex-shrink-0 rounded-circle bg-info">';
      html+= '<img src="' + val.img + '">';
      html+= '</div>';
      html+= '<div class="flex-grow-1 mx-4">';
      html+= '<h5>' + val.title + '</h5>';
      html+= '<p>';
      for(var i=1; i<6; i++) {
        html+= '<span class="icon-star-full';
        if (i<=val.stars) html+= ' checked';
        html+= '"></span>';
      }
      html+= '</p>';
      html+= '</div></div></li>';
      html+= '<li class="list-group-item border-0">' + val.text + '</li>';
      html+= '<li class="list-group-item border-0 text-right">' + val.date + '</li>';
      html+= '</ul></div>';
      html+= '';
    });

    $('#reviews').html('<div class="review-owl-carousel owl-carousel owl-theme">'+html+'</div>');
    $('.review-owl-carousel').owlCarousel({
      loop:false,
      nav:false,
      dots:false,
      margin:10,
      mouseDrag:false,
      responsiveClass:true,
      responsive:{
        0:{
          stagePadding: 50,
          items:1,
        },
        600:{
          items:2
        },
        1000:{
          items:2
        }
      }
    });
  });
}
