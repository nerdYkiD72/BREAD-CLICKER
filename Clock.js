const today = new Date();

function updateClock() { // Display the current time. Once called function will repeate every second.
  let date = new Date(); 
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();

  if(hh == 0){
      hh = 12;
  }
  if (hh > 12) {
    hh = hh - 12;
  }

  hh = (hh < 10) ? "0" + hh : hh;
  mm = (mm < 10) ? "0" + mm : mm;
  ss = (ss < 10) ? "0" + ss : ss;
  
  let time = hh + ":" + mm + ":" + ss;

  document.getElementById("clock").innerText = time; 
  getCurrentPeriod(date);

  let t = setTimeout(function(){ updateClock() }, 1000);
}



// TODO: I could make some more chaches to eleimnate needing to do a lot of this logic every second.
function getCurrentPeriod(dateNow) { // Checks what period the user is in based on the time and day. 
  var json = JSON.parse(localStorage[scheduleDataKey]);
  const dropDown = document.getElementById("schedule-select");
  var selectedSchedule = dropDown.options[dropDown.selectedIndex].value;
  var aLunch = document.getElementById("A-select").checked;


  // MANUALLY CHANGE TIME FOR DEBUGGING:
  dateNow.setHours(12);
  dateNow.setMinutes(30);


  
  if (selectedSchedule == "2hr Delay") {
    aLunch ? clockCycleThings(json, 2, dateNow, "a") : clockCycleThings(json, 2, dateNow, "b")

  } 
  else if (selectedSchedule == "1hr long Advisory") {
    clockCycleThings(json, 4, dateNow);

  } 
  else if (selectedSchedule == "1hr long Advisory") {
    aLunch ? clockCycleThings(json, 3, dateNow, "a") : clockCycleThings(json, 3, dateNow, "b")

  }
  else {                                  // TODO: check this for wednesday
    if (dateNow.getDay() != 3) {
      // aLunch ? clockCycleThings(json, 0, dateNow, "a") : clockCycleThings(json, 0, dateNow, "b");
      console.log("Its not wednesday today.");
      console.log(json[1]);
      // TODO: pretend its wednesday lol
      aLunch ? clockCycleThings(json, 1, dateNow, "a") : clockCycleThings(json, 1, dateNow, "b")
    } else {
      aLunch ? clockCycleThings(json, 1, dateNow, "a") : clockCycleThings(json, 1, dateNow, "b")
      console.log("Its wednesday.")
      
    }
  }
}


function clockCycleThings(json, dayNumber, dateNow, lunch="a") {
// TODO: Fix this L
  
console.log("Date now = " + dateNow);

  var daysSchedule = json[dayNumber];
  var i = 0;

  daysSchedule.classes.forEach(element => {
    i++;

    if (daysSchedule.name == "2hr Delay") {
      if (lunch == "a") {
        if (i == 2) { // Change 3rd period to lunch if A schedule
          element = daysSchedule.altClasses[0];
        }
        else if (i == 3) { // Change lunch to 3rd peridod if A schedule
          element = daysSchedule.altClasses[1];
        }
      }
    } else {
      if (lunch == "a") {
        if (i == 3) { // Change 3rd period to lunch if A schedule
          element = daysSchedule.altClasses[0];
        }
        else if (i == 4) { // Change lunch to 3rd peridod if A schedule
          element = daysSchedule.altClasses[1];
        }
      }
    }
    

    var startTime = dateObj(element.start);
    var endTime = dateObj(element.end);
    var open = dateNow < endTime && dateNow > startTime ? true : false; // compare

    

    if (open) {
      selectPeriod(element.name);
      document.getElementById("time-left").innerHTML =  getTimeLeft(endTime, dateNow);
    }
  });
}


/**
 * Finds the ammount of time left in a given period.
 * @param endTime The time that the current period ends.
 * @param dateNow The currect time. (Or other time to measure to)
 * @returns A string including the time left in the period.
 */
function getTimeLeft(endTime, dateNow) {
  // TODO: I need to find out what to do inbetween periods and after school (hide it?).

  var hrsLeft = endTime.getHours() - dateNow.getHours();
  var minsLeft = endTime.getMinutes() - dateNow.getMinutes();
  var timeLeft = new Date();
  var oneHrLeft = new Date(); oneHrLeft.setHours(1, 0, 0, 0);
  var oneMinLeft = new Date(); oneMinLeft.setHours(0, 1, 0, 0);
  timeLeft.setHours(hrsLeft, minsLeft, 0, 0);

  if (timeLeft.getHours() >= 1 && timeLeft.getMinutes() <= 1) {
    return `There is <mark class="yellow-marker">${timeLeft.getHours()}</mark> hour and <mark class="redTest">${timeLeft.getMinutes()}</mark> minute left in this period`;

  } 
  else if (timeLeft >= oneHrLeft && timeLeft.getMinutes() > 1) {
    return `There is <mark class="yellow-marker">${timeLeft.getHours()}</mark> hour and <mark class="redTest">${timeLeft.getMinutes()}</mark> minutes left in this period`;
  } 
  else if (timeLeft.getMinutes() > 1) {
    return `There are <mark class="yellow-marker">${timeLeft.getMinutes()}</mark> minutes left in this period`;

  } 
  else if (timeLeft.getMinutes() <= 1) {
    return `There is <mark class="yellow-marker">${timeLeft.getMinutes()}</mark> minute left in this period`;
  }
}


function selectPeriod(period) {   // Could be 1-5 and 'Lunch', 'Advisory' ...
  var dateNow = new Date();
  var timeElement = document.getElementById("prd" + period + "-time");
  var titleElement = document.getElementById("prd" + period + "-title");

  clearTableSelections("schedule-chart", "chart-selected");

  if (period >= 1 && period <= 5) {
    timeElement.classList.remove("chart-background");
    titleElement.classList.remove("chart-background");

    timeElement.classList.add("chart-selected");
    titleElement.classList.add("chart-selected");
  } else if (period == "Lunch" || period == "Advisory") {
    if (period == "Advisory" && dateNow != 3) {
      console.warn('You tried to select the period "Advisory" but advisory is not a period today.') // Test this
    } else {
      timeElement.classList.remove("chart-background");
      titleElement.classList.remove("chart-background");

      timeElement.classList.add("chart-selected");
      titleElement.classList.add("chart-selected");
    }
  } else {
    console.warn("Could not select a table row. The value of the given period may not be valid (out of range).")
  }
}


// Helper functions:


/**
 * Removes all ID's of the table elements to un select any periods
 * @param tableID The HTML element of a table.
 * @param idToRemove The specific ID you want to remove from each HTML element.
 */
function clearTableSelections(tableID, idToRemove) {
  var schdeuldTable = document.getElementById(tableID);
  // for (var i = 0, cell; cell = schdeuldTable.cells[i]; i++) {
  //   //iterate through cells
  //   //cells would be accessed using the "cell" variable assigned in the for loop
  //   console.log(cell)
  // }
  tableCells(schdeuldTable).forEach(element => {
    element.classList.remove(idToRemove);
    element.classList.add("chart-background");
  });
}


/**
 * Returns all the cells of a table as an array.
 * @param t The HTML element of a table.
 */
function tableCells(t){
  if(t.cells) return t.cells; // use internal routine when supported
  for(var a=[], r=t.rows, y=0, c, x; t=r[y++];){
     for(c=t.cells, x=0; t=c[x++]; a.push(t));
  } 
  return a;
}


/**
 * Parses a date(Ex. "9:00 AM") and returns a date.
 * @param d The string date to parse.
 */
function dateObj(d) {
  var parts = d.split(/:|\s/),
      date  = new Date();
  if (parts.pop().toLowerCase() == 'pm') parts[0] = (+parts[0]) + 12;
  date.setHours(+parts.shift());
  date.setMinutes(+parts.shift());
  return date;
}
