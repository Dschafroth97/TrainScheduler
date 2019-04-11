// Adding Firebase to logic file
var config = {
    apiKey: "AIzaSyAXNC4ggBVOc3Kmu-3b6ZMdY6gbLWp_tuY",
    authDomain: "trainscheduler-c5bd0.firebaseapp.com",
    databaseURL: "https://trainscheduler-c5bd0.firebaseio.com",
    projectId: "trainscheduler-c5bd0",
    storageBucket: "trainscheduler-c5bd0.appspot.com",
    messagingSenderId: "675421657001"
};

firebase.initializeApp(config);

// setting firebase database to more easily usable variable
var database = firebase.database();

// when user clicks submit button
$("#submit").on("click", function (event) {

    // prevents page from refreshing when submit button is pressed
    event.preventDefault();

    //  pulling all values from html input form
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var startTime = $("#startTime").val().trim();
    var frequency = $("#frequency").val().trim();

    // setting all train info into object
    var newTrain = {
        name: trainName,
        dest: destination,
        time: startTime,
        freq: frequency
    }

    // Testing
    // console.log(newTrain.name);
    // console.log(newTrain.dest);
    // console.log(newTrain.time);
    // console.log(newTrain.freq);

    // pushes newTrain object to database
    database.ref().push(newTrain);

    // reset user input fields
    $("#trainName").val("");
    $("#destination").val("");
    $("#startTime").val("");
    $("#frequency").val("");

});

// pulls info from database 
database.ref().on("child_added", function (childSnapshot) {

    // Console logs to check data being pulled
    console.log(childSnapshot.val());

    // Create variables to hold info
    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;
    var start = childSnapshot.val().time;
    var frequency = childSnapshot.val().freq;

    // Math conversions
    var firstTime = moment(start, "HH:mm").subtract(1, "years");
    var remainder = moment().diff(moment(firstTime), "minutes") % frequency;
    var timeRemaining = frequency - remainder;
    var nextTrain = moment().add(timeRemaining, "minutes");
    var nextTrainCon = moment(nextTrain).format("HH:mm");

    // Testing
    // console.log(name);
    // console.log(destination);
    // console.log(start);
    // console.log(frequency);
    // console.log(current);
    // console.log(nextTrainCon);
    // console.log(timeRemaining);

    // Creating table row and data
    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrainCon),
        $("<td>").text(timeRemaining),
    );

    // Appending onto empty tbody
    $("#tbody").append(newRow);

});

// Function to display current time
function currentTime() {

    // Storing current time in variable, formatting and adding that text to HTML page
    var timeNow = moment();
    var displayTime = moment(timeNow).format("HH:mm");
    $("#currentTime").text(displayTime);
};

// Calling function and refresh rate
currentTime();
window.setInterval(currentTime, 5000);