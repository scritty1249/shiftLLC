// Loading function
$(document).ready(function() {
    setTimeout(function(){
        $('body').addClass('loaded');
    }, 3000); // <-- Artificially make the page "load" for 3000ms to display loading animation in demo
 
});

// Navigation bar
/* Toggle between adding and removing the "responsive" class to the navbar when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("navbar");
    if (x.className === "navbar") {
      x.className += " responsive";
    } else {
      x.className = "navbar";
    }
  }