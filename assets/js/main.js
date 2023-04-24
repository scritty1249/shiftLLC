// Loading function
$(document).ready(function() {
    setTimeout(function(){
        $('body').addClass('loaded');
    }, 2000); // <-- Artificially make the page "load" to display loading animation in demo
 
});

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