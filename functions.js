// @codekit-prepend "/vendor/hammer-2.0.8.js";
var bigRefund = 600;
var f1 = 123, f2 = 432, f3 = 384;

$( document ).ready(function() {

  // DOMMouseScroll included for firefox support
  var canScroll = true,
      scrollController = null;
  $(this).on('mousewheel DOMMouseScroll', function(e){

    if (!($('.outer-nav').hasClass('is-vis'))) {

      e.preventDefault();

      var delta = (e.originalEvent.wheelDelta) ? -e.originalEvent.wheelDelta : e.originalEvent.detail * 20;

      if (delta > 50 && canScroll) {
        canScroll = false;
        clearTimeout(scrollController);
        scrollController = setTimeout(function(){
          canScroll = true;
        }, 800);
        updateHelper(1);
      }
      else if (delta < -50 && canScroll) {
        canScroll = false;
        clearTimeout(scrollController);
        scrollController = setTimeout(function(){
          canScroll = true;
        }, 800);
        updateHelper(-1);
      }

    }

  });

  $('.side-nav li, .outer-nav li').click(function(){

    if (!($(this).hasClass('is-active'))) {

      var $this = $(this),
          curActive = $this.parent().find('.is-active'),
          curPos = $this.parent().children().index(curActive),
          nextPos = $this.parent().children().index($this),
          lastItem = $(this).parent().children().length - 1;

      updateNavs(nextPos);
      updateContent(curPos, nextPos, lastItem);

    }

  });

  /* */
  function addUser() {
    var valid = true;
    allFields.removeClass( "ui-state-error" );

    valid = valid && checkLength( name, "username", 3, 16 );
    valid = valid && checkLength( email, "email", 6, 80 );
    valid = valid && checkLength( password, "password", 5, 16 );

    valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
    valid = valid && checkRegexp( email, emailRegex, "eg. ui@jquery.com" );
    valid = valid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );

    if ( valid ) {
      $( "#users tbody" ).append( "<tr>" +
        "<td>" + name.val() + "</td>" +
        "<td>" + email.val() + "</td>" +
        "<td>" + password.val() + "</td>" +
      "</tr>" );
      dialog.dialog( "close" );
    }
    return valid;
  }
  dialog = $( "#dialog-form" ).dialog({
    autoOpen: false,
    height: 400,
    width: 350,
    modal: true,
    buttons: {
      "Login": function() {
        console.info("@@Login me in");
        dialog.dialog("close");

        // hide/show stuff
        $(".intro--banner").css("position", "absolute");
        $(".intro--banner").hide();
        $(".intro--options").hide();

        $('.myBigRefund').html(bigRefund);
        $('#myBigRefund2').html(bigRefund);
        $(".intro--login").show();

      },
      Cancel: function() {
        dialog.dialog( "close" );
      }
    },
    close: function() {
      //form[ 0 ].reset();
      //allFields.removeClass( "ui-state-error" );
      console.info("@@Close me");
    }
  });

  /* */
  $('.cta').click(function(){

    // var curActive = $('.side-nav').find('.is-active'),
    //     curPos = $('.side-nav').children().index(curActive),
    //     lastItem = $('.side-nav').children().length - 1,
    //     nextPos = lastItem;

    // updateNavs(lastItem);
    // updateContent(curPos, nextPos, lastItem);
    dialog.dialog( "open" );
    console.info("hello");
  });

  $('#y1').click(function(){
    $('#picbtn1').show();
    $('#canvas1').show();
  });
  $('#n1').click(function(){
    $('#picbtn1').hide();
    $('#canvas1').hide();

    if ($('#mypic1').val().length > 0) {
      startVal = bigRefund + "";
      bigRefund -= f1;

      gaa = new countUp.CountUp('myBigRefund', bigRefund, {startVal:startVal});
      gaa.start();
    }

    $('#mypic1').val('');
    $('#canvas1')[0].width = 0;
  });
  $('#y2').click(function(){
    $('#picbtn2').show();
    $('#canvas2').show();
  });
  $('#n2').click(function(){
    $('#picbtn2').hide();
    $('#canvas2').hide();

    if ($('#mypic2').val().length > 0) {
      startVal = bigRefund + "";
      bigRefund -= f2;

      gaa = new countUp.CountUp('myBigRefund', bigRefund, {startVal:startVal});
      gaa.start();
    }

    $('#mypic2').val('');
    $('#canvas2')[0].width = 0;
  });
  $('#y3').click(function(){
    $('#picbtn3').show();
    $('#canvas3').show();
  });
  $('#n3').click(function(){
    $('#picbtn3').hide();
    $('#canvas3').hide();

    if ($('#mypic3').val().length > 0) {
      startVal = bigRefund + "";
      bigRefund -= f3;

      gaa = new countUp.CountUp('myBigRefund', bigRefund, {startVal:startVal});
      gaa.start();
    }

    $('#mypic3').val('');
    $('#canvas3')[0].width = 0;
  });
  $('#picbtn1').click(function() {
    $('#mypic1').click();
  });
  $('#picbtn2').click(function() {
    $('#mypic2').click();
  });
  $('#picbtn3').click(function() {
    $('#mypic3').click();
  });

  $('#mypic1').change(function () {
    drawOnCanvas(this.files[0], 'canvas1');
    startVal = bigRefund + "";
    bigRefund += f1;

    gaa = new countUp.CountUp('myBigRefund', bigRefund, {startVal:startVal});
    gaa.start();
  });
  $('#mypic2').change(function () {
    drawOnCanvas(this.files[0], 'canvas2');
    startVal = bigRefund + "";
    bigRefund += f2;

    gaa = new countUp.CountUp('myBigRefund', bigRefund, {startVal:startVal});
    gaa.start();
  });
  $('#mypic3').change(function () {
    drawOnCanvas(this.files[0], 'canvas3');
    startVal = bigRefund + "";
    bigRefund += f3;

    gaa = new countUp.CountUp('myBigRefund', bigRefund, {startVal:startVal});
    gaa.start();
  });

  function drawOnCanvas(file, canvas) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var dataURL = e.target.result,
          c = document.getElementById(canvas), // see Example 4
          ctx = c.getContext('2d'),
          img = new Image();

      img.onload = function() {
        c.width = 50;
        // c.height = 100;
        ctx.drawImage(img, 0, 0, c.width, c.height);
      };
 
      img.src = dataURL;
    };
    reader.readAsDataURL(file);
  }

  // swipe support for touch devices
  var targetElement = document.getElementById('viewport'),
      mc = new Hammer(targetElement);
  mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
  mc.on('swipeup swipedown', function(e) {

    updateHelper(e);

  });

  $(document).keyup(function(e){

    if (!($('.outer-nav').hasClass('is-vis'))) {
      e.preventDefault();
      updateHelper(e);
    }

  });

  // determine scroll, swipe, and arrow key direction
  function updateHelper(param) {

    var curActive = $('.side-nav').find('.is-active'),
        curPos = $('.side-nav').children().index(curActive),
        lastItem = $('.side-nav').children().length - 1,
        nextPos = 0;

    if (param.type === "swipeup" || param.keyCode === 40 || param > 0) {
      if (curPos !== lastItem) {
        nextPos = curPos + 1;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
      else {
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
    }
    else if (param.type === "swipedown" || param.keyCode === 38 || param < 0){
      if (curPos !== 0){
        nextPos = curPos - 1;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
      else {
        nextPos = lastItem;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
    }

  }

  // sync side and outer navigations
  function updateNavs(nextPos) {

    $('.side-nav, .outer-nav').children().removeClass('is-active');
    $('.side-nav').children().eq(nextPos).addClass('is-active');
    $('.outer-nav').children().eq(nextPos).addClass('is-active');

  }

  // update main content area
  function updateContent(curPos, nextPos, lastItem) {
    if (nextPos == 0) {
      $('#myBigRefundDiv').hide();
    } else {
      $('#myBigRefundDiv').show();
    }

    $('.main-content').children().removeClass('section--is-active');
    $('.main-content').children().eq(nextPos).addClass('section--is-active');
    $('.main-content .section').children().removeClass('section--next section--prev');

    if (curPos === lastItem && nextPos === 0 || curPos === 0 && nextPos === lastItem) {
      $('.main-content .section').children().removeClass('section--next section--prev');
    }
    else if (curPos < nextPos) {
      $('.main-content').children().eq(curPos).children().addClass('section--next');
    }
    else {
      $('.main-content').children().eq(curPos).children().addClass('section--prev');
    }

    if (nextPos !== 0 && nextPos !== lastItem) {
      $('.header--cta').addClass('is-active');
    }
    else {
      $('.header--cta').removeClass('is-active');
    }

  }

  function outerNav() {

    $('.header--nav-toggle').click(function(){

      $('.perspective').addClass('perspective--modalview');
      setTimeout(function(){
        $('.perspective').addClass('effect-rotate-left--animate');
      }, 25);
      $('.outer-nav, .outer-nav li, .outer-nav--return').addClass('is-vis');

    });

    $('.outer-nav--return, .outer-nav li').click(function(){

      $('.perspective').removeClass('effect-rotate-left--animate');
      setTimeout(function(){
        $('.perspective').removeClass('perspective--modalview');
      }, 400);
      $('.outer-nav, .outer-nav li, .outer-nav--return').removeClass('is-vis');

    });

  }

  function workSlider() {

    $('.slider--prev, .slider--next').click(function() {

      var $this = $(this),
          curLeft = $('.slider').find('.slider--item-left'),
          curLeftPos = $('.slider').children().index(curLeft),
          curCenter = $('.slider').find('.slider--item-center'),
          curCenterPos = $('.slider').children().index(curCenter),
          curRight = $('.slider').find('.slider--item-right'),
          curRightPos = $('.slider').children().index(curRight),
          totalWorks = $('.slider').children().length,
          $left = $('.slider--item-left'),
          $center = $('.slider--item-center'),
          $right = $('.slider--item-right'),
          $item = $('.slider--item');

      $('.slider').animate({ opacity : 0 }, 400);

      setTimeout(function(){

      if ($this.hasClass('slider--next')) {
        if (curLeftPos < totalWorks - 1 && curCenterPos < totalWorks - 1 && curRightPos < totalWorks - 1) {
          $left.removeClass('slider--item-left').next().addClass('slider--item-left');
          $center.removeClass('slider--item-center').next().addClass('slider--item-center');
          $right.removeClass('slider--item-right').next().addClass('slider--item-right');
        }
        else {
          if (curLeftPos === totalWorks - 1) {
            $item.removeClass('slider--item-left').first().addClass('slider--item-left');
            $center.removeClass('slider--item-center').next().addClass('slider--item-center');
            $right.removeClass('slider--item-right').next().addClass('slider--item-right');
          }
          else if (curCenterPos === totalWorks - 1) {
            $left.removeClass('slider--item-left').next().addClass('slider--item-left');
            $item.removeClass('slider--item-center').first().addClass('slider--item-center');
            $right.removeClass('slider--item-right').next().addClass('slider--item-right');
          }
          else {
            $left.removeClass('slider--item-left').next().addClass('slider--item-left');
            $center.removeClass('slider--item-center').next().addClass('slider--item-center');
            $item.removeClass('slider--item-right').first().addClass('slider--item-right');
          }
        }
      }
      else {
        if (curLeftPos !== 0 && curCenterPos !== 0 && curRightPos !== 0) {
          $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
          $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
          $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
        }
        else {
          if (curLeftPos === 0) {
            $item.removeClass('slider--item-left').last().addClass('slider--item-left');
            $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
            $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
          }
          else if (curCenterPos === 0) {
            $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
            $item.removeClass('slider--item-center').last().addClass('slider--item-center');
            $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
          }
          else {
            $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
            $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
            $item.removeClass('slider--item-right').last().addClass('slider--item-right');
          }
        }
      }

    }, 400);

    $('.slider').animate({ opacity : 1 }, 400);

    });

  }

  function transitionLabels() {

    $('.work-request--information input').focusout(function(){

      var textVal = $(this).val();

      if (textVal === "") {
        $(this).removeClass('has-value');
      }
      else {
        $(this).addClass('has-value');
      }

      // correct mobile device window position
      window.scrollTo(0, 0);

    });

  }

  outerNav();
  workSlider();
  transitionLabels();

});
