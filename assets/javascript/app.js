  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAHJfMuyr5aF3IwiEj96RsOkkpPGLCPf8s",
    authDomain: "liz-ur-bootcamp-demo.firebaseapp.com",
    databaseURL: "https://liz-ur-bootcamp-demo.firebaseio.com",
    projectId: "liz-ur-bootcamp-demo",
    storageBucket: "liz-ur-bootcamp-demo.appspot.com",
    messagingSenderId: "1064241818851"
  };
  firebase.initializeApp(config);


// Create a variable to reference the database.
var database = firebase.database();

// Initial Values
var name = "";
var destination = "";
var time = "";
var frequency = "";

// var createRow = function(data) {
//     // Get reference to existing tbody element, create a new table row element
//     var tBody = $("tbody");
//     var tRow = $("<tr>");

//     // Methods run on jQuery selectors return the selector they we run on
//     // This is why we can create and save a reference to a td in the same statement we update its text
//     var titleTd = $("<td>").text(data.Title);
//     var yearTd = $("<td>").text(data.Year);
//     var actorsTd = $("<td>").text(data.Actors);
//     // Append the newly created table data to the table row
//     tRow.append(titleTd, yearTd, actorsTd);
//     // Append the table row to the table body
//     tBody.append(tRow);
//   }

// Capture Button Click
$("#add-schedule").on("click", function(event) {
  event.preventDefault();
  
  // Grabbed values from text-boxes
  name = $("#name-input").val().trim();
  destination = $("#destination-input").val().trim();
  time = $("#time-input").val().trim();
  frequency = $("#frequency-input").val().trim();

  // Code for "Setting values in the database"
  database.ref().push({
    name: name,
    destination: destination,
    time: time, 
    frequency: frequency,

  });

});

// Firebase watcher + initial loader HINT: .on("value")
database.ref().on("child_added", function(childSnapshot) {

  // Log everything that's coming out of snapshot
  console.log(childSnapshot.val());
  console.log(childSnapshot.val().name);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().time);
  console.log(childSnapshot.val().frequency);

  // Change the HTML to reflect
  $("#name-display").text(childSnapshot.val().name);
  $("#destination-display").text(childSnapshot.val().destination);
  $("#time-display").text(childSnapshot.val().time);
  $("#frequency-display").text(childSnapshot.val().frequency);

  // full list of items to the well
//   $("#full-member-list").append("<div class='well'><span class='member-name'> " + childSnapshot.val().name +
//   " </span><span class='member-email'> " + childSnapshot.val().email +
//   " </span><span class='member-age'> " + childSnapshot.val().age +
//   " </span><span class='member-comment'> " + childSnapshot.val().comment + " </span></div>");

// also see Train Predictions Activity #21

  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});
