// Navigation bar
/* Toggle between adding and removing the "responsive" class to the navbar when the user clicks on the icon */
function expandNavMenu() {
    var navbar = document.getElementById("navbar");
    if (navbar.className === "navbar") {
        navbar.className += " responsive";
    } else {
        navbar.className = "navbar";
    }
}

// Carousel
Carousel = {
    $first_slide: null,
    $last_slide: null,
    slide_interval: null,
    carousel_rotate_interval: NaN,
    transition_duration: 2000,
    updateSlides: function () {
        this.$first_slide = $("#carousel").find(".slide:first");
        this.$last_slide = $("#carousel").find(".slide:last");
        console.log(this);
        $("#carousel > #slide-buttons")
            .find("button")
            .css({
                "-webkit-transform": "scale(" + 1 + ")",
                "-moz-transform": "scale(" + 1 + ")",
                "-ms-transform": "scale(" + 1 + ")",
                "-o-transform": "scale(" + 1 + ")",
                transform: "scale(" + 1 + ")",
            });
        $("#carousel > #slide-buttons")
            .find("button")
            .eq(parseInt(this.$first_slide.data("slide")) - 1)
            .css({
                "-webkit-transform": "scale(" + 1.5 + ")",
                "-moz-transform": "scale(" + 1.5 + ")",
                "-ms-transform": "scale(" + 1.5 + ")",
                "-o-transform": "scale(" + 1.5 + ")",
                transform: "scale(" + 1.5 + ")",
            });
    },
    rotateSlides: function () {
        this.$first_slide = $("#carousel").find(".slide:first");
        this.$last_slide = $("#carousel").find(".slide:last");
        this.$first_slide.data("animation", 1);
        this.$first_slide.animate(
            { marginLeft: -this.$first_slide.width() },
            this.transition_duration,
            () => {
                this.$last_slide.after(this.$first_slide);
                this.$first_slide.css({ marginLeft: 0 });
                this.$first_slide = $("#carousel").find(".slide:first");
                this.$last_slide = $("#carousel").find(".slide:last");
                this.$first_slide.removeData("animation");
                $("#carousel > #slide-buttons")
                    .find("button")
                    .css({
                        "-webkit-transform": "scale(" + 1 + ")",
                        "-moz-transform": "scale(" + 1 + ")",
                        "-ms-transform": "scale(" + 1 + ")",
                        "-o-transform": "scale(" + 1 + ")",
                        transform: "scale(" + 1 + ")",
                    });
                $("#carousel > #slide-buttons")
                    .find("button")
                    .eq(parseInt(this.$first_slide.data("slide")) - 1)
                    .css({
                        "-webkit-transform": "scale(" + 1.5 + ")",
                        "-moz-transform": "scale(" + 1.5 + ")",
                        "-ms-transform": "scale(" + 1.5 + ")",
                        "-o-transform": "scale(" + 1.5 + ")",
                        transform: "scale(" + 1.5 + ")",
                    });
            }
        );
    },
    stopInterval: function () {
        window.clearInterval(this.slide_interval);
        this.updateSlides();
    },
    startInterval: function () {
        this.updateSlides();
        setTimeout(function () {}, 500); // Extra pause upon restarting the loop
        this.slide_interval = window.setInterval(
            this.rotateSlides,
            this.carousel_rotate_interval
        );
    },
    jumpToSlide: function (idx) {
        if (!this.$first_slide.data("animation")) {
            window.clearInterval(this.slide_interval);
            while (
                $("#carousel").find(".slide").eq(1).data("slide") !=
                idx + 1
            ) {
                this.$last_slide.after(this.$first_slide);
                this.$first_slide = $("#carousel").find(".slide:first");
                this.$last_slide = $("#carousel").find(".slide:last");
            }
            this.$first_slide.data("animation", 1);
            this.$first_slide.animate(
                { marginLeft: -this.$first_slide.width() * 2 },
                this.transition_duration,
                () => {
                    this.$last_slide.after(this.$first_slide);
                    this.$first_slide.css({ marginLeft: 0 });
                    this.$first_slide.removeData("animation");
                    this.startInterval();
                }
            );
        }
    },
    activate: function (interval) {
        if (this.$first_slide === null) {
            $("#carousel")
                .find(".slide")
                .each(function () {
                    $(this).css(
                        "background-image",
                        "url(" + $(this).data("image-slide") + ")"
                    );
                    $(this).data("image-slide", "");
                });
            this.carousel_rotate_interval = interval;
            this.startInterval();
            this.updateSlides();
        }
        $("#carousel > #slide-buttons")
            .find("button")
            .each((idx, e) => {
                $(e).on("click touchstart", () => {
                    this.jumpToSlide(idx);
                });
            });
    },
};

// Loading function
$(document).ready(function () {
    setTimeout(function () {
        // Reveal the page
        $("body").addClass("loaded");
        // Load carousel
        if ($("#carousel").length > 0) {
            Carousel.activate(15 * 1000);
        }
    }, 2000); // <-- Artificially make the page "load" to display loading animation in demo
});
