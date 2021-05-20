var originalBG = $(".sabsolute").css("background");

$('.sabsolute').mousemove(function(e) {
    x = e.pageX - this.offsetLeft;
    y = e.pageY - this.offsetTop;
    xy = x + " " + y;
    bgWebKit = "-webkit-gradient(radial, " + xy + ", 0, " + xy + ", 400, from(rgba(255,255,255,0.18)), to(rgba(0, 0, 0, 0.5))), " + "rgba(0, 0, 0, 0)";
    // bgMoz = "-moz-radial-gradient(" + x + "px " + y + "px 45deg, circle, " + lightColor + " 0%, " + originalBG + " " + gradientSize + "px)";

    $(this)
        .css({background: bgWebKit})
        // .css({background: bgMoz});
    }).mouseleave(function() {
    $(this).css({
        background: originalBG
    });
});