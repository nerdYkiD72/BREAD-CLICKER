const niceButton = document.getElementById("nice_hehe");
const startDate = new Date();
let number = 0;
var humanClicks = 0;
var cps = 0;


function updateCPS() {
  document.getElementById("cps-counter").innerHTML = `${getCPS(false)} Clicks per Second`;
  let a = setTimeout(function(){ updateCPS(); }, 100);
}
updateCPS();

// Run whenver bread is clicked:
function myFunction() {

  // Update cps when bread is clicked. This will actaully be what counts the clicks.
  document.getElementById("cps-counter").innerHTML = `${getCPS(true)} Clicks per Second`;
  

  // Update the visual counter of total clicks
  document.getElementById('counter2').innerHTML = number;



  number += 1;
  humanClicks += 1;
  // console.log(`The human has click the bread ${humanClicks} times`);
  // if (number == 20) {
  //   oneCPS();
  // }
};






function oneCPS() {
  number += 1;
  document.getElementById('counter').innerHTML = "The counter is at: ";
  document.getElementById('counter2').innerHTML = number;

  let t = setTimeout(function(){ oneCPS(); }, 1000);
}

function makeitnice() {
    number = 69;
    document.getElementById('counter').innerHTML = "The counter is at: ";
    document.getElementById('counter2').innerHTML = 69;
};


// Disable image dragging on the page
const img = document.querySelector('img')
img.ondragstart = () => {
  return false;
};



$.getJSON("./assets/schedules/schedules.json", function(json) {  // Read in data from schedules.json
// TODO: add the ability to add custome schedules (Things like snow day and 60 min ADV.)

  var dateNow = new Date();

// 3 = Wednesday, 1-5 = Weekdays, 6 & 0 = Saturday & Sunday
  if (dateNow.getDay() != 3) {
    fillTable(json[0].classes); 
  } else if (dateNow.getDay() == 3) {
    fillTable(json[1].classes);
  }
 });

/**
 * Goes through all data given by json data and puts it in a table.
 * @param daysSchedule The json data of the current days schedule. 
 */
function fillTable(daysSchedule) {
  var i = 0;
  var schdeuldTable = document.getElementById("schedule-chart");

  daysSchedule.forEach(element => {
    i++;

    // Create new cells.
    var newRow = schdeuldTable.insertRow(i);
    var cell_Left = newRow.insertCell(0);
    var cell_Right = newRow.insertCell(1);

    // Give those cells artibutes to find them later and style them properly.
    cell_Left.setAttribute("id", "prd" + element.name + "-title");
    cell_Right.setAttribute("id", "prd" + element.name + "-time");
    cell_Left.classList.add("chart-background");
    cell_Right.classList.add("chart-background");

    // Fill cells with contents.
    cell_Left.innerHTML = element.name;
    cell_Right.innerHTML = element.start + " - " + element.end;
  });

  // Start updateing the clock once the table has loaded.
  updateClock();

}
