var originalBG = $(".sabsolute").css("background");
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

document.getElementsByClassName("sabsolute")[0].addEventListener("mousemove", function(event){
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

document.addEventListener("scroll", function () {
  if($(".slide-menu").css("maxWidth") == "100%") {
    $(".slide-menu").css("maxWidth", "0%");
    $(".slide-menu").css("opacity", "0");
  }
});
  
