var blockHour = 9;
var hourSuffix = ":00am";

var savedPlans = [];
var savedPlansName = "Saved Plans";

// displayDate - Displays the date and the current time of day at the top of the screen
function displayDate(format) {
  var date = moment().format(format);

  $("#current-day").text(date);
}

// addHoursBlocks - Generates and appends our main content onto the page, according to the number
// iterations specified
function addHourBlocks(iterations) {
  var currentTime = getCurrentHour("LT");

  for (var i = 0; i < iterations; i++) {
    var textTime = blockHour + hourSuffix;

    planContainer = $("<div>").addClass("row py-1");

    timeText = $("<h6>").addClass("text-center").text(textTime);

    timeDiv = $("<div>")
      .addClass("col-2 py-3 time-block align-middle")
      .append(timeText);

    textDiv = $("<textarea>")
      .addClass("col-8 py-3 overflow-auto")
      .text("")
      .attr("id", textTime);
    setBackgroundColor(textDiv, currentTime, textTime);

    saveDiv = $("<div>").addClass(
      "col-1 py-3 save unsaved save-container border border-primary"
    );

    planContainer.append(timeDiv, textDiv, saveDiv);

    $("#planner").append(planContainer);

    addBlockHour();
  }
}

// setBackgroundColor - Sets PlanContainer colors according to current time
function setBackgroundColor(div, currentTime, textTime) {
  var currentTime = currentTime.split("");
  var currentTimeText = textTime.split("");

  // check if PM or AM
  if (
    currentTime[currentTime.length - 2] !==
    currentTimeText[currentTimeText.length - 2]
  ) {
    if (
      currentTime[currentTime.length - 2] >
      currentTimeText[currentTimeText.length - 2]
    ) {
      //grey out
      div.addClass("background-secondary");
    } else {
      //show
      div.addClass("background-primary");
    }
  } else {
    var hourCurrent = parseHour(currentTime);
    var hourText = parseHour(currentTimeText);

    if (parseInt(hourCurrent) > parseInt(hourText)) {
      div.addClass("background-secondary"); // grey out (passed time)
    } else if (parseInt(hourCurrent) < parseInt(hourText)) {
      if (parseInt(hourText) === 12) {
        div.addClass("background-secondary");
      } else {
        div.addClass("background-primary");
      }
    } else {
      div.addClass("background-warning");
    }
  }
}

// addBlockHour - Increments the hours displayed in the hours blocks
function addBlockHour() {
  if (blockHour === 12) {
    blockHour = 1;
  } else if (blockHour === 11) {
    hourSuffix = ":00pm";
    blockHour++;
  } else {
    blockHour++;
  }
}

// getCurrentHour - Provides a format of the current time to use in our setBackgroundColor function
function getCurrentHour(format) {
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

// parseHour - Function for us to call to return the first number of the time, excluding the ':00am/pm'
function parseHour(targetTime) {
  var i = 0;
  var targetHour = "";

  while (targetTime[i] !== ":" || i > 100) {
    targetHour += targetTime[i];
    i++;
  }

  return targetHour;
}

// saveBlocks - saves data from user input into localStorage
function saveBlocks(userText, timeStr) {
  newBlock = {
    id: timeStr,
    input: userText.trim(),
  };

  for (var i = 0; i < savedPlans.length; i++) {
    if (savedPlans[i].id === newBlock.id) {
      savedPlans.splice(i, 1);

      localStorage.setItem(savedPlansName, JSON.stringify(savedPlans));

      return null;
    }
  }

  savedPlans.push(newBlock);

  localStorage.setItem(savedPlansName, JSON.stringify(savedPlans));
}

// getStoredBlocks - Check if our items exist/get and parse items
function getStoredBlocks() {
  if (localStorage.getItem(savedPlansName)) {
    savedPlans = JSON.parse(localStorage.getItem(savedPlansName));

    savedPlans.forEach((savedItem) => {
      itemID = "#" + savedItem.id;

      planContainer = $(document.getElementById(savedItem.id));

      planContainer.val(savedItem.input);

      saveContainer = $(planContainer.parent().children()[2]);

      saveContainer.toggleClass("unsaved");
    });
  }
}

addHourBlocks(9);
displayDate("LLLL");
getStoredBlocks();

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
