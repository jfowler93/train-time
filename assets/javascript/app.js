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

    var trainName = childSnapshot.val().Name;
    var newDestination = childSnapshot.val().Destination;
    var trainTime = childSnapshot.val().Time;
    var trainFrequency = childSnapshot.val().Frequency;

    console.log(trainName);
    console.log(newDestination);
    console.log(trainTime);
    console.log(trainFrequency);

    
    var trainTimeConverted = moment(trainTime, "HH:mm");
    console.log(trainTimeConverted);

    // get current time
    var currentTime = moment().format("HH:mm");
    console.log("current time: " + currentTime);

    var timeDiff = moment().diff(moment(trainTimeConverted), "minutes");
    console.log(trainTime);
    console.log(timeDiff);

    // Store remainder of time in a variable
    var timeRemainder = timeDiff % trainFrequency;
    console.log(timeRemainder);

    // log minutes left
    var minutesLeft = trainFrequency - timeRemainder;
    console.log(minutesLeft);

    
    var nextTrain = moment().add(minutesLeft, "minutes").format("h:mm");
    console.log(timeRemainder);

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(newDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(nextTrain),
        $("<td>").text(minutesLeft),
        
      );

      $("#train-table > tbody").append(newRow);
})