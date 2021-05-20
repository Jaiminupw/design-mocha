$(".pace-progress-inner").html("Hello")
var originalBG = $(".sabsolute").css("background");

$('.sabsolute').mousemove(function(e) {
    x = e.pageX - this.offsetLeft;
    y = e.pageY - this.offsetTop;
    xy = x + " " + y;
    bgWebKit = "-webkit-gradient(radial, " + xy + ", 0, " + xy + ", 320, from(rgba(255,255,255,0)), to(rgba(0, 0, 0, 0.3 ))), " + "rgba(0, 0, 0, 0)";
    // bgMoz = "-moz-radial-gradient(" + x + "px " + y + "px 45deg, circle, " + lightColor + " 0%, " + originalBG + " " + gradientSize + "px)";

    $(this)
        .css({background: bgWebKit})
        // .css({background: bgMoz});
    }).mouseleave(function() {
    $(this).css({
        background: originalBG
    });
});


const ball = document.querySelector("div.ball");

let mouseX = 0;
let mouseY = 0;

let ballX = 0;
let ballY = 0;

let speed = 0.02;


function animate(){
  
  let distX = mouseX - ballX;
  let distY = mouseY - ballY;
  
  
  ballX = ballX + (distX * speed);
  ballY = ballY + (distY * speed);
  
  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";
  
  requestAnimationFrame(animate);
}
animate();

document.addEventListener("mousemove", function(event){
  mouseX = event.pageX;
  mouseY = event.pageY;
})

// $(document).ready(function () {
//     $("#page").hover(function () {
//         $("#background-video").trigger('play')
//     })
//     // document.getElementById("#background-video").autoplay;
//     // $("#background-video").trigger('play')
// })
