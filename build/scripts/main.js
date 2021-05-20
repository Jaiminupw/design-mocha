
$(document).ready(function () {
  document.getElementById("ctoggle").addEventListener('click', () => {
    var x = document.getElementById("ptabs");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  })
  $(".scroll-down").click(function () {
    console.log("scroll")
    var $container = $(".page-container");
    var $scrollTo = $('.sectione1');
    $container.animate({ scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop(), scrollLeft: 0 }, 300);
  })
  $(".my-btn").click(function () {
    $('.body').animate({
      scrollTop: (0, 0)
    }, 500);
  })
  var elements = document.getElementsByClassName("custom-switch");
  for (var i = 0; i < elements.length; i++) {
    elements[i].oninvalid = function (e) {
      e.target.setCustomValidity("");
      if (!e.target.validity.valid) {
        e.target.setCustomValidity("Accept terms & conditions to proceed");
      }
    };
    elements[i].oninput = function (e) {
      e.target.setCustomValidity("");
    };
  }
  // $("#background-video").get(0).play()
})