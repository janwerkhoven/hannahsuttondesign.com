var showingMenu = false;
var showingLogo = true;

$(document).ready(function() {

  logoAnimation();

  $(window).scroll(function() {
    var viewFromTop = $(window).scrollTop();
    var viewHeight = $(window).height();
    var elementActivationPoint = viewFromTop + (viewHeight * 2 / 3);

    var introGoodLooking = $('#intro h2 > span').offset().top;
    if (introGoodLooking < elementActivationPoint) {
      $('#intro h2 > span').addClass('active');
    };

    var cosmeticAvenueImage = $('#ca-image').offset().top;
    if (cosmeticAvenueImage < elementActivationPoint) {
      $('#ca-image').addClass('active');
    };

    var jeepImage = $('#jeep-image').offset().top;
    if (jeepImage < elementActivationPoint) {
      $('#jeep-image').addClass('active');
    };

    var finsecImages = $('#finsec .images').offset().top;
    if (finsecImages + 250 < elementActivationPoint) {
      $('#finsec .images img:nth-last-child(3)').addClass('active');
      $('#finsec .images img:nth-last-child(2)').addClass('active');
      $('#finsec .images img:nth-last-child(1)').addClass('active');
    };

    var karenWilliamsCard = $('#sliding-cards .feature-card').offset().top;
    if (karenWilliamsCard < elementActivationPoint) {
      $('#sliding-cards .feature-card').addClass('active');
    };
    var karenWilliamsCardMobile = $('#sliding-cards .feature-card-mobile').offset().top;
    if (karenWilliamsCardMobile < elementActivationPoint) {
      $('#sliding-cards .feature-card-mobile').addClass('active');
    };

  });

  $('#menu-link').on('click', function() {
    if (showingMenu) {
      $('body').removeClass('menu-active');
      $('#menu-link a').html('<a href="#">menu</a>');
      showingMenu = false;
      logoToggle();
      event.preventDefault();

    } else {
      $('body').addClass('menu-active');
      $('#menu-link a').html('<a href="#">close</a>');
      showingMenu = true;
      logoToggle();
      event.preventDefault();

    };
    return showingMenu;
  });

  //Animate the Logo titles outwards from the Logo Egg
  function logoToggle() {
    if (showingLogo) {
      $('#logo').removeClass('active');
      showingLogo = false;

    } else {
      logoAnimation();
      $('#logo').addClass('active');
      showingLogo = true;

    }
    return showingLogo;
  };

  //Animate the Logo titles outwards from the Logo Egg
  function logoAnimation() {
    $('#logo a').addClass('animate');
    setTimeout(function() {
      $('#logo a').removeClass('animate');
    }, 1500);

  };

  //Animate the Karen Williams cards upwards as they are scrolled on to
  function karenWilliamsCard() {

  };

});
