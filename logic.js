$(document).ready(function() {
    var now = moment();
    var currentHour = now.hour();
    console.log(currentHour);
    var hour = $(".container").find("textarea");
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

    function storeTextarea() {
        var input = $($(this).parent().children("textarea"));
        var newName = $($(this).parent().children("textarea")).name;
        var newInput = [{
            "name": newName,
            "saved": input
        }];

        var notes = JSON.parse(localStorage.getItem("notes"));

        if (notes == null) {
            notes = [newInput];
            notes.setItem("notes", JSON.stringify(notes));
        } else {
            notes.push(newInput);
            localStorage.setItem("notes", JSON.stringify(notes));
        }

    }

    function display() {
        $("textarea").empty();
        $(this).parent.children("textarea").text()
    }

    $(".saveBtn").on("click", function() {
        storeTextarea();

    })
    $(".container").on("load", function() {
        display();
    })


});