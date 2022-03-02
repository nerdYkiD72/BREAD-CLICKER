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
  getCurrentPeriod();

  let t = setTimeout(function(){ updateClock() }, 1000);
}

function getCurrentPeriod() { // Checks what period the user is in based on the time and day.
// TODO: This gets called every second... Should probably load the data from schedules.json once and then 
//       just save it to use later. 

  var dateNow = new Date(); 
  // dateNow.setHours(11);
  // dateNow.setMinutes(40);


  $.getJSON("./assets/schedules/schedules.json", function(json) { 
    var dropDown = document.getElementById("schedule-select");
    var selectedSchedule = dropDown.options[dropDown.selectedIndex].value;
    if (selectedSchedule == "Weekday 2hr Delay - B Lunch") {
      var daysSchedule = json[2].classes;
      daysSchedule.forEach(element => {
        i++;
        var startTime = dateObj(element.start);
        var endTime = dateObj(element.end);
        var open = dateNow < endTime && dateNow > startTime ? true : false; // compare

        if (open) {
          selectPeriod(element.name);
          document.getElementById("time-left").innerHTML =  getTimeLeft(endTime, dateNow);
        }
      });
    } else if (selectedSchedule == "Weekday 2hr Delay - A Lunch") {
      var daysSchedule = json[3].classes;
      daysSchedule.forEach(element => {
        i++;
        var startTime = dateObj(element.start);
        var endTime = dateObj(element.end);
        var open = dateNow < endTime && dateNow > startTime ? true : false; // compare

        if (open) {
          selectPeriod(element.name);
          document.getElementById("time-left").innerHTML =  getTimeLeft(endTime, dateNow);
        }
      });

    } else if (selectedSchedule == "Wed - 1hr long Advisory") {
      var daysSchedule = json[4].classes;
      daysSchedule.forEach(element => {
        i++;
        var startTime = dateObj(element.start);
        var endTime = dateObj(element.end);
        var open = dateNow < endTime && dateNow > startTime ? true : false; // compare

        if (open) {
          selectPeriod(element.name);
          document.getElementById("time-left").innerHTML =  getTimeLeft(endTime, dateNow);
        }
      });
    } else {

// TODO: check this for wednesday
      if (dateNow != 3) {
        var daysSchedule = json[0].classes; // 0 = normal day, 1 = wednesday 
    
        var i = 0;
        daysSchedule.forEach(element => {
          i++;
          var startTime = dateObj(element.start);
          var endTime = dateObj(element.end);
          var open = dateNow < endTime && dateNow > startTime ? true : false; // compare
  
          if (open) {
            selectPeriod(element.name);
            document.getElementById("time-left").innerHTML =  getTimeLeft(endTime, dateNow);
          }
        });
      }
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
    return `There is <mark class="redTest">${timeLeft.getHours()}</mark> hour and <mark class="redTest">${timeLeft.getMinutes()}</mark> minute left in this period`;

  } 
  else if (timeLeft >= oneHrLeft && timeLeft.getMinutes() > 1) {
    return `There is <mark class="redTest">${timeLeft.getHours()}</mark> hour and <mark class="redTest">${timeLeft.getMinutes()}</mark> minutes left in this period`;
  } 
  else if (timeLeft.getMinutes() > 1) {
    return `There are <mark class="redTest">${timeLeft.getMinutes()}</mark> minutes left in this period`;

  } 
  else if (timeLeft.getMinutes() <= 1) {
    return `There is <mark class="redTest">${timeLeft.getMinutes()}</mark> minute left in this period`;
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
