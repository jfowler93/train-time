// firebase script
var config = {
    apiKey: "AIzaSyAIUDKGXOK6cyUl1xZcs-YCXoHgtyfAYQQ",
    authDomain: "traintime-ee8e3.firebaseapp.com",
    databaseURL: "https://traintime-ee8e3.firebaseio.com",
    projectId: "traintime-ee8e3",
    storageBucket: "",
    messagingSenderId: "824053849151",
    appId: "1:824053849151:web:a1ccf9eb147b7db2c0ac8a"
};
// Initialize Firebase
firebase.initializeApp(config);

//declare database variable globally
var database = firebase.database();

//create on click for submit button
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    //create variables for user train info
    var trainName = $("#train-name-input").val().trim();
    var newDestination = $("#destination-input").val().trim();
    var trainTime = $("#train-time-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    //new temp object for holding train info

    var newTrain = {
        Name: trainName,
        Destination: newDestination,
        Time: trainTime,
        Frequency: trainFrequency
    };

    database.ref().push(newTrain);

    //console log new info
    console.log(newTrain.Name);
    console.log(newTrain.Destination);
    console.log(newTrain.Time);
    console.log(newTrain.Frequency);

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#train-time-input").val("");
    $("#frequency-input").val("");

});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var newDestination = childSnapshot.val().Destination;
    var trainTime = childSnapshot.val().Time;
    var trainFrequency = childSnapshot.val().Frequency;

    console.log(trainName);
    console.log(newDestination);
    console.log(trainTime);
    console.log(trainFrequency);

    var trainTimePretty = moment.unix(trainTime).format("h:mm a");

     // Assumptions
    var tFrequency = 3;

    // Time is 3:30 AM
    var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(newDestination),
        $("<td>").text(trainTimePretty),
        $("<td>").text(trainFrequency),
        $("<td>").text(nextTrain),
      );

      $("#train-table > tbody").append(newRow);
})