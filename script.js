(function ($) {
  $(function () {
    $(window).on("scroll", function () {
      fnOnScroll();
    });

    $(window).on("resize", function () {
      fnOnResize();
    });

    var agTimeline = $(".js-timeline"),
      agTimelineLine = $(".js-timeline_line"),
      agTimelineLineProgress = $(".js-timeline_line-progress"),
      agTimelinePoint = $(".js-timeline-card_point-box"),
      agTimelineItem = $(".js-timeline_item"),
      agOuterHeight = $(window).outerHeight(),
      agHeight = $(window).height(),
      f = -1,
      agFlag = false;

    function fnOnScroll() {
      agPosY = $(window).scrollTop();
      fnUpdateFrame();
    }

    function fnOnResize() {
      agPosY = $(window).scrollTop();
      agHeight = $(window).height();
      fnUpdateFrame();
    }

    function fnUpdateWindow() {
      agFlag = false;
      agTimelineLine.css({
        top:
          agTimelineItem.first().find(agTimelinePoint).offset().top -
          agTimelineItem.first().offset().top,
        bottom:
          agTimeline.offset().top +
          agTimeline.outerHeight() -
          agTimelineItem.last().find(agTimelinePoint).offset().top,
      });

      f !== agPosY && ((f = agPosY), agHeight, fnUpdateProgress());
    }

    function fnUpdateProgress() {
      var agTop = agTimelineItem.last().find(agTimelinePoint).offset().top;

      i = agTop + agPosY - $(window).scrollTop();
      a = agTimelineLineProgress.offset().top + agPosY - $(window).scrollTop();
      n = agPosY - a + agOuterHeight / 2;
      i <= agPosY + agOuterHeight / 2 && (n = i - a);
      agTimelineLineProgress.css({ height: n + "px" });

      agTimelineItem.each(function () {
        var agTop = $(this).find(agTimelinePoint).offset().top;
        agTop + agPosY - $(window).scrollTop() < agPosY + 0.5 * agOuterHeight
          ? $(this).addClass("js-ag-active")
          : $(this).removeClass("js-ag-active");
      });
    }

    function fnUpdateFrame() {
      agFlag || requestAnimationFrame(fnUpdateWindow);
      agFlag = true;
    }
  });
})(jQuery);

window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");

  // Display the preloader for 6 seconds
  setTimeout(function () {
    preloader.style.display = "none";
  }, 2800); // 6000 milliseconds = 6 seconds
});

// js code for scroll to top

let calcScrollValue = () => {
  let scrollProgress = document.getElementById("progress");
  let progressValue = document.getElementById("progress-value");
  let pos = document.documentElement.scrollTop;
  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100) / calcHeight);
  if (pos > 100) {
    scrollProgress.style.display = "grid";
  } else {
    scrollProgress.style.display = "none";
  }
  scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });
  scrollProgress.style.background = `conic-gradient(#d2047a ${scrollValue}% , #1e1f22 ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

document.addEventListener("DOMContentLoaded", function () {
  const haxmasContainer = document.querySelector(".haxmas-container");

  function handleScroll() {
    const containerPosition = haxmasContainer.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3; // Adjust this value to control when the animation triggers

    if (containerPosition < screenPosition) {
      haxmasContainer.classList.add("visible");
      haxmasContainer.classList.remove("hidden");
    }
  }

  window.addEventListener("scroll", handleScroll);

  // Initial check in case the element is already in view
  handleScroll();
});

/*  FAQL JS implementation */

const faqs = document.querySelectorAll(".faq");

faqs.forEach((faq) => {
  faq.addEventListener("click", (e) => {
    faq.classList.toggle("active");
  });
});

/* Haxmas Phases */

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

// about Haxmas JS code

// about container
ScrollReveal().reveal(".image-section img", {
  ...scrollRevealOption,
  origin: "right",
});

ScrollReveal().reveal(".text-section h1", {
  ...scrollRevealOption,
  delay: 1000,
});



ScrollReveal().reveal(".text-section p", {
  ...scrollRevealOption,
  delay: 1000,
});



// haxmas phases  container
ScrollReveal().reveal(".phase", {
  ...scrollRevealOption,
  interval: 1000,
});


// faq section

ScrollReveal().reveal(".faq-container .faq", {
  ...scrollRevealOption,
  interval: 1000,
  origin: "left",
});

ScrollReveal().reveal(".contact-container", {
  ...scrollRevealOption,
  interval: 2000,
  origin: "left",
});

