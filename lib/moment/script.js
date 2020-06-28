var blockHour = 9;
var hourSuffix = ":00am";

var SavedPlans = [];
var SavedPlansName = "Saved Plans";

function DisplayDate(format) {
  var date = moment().format(format);

  $("#current-day").text(date);
}

function addHourBlocks(iterations) {
  var CurrentTime = GetCurrentHour("LT");
  console.log(CurrentTime);

  for (var i = 0; i < iterations; i++) {
    var textTime = blockHour + hourSuffix;

    $PlanContainer = $("<div>").addClass("row py-1");

    $TimeText = $("<h6>").addClass("text-center").text(textTime);
    $TimeDiv = $("<div>")
      .addClass("col-2 py-3 time-block align-middle")
      .append($TimeText);

    $TextDiv = $("<textarea>")
      .addClass("col-8 py-3 overflow-auto")
      .text("")
      .attr("id", textTime);
    SetBackgroundColor($TextDiv, CurrentTime, textTime);

    $SaveDiv = $("<div>").addClass(
      "col-1 py-3 save unsaved save-container border border-primary"
    );

    $PlanContainer.append($TimeDiv, $TextDiv, $SaveDiv);

    $("#planner").append($PlanContainer);

    addblockHour();
  }
}

// SetBackgroundColor - Sets PlanContainer colors according to current time
function SetBackgroundColor($div, currentTime, textTime) {
  var CurrentTime = currentTime.split("");
  var CurrentTimeText = textTime.split("");

  console.log(CurrentTime);
  console.log(CurrentTimeText);

  console.log(CurrentTime[CurrentTime.length - 2]);
  console.log(CurrentTimeText[CurrentTimeText.length - 2]);

  // check if PM or AM
  if (
    CurrentTime[CurrentTime.length - 2] !==
    CurrentTimeText[CurrentTimeText.length - 2]
  ) {
    if (
      CurrentTime[CurrentTime.length - 2] >
      CurrentTimeText[CurrentTimeText.length - 2]
    ) {
      //grey out
      $div.addClass("background-secondary");
    } else {
      //show
      $div.addClass("background-primary");
    }
  } else {
    var HourCurrent = parseHour(CurrentTime);
    var HourText = parseHour(CurrentTimeText);

    console.log(HourCurrent);
    console.log(HourText);

    if (parseInt(HourCurrent) > parseInt(HourText)) {
      $div.addClass("background-secondary"); // grey out (passed time)
    } else if (parseInt(HourCurrent) < parseInt(HourText)) {
      if (parseInt(HourText) === 12) {
        $div.addClass("background-secondary");
      } else {
        $div.addClass("background-primary");
      }
    } else {
      $div.addClass("background-warning");
    }
  }
}

function addblockHour() {
  if (blockHour === 12) {
    blockHour = 1;
  } else if (blockHour === 11) {
    hourSuffix = ":00pm";
    blockHour++;
  } else {
    blockHour++;
  }
}

function GetCurrentHour(format) {
  var time = moment().format(format).toLowerCase();

  var suffix = "";
  time = time.split("");
  var hour = parseHour(time);

  if (time[time.length - 2] === "p") {
    suffix = ":00pm";
  } else {
    suffix = ":00am";
  }
  return hour + suffix;
}

function parseHour(targetTime) {
  var i = 0;
  var targetHour = "";

  while (targetTime[i] !== ":" || i > 100) {
    targetHour += targetTime[i];
    i++;
  }

  return targetHour;
}

function saveBlocks(userText, timeStr) {
  newBlock = {
    id: timeStr,
    input: userText.trim(),
  };

  for (var i = 0; i < SavedPlans.length; i++) {
    if (SavedPlans[i].id === newBlock.id) {
      SavedPlans.splice(i, 1);

      localStorage.setItem(SavedPlansName, JSON.stringify(SavedPlans));

      return null;
    }
  }

  SavedPlans.push(newBlock);

  localStorage.setItem(SavedPlansName, JSON.stringify(SavedPlans));
}

function GetStoredBlocks() {
  // check if our items exist
  if (localStorage.getItem(SavedPlansName)) {
    // get and parse items
    SavedPlans = JSON.parse(localStorage.getItem(SavedPlansName));

    SavedPlans.forEach((SavedItem) => {
      itemID = "#" + SavedItem.id;

      $PlanContainer = $(document.getElementById(SavedItem.id));

      $PlanContainer.val(SavedItem.input);

      $SaveContainer = $($PlanContainer.parent().children()[2]);

      $SaveContainer.toggleClass("unsaved");
    });
  }
}

addHourBlocks(9);
DisplayDate("LLLL");
GetStoredBlocks();

$(".save").click(function () {
  // toggle saved class
  $(this).toggleClass("unsaved");

  // getting the plan text from this parents children
  $PlanText = $($(this).parent().children()[1]);

  // get/set plan and time
  plan = $PlanText.val();
  time = $PlanText.attr("id");

  // update our blocks
  saveBlocks(plan, time);
});
