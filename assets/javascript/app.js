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

// Set initial values to empty strings
var name = "";
var destination = "";
var time = "";
var frequency = "";
var tMinutesTillTrain = "";
var nextTrain = "";
var nextTrainConverted;

function createRow() {
  var tBody = $("tbody");
  var tRow = $("<tr>");
  var nameTd = $("<td>").text(name);
  var destinationTd = $("<td>").text(destination);
  var frequencyTd = $("<td>").text(frequency);
  var nextTrainTd = $("<td>").text(moment(nextTrain).format("hh:mm a"));
  var minutesAwayTd = $("<td>").text(tMinutesTillTrain);
  
  // Append the newly created table data to the table row
  tRow.append(nameTd, destinationTd, frequencyTd, nextTrainTd, minutesAwayTd);
  // Append the table row to the table body
  tBody.append(tRow);
}

// Capture Button Click
$("#add-schedule").on("click", function(event) {
  event.preventDefault();

  name = $("#name-input").val().trim();
  destination = $("#destination-input").val().trim();
  time = $("#time-input").val().trim();
  frequency = $("#frequency-input").val().trim();

  var timeConverted = moment(time, "HH:mm").subtract(1, "years");
  console.log(timeConverted);

  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  var diffTime = moment().diff(moment(timeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  tMinutesTillTrain = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  
  nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
  createRow();

  // Set values in the database"
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
  // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
