// Google Analytics
(function(i, s, o, g, r, a, m) {
  i["GoogleAnalyticsObject"] = r;
  (i[r] =
    i[r] ||
    function() {
      (i[r].q = i[r].q || []).push(arguments);
    }),
    (i[r].l = 1 * new Date());
  (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(
  window,
  document,
  "script",
  "https://www.google-analytics.com/analytics.js",
  "ga"
);
ga("create", "UA-85086943-1", "auto");
ga("send", "pageview");

// Instagram feed
function fetchInstagramImages() {
  fetch(
    "https://api.instagram.com/v1/users/self/media/recent/?access_token=1437536913.3b65890.f1bd1777ba234a25814fe1f956db1359"
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      // We randomly select 10 images
      const images = shuffle(json.data).slice(0, 10);
      renderInstagramImages(images);
    });
}

function renderInstagramImages(data) {
  let html = "";
  data.forEach(function(item) {
    const img = item.images["standard_resolution"];
    const alt = item.caption.text
      .replace(/\"/g, "")
      .replace(/\r?\n|\r/g, "")
      .replace(/  /g, "");
    html += `
      <a href="${item.link}">
        <img
          src="${img.url}"
          width="${img.width}"
          height="${img.height}"
          alt="${alt}"
        />
      </a>`;
  });
  document.getElementById("instafeed").innerHTML = html;
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

var showingMenu = false;
var showingLogo = true;

$(document).ready(function() {
  logoAnimation();
  fetchInstagramImages();

  //open side menu on header click
  $("#menu-link,.contact-button").on("click", function() {
    if (showingMenu) {
      $("body").removeClass("menu-active");
      $("#menu-link a").html('<a href="#">menu</a>');
      showingMenu = false;
      logoToggle();
      event.preventDefault();
    } else {
      $("body").addClass("menu-active");
      $("#menu-link a").html('<a href="#">close</a>');
      showingMenu = true;
      logoToggle();
      event.preventDefault();
    }
    return showingMenu;
  });

  //Animate the Logo titles outwards from the Logo Egg
  function logoToggle() {
    if (showingLogo) {
      $("#logo").removeClass("active");
      showingLogo = false;
    } else {
      logoAnimation();
      $("#logo").addClass("active");
      showingLogo = true;
    }
    return showingLogo;
  }

  //Animate the Logo titles outwards from the Logo Egg
  function logoAnimation() {
    $("#logo a").addClass("animate");
    setTimeout(function() {
      $("#logo a").removeClass("animate");
    }, 1500);
  }

  //Header recedes up on scroll down
  var lastScrollTop = 0;
  var counter = 0;
  $(window).scroll(function() {
    var newScrollTop = $(document).scrollTop();
    var goingDown = newScrollTop > lastScrollTop ? true : false;
    if (!showingMenu) {
      if (goingDown) {
        counter += 1;
        if (counter > 10) {
          $("header").css("top", "-80px");
        }
      } else {
        $("header").css("top", "0");
        counter = 0;
      }
    }
    lastScrollTop = newScrollTop;
  });

  if ($("body").is("#landing")) {
    //start js parallax
    var last_known_scroll_position = 0;
    var ticking = false;

    function jeepParallax(scroll_pos) {
      var jeepParallax =
        (-($("#jeep").height() / 5) *
          (scroll_pos + $(window).height() - $("#jeep").offset().top)) /
        ($("#jeep").height() + $(window).height());
      $("#jeep .parallaxBackground").css(
        "transform",
        "translateY(" + jeepParallax + "px)"
      );
    }

    function caParallax(scroll_pos) {
      var cosmeticAvenueParallax =
        (-($("#cosmetic-avenue").height() / 5) *
          (scroll_pos +
            $(window).height() -
            $("#cosmetic-avenue").offset().top)) /
        ($("#cosmetic-avenue").height() + $(window).height());
      $("#cosmetic-avenue .parallaxBackground").css(
        "transform",
        "translateY(" + cosmeticAvenueParallax + "px)"
      );
    }

    window.addEventListener("scroll", function(e) {
      last_known_scroll_position = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(function() {
          if (
            last_known_scroll_position + $(window).height() >
            $("#jeep").offset().top
          ) {
            if (
              $(window).scrollTop() <
              $("#jeep").offset().top + $("#jeep").height()
            ) {
              jeepParallax(last_known_scroll_position);
            }
          }

          if (
            last_known_scroll_position + $(window).height() >
            $("#cosmetic-avenue").offset().top
          ) {
            if (
              $(window).scrollTop() <
              $("#cosmetic-avenue").offset().top +
                $("#cosmetic-avenue").height()
            ) {
              caParallax(last_known_scroll_position);
            }
          }

          ticking = false;
        });
      }
      ticking = true;
    });
    //end js parallax
    var viewHeight = $(window).height();

    var finsecImagesOffset = $("#finsec .images picture").offset().top;
    var finsecImagesCompleted = false;
    var lookingGoodOffset = $("#lookingGood").offset().top;
    var lookingGoodCompleted = false;
    var cardMobileOffset = $("#cardMobile").offset().top;
    var cardMobileCompleted = false;
    var cardDesktopOffset = $("#cardDesktop").offset().top;
    var cardDesktopCompleted = false;
    var jeepImageOffset = $("#jeep-image").offset().top;
    var jeepImageCompleted = false;
    var caImageOffset = $("#caImage").offset().top;
    var caImageCompleted = false;

    $(window).scroll(function() {
      var $scrollPosition = $(window).scrollTop() + viewHeight;
      var scrollActivationPoint = $(window).scrollTop() + (viewHeight * 3) / 5;

      //Animate in elements which activate on page scroll
      if (!lookingGoodCompleted) {
        if (scrollActivationPoint > lookingGoodOffset) {
          $("#lookingGood").addClass("active");
          var lookingGoodCompleted = true;
        }
      }
      if (!cardMobileCompleted) {
        if (scrollActivationPoint > cardMobileOffset) {
          $("#cardMobile").addClass("active");
          var cardMobileCompleted = true;
        }
      }
      if (!cardDesktopCompleted) {
        if (scrollActivationPoint > cardDesktopOffset) {
          $("#cardDesktop").addClass("active");
          var cardDesktopCompleted = true;
        }
      }
      if (!jeepImageCompleted) {
        if (scrollActivationPoint > jeepImageOffset) {
          $("#jeep-image").addClass("active");
          var jeepImageCompleted = true;
        }
      }
      if (!caImageCompleted) {
        if (scrollActivationPoint > caImageOffset) {
          $("#caImage").addClass("active");
          var caImageCompleted = true;
        }
      }
      if (!finsecImagesCompleted) {
        if (scrollActivationPoint > finsecImagesOffset) {
          $("#finsec .images #iphone").addClass("active");
          setTimeout(function() {
            $("#finsec .images #ipad").addClass("active");
          }, 500);
          setTimeout(function() {
            $("#finsec .images #imac").addClass("active");
          }, 1000);
        }
      }
    });
  }

  if ($("body").is("#services")) {
    $(window).scroll(function() {
      var viewHeight = $(window).height();
      var viewFromTop = $(window).scrollTop();
      var $scrollPosition = viewFromTop + viewHeight;
      var $sectionOffset = $("#illustration").offset().top;

      $(".parallax").each(function() {
        var layer = $(this).attr("layer-data");
        var $parallaxDepth =
          (($sectionOffset - 130 - viewFromTop) * layer) / 10;
        $(this).css("top", $parallaxDepth);
      });
    });
  }

  //Change footer links for individual projects
  if ($("body").is("#project-karen-williams")) {
    $(".feature-card").addClass("active"); //animate the rising card
    $("#project-footer .right").attr("href", "/feature-project/jeep");
  }
  if ($("body").is("#project-jeep")) {
    $("#project-footer .right").attr(
      "href",
      "/feature-project/cosmetic-avenue"
    );
  }
  if ($("body").is("#project-cosmetic-avenue")) {
    $("#project-footer .right").attr("href", "/feature-project/finsec");
  }
  if ($("body").is("#project-finsec")) {
    $("#project-footer .right").attr("href", "/feature-project/karen-williams");
  }
});
