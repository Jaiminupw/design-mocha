
$(document).ready(function () {
  if(document.getElementById("ctoggle")!==null) {
  document.getElementById("ctoggle").addEventListener('click', () => {
    var x = document.getElementById("ptabs");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  })}
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
})

$(".scroll-down").click(function () {
  var $container = $(".wrapper");
  var $scrollTo = $('.sectione1');
  $container.animate({ scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop(), scrollLeft: 0 }, 300);
})
var dc = document.getElementsByClassName("wrapper")[0]
dc.addEventListener('scroll', function() {
    if (dc.scrollTop > 50) {
      document.getElementById('stickytop').classList.add('fixed-top');
      // add padding top to show content behind navbar
      navbar_height = document.querySelector('#stickytop').offsetHeight;
      // document.body.style.paddingTop = navbar_height + 'px';
    } else {
      document.getElementById('stickytop').classList.remove('fixed-top');
       // remove padding top from body
      document.body.style.paddingTop = '0';
    } 
});
if(window.location.pathname !== "/") {
  document.getElementsByClassName("pace")[0].style.display = "none !important"
}
// paceOptions = {
//   ajax: false, // disabled
//   document: false, // disabled
//   eventLag: true, // disabled
//   elements: false
// };
// document.addEventListener("DOMContentLoaded", function(){
//   var menu = document.getElementsByClassName("nav-toggle")[0];
//   var slide = document.getElementsByClassName("slide-menu")[0]
//   menu.addEventListener("click", function() {
//     var width = slide.style.display;
//     console.log(width)
//     if(width == "none") {
//       slide.style.display = "block";
//       slide.style.maxWidth = "100%";
//     }
//     else {
//       slide.style.display = "none";
//       slide.style.maxWidth="0%";
//     }

//   })
// })


