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

let calcScrollValue = ()=>{
  let scrollProgress = document.getElementById("progress");
  let progressValue = document.getElementById("progress-value");
  let pos= document.documentElement.scrollTop;
  let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100)/calcHeight);
  if(pos > 100){
    scrollProgress.style.display="grid";
  }else{
    scrollProgress.style.display="none";
  }
  scrollProgress.addEventListener("click",()=>{
    document.documentElement.scrollTop=0;
  });
  scrollProgress.style.background = `conic-gradient(#d2047a ${scrollValue}% , #1e1f22 ${scrollValue}%)`;
  
}

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;