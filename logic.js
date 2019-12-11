$(document).ready(function() {
    var now = moment();
    var currentHour = now.hour();
    var hour = $(".container").find("textarea");

    var count = setInterval(timeDispaly, 1000);

    function timeDispaly() {
        var currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
        $("#currentDay").text(currentDate);
    }


    for (var i = 0; i < 9; i++) {
        var tName = parseInt(hour[i].name);
        var textTag = $(hour[i]);

        if (currentHour == tName) {
            textTag.addClass("present");
        } //
        else if (currentHour > tName) {
            textTag.addClass("past");
            textTag.attr("readonly", true);
        } //
        else if (currentHour < tName) {
            textTag.addClass("future");
        }

    };


    function display() {
        $("textarea").empty();
        var display = JSON.parse(localStorage.getItem("notes"));

        var timeBar = $(".row").children("textarea");

        if (display == null) {

        } else {
            for (var i = 0; i < display.length; i++) {
                var noteElement = display[i][0];

                for (var j = 0; j < timeBar.length; j++) {

                    if (noteElement.name == $(timeBar[j]).attr("name")) {
                        $(timeBar[j]).text(noteElement.notes);
                    }
                }

            }
        }


    }

    $(".saveBtn").on("click", function() {
        var currentTag = $(this).prev();
        var input = currentTag.val();

        var lineName = currentTag.attr("name");

        var newInput = [{
            "name": lineName,
            "notes": input
        }];

        var notes = JSON.parse(localStorage.getItem("notes"));

        if (notes == null) {
            notes = [newInput];
            localStorage.setItem("notes", JSON.stringify(notes));
        } else {
            notes.push(newInput);
            localStorage.setItem("notes", JSON.stringify(notes));
        }
    });

    $(window).on("load", function() {
        display();
    });


});