// TODO: course varification should be done on server, this function to
//       check valid course data tags only exists FOR TESTING AND PREVIEW PURPOSES
const courses = {1: "1 Hour Class", 2: "2 Hour Class", 3: "3 Class Bundle"};
const isValidItem = function(item) {
    if (item.data("courseId") && item.data("courseId") in courses) {
        return item.data("courseId");
    }
    return false;
}
// Placeholder function for adding items to cart
const addToCart = function(item) {
    // TODO: Have it actually save to a cart
    let courseId = isValidItem(item);
    if(courseId) {
        alert("400 OK: " + courses[courseId] + "\ncourseId: " + courseId);
    } else {
        alter("404 ERROR: Invalid courseId\n" + item.courseId);
    }
}
// Setting up buttons
$(document).ready(function() {$('.button-add').click(function() {addToCart($(this))});});