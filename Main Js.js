const niceButton = document.getElementById("nice_hehe");
const startDate = new Date();
const scheduleDataKey = "SCHEDULE_DATA";
const counterDOM = document.getElementById('counter2');
let number = 0;
var humanClicks = 0;
var cps = 0;
var addedSclicesPerClick = 0;


function updateCPS() {
  document.getElementById("cps-counter").innerHTML = `${getCPS(false)} Clicks per Second`;
  let a = setTimeout(function(){ updateCPS(); }, 100);
}
updateCPS();

// Run whenver bread is clicked:
function myFunction() {
  number = number + 1 + addedSclicesPerClick;
  humanClicks += 1;

  // Update cps when bread is clicked. This will actaully be what counts the clicks.
  document.getElementById("cps-counter").innerHTML = `${getCPS(true)} Clicks per Second`;
  
  updateCounter();
  // Update the visual counter of total clicks


  // Easter egg for my boi will
  // if (number == 100000) {
  //   users.willus.getBitcoinWallet.addBitCoin(0.00005);
  // }



  
  // console.log(`The human has click the bread ${humanClicks} times`);
  // if (number == 20) {
  //   oneCPS();
  // }
};


function saveButton() {
  console.log("Saving data...");
  localStorage.setItem("breadClicked", number);
}

function loadButton() {
  console.log("Loading data...");
  number = parseInt(localStorage.getItem("breadClicked"));
  document.getElementById('counter2').innerHTML = number;



  // var storedData = localStorage["upgradeData"];
  
  //   if (storedData) { // We have a cache
  //     upgradeData = JSON.parse(storedData);
  
  //     if (JSON.stringify(scheduleData) == JSON.stringify(json)) {
  //       console.log("Continuing with cache of schedules.");
  //     } else {
  //       console.log("Updating cache of schedules.");
  //       localStorage[scheduleDataKey] = JSON.stringify(json);
  //     }
  //   } else {
  
  //     console.log("No cache of schedules, creating one.");
  //     localStorage[scheduleDataKey] = JSON.stringify(json);
  //   }
}

function scheduleDropDownLoad() {
}




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


function purchaseItem(item) {
  if (item == "getGud") {
    number = number - 10;
    localStorage.setItem("breadClicked", number);
    document.getElementById('counter2').innerHTML = number;

  } else if (item == "plasticButterKnife") { // Purchase butter knife
    if (number >= 100) {
      number = number - 100;
      localStorage.setItem("breadClicked", number);
      document.getElementById('counter2').innerHTML = number;

      addedSclicesPerClick += 0.25
    }
  }
}

function updateCounter() {
  counterDOM.innerHTML = Math.trunc(number);
}



// Disable image dragging on the page
const img = document.querySelector('img')
img.ondragstart = () => {
  return false;
};



window.onload = loadSchedule();
/**
 * Loads in JSON data.
 * Checks for cache in Local Storage.
 * If cache is updated, continue, but if not, update cache.
 * Reference cache with Local Storage.
 */
function loadSchedule() {
  $.getJSON("./assets/schedules/schedules.json", function(json) { // Get the latest data
    var storedData = localStorage["SCHEDULE_DATA"];
  
    if (storedData) { // We have a cache
      scheduleData = JSON.parse(storedData);
  
      if (JSON.stringify(scheduleData) == JSON.stringify(json)) {
        console.log("Continuing with cache of schedules.");
      } else {
        console.log("Updating cache of schedules.");
        localStorage[scheduleDataKey] = JSON.stringify(json);
      }
    } else {
  
      console.log("No cache of schedules, creating one.");
      localStorage[scheduleDataKey] = JSON.stringify(json);
    }
  });    // TODO: add the ability to add custome schedules (Things like snow day and 60 min ADV.)
  
  // Once we know the cache is right, serve its contents to the user.
  serveData();
}

/**
 * Displays the data from cached JSON in the schedule table.
 * Only logic here for now is determining what schedule to show for either Wed. or other weekdays.
 */
// TODO: Make it so you can remember what the last schedule was.
function serveData() {
  var dateNow = new Date();
  var json = JSON.parse(localStorage[scheduleDataKey]);
  
  // 3 = Wednesday, 1-5 = Weekdays, 6 & 0 = Saturday & Sunday
  if (dateNow.getDay() == 3) {
    fillTable(json[1].classes);
  } else { fillTable(json[0].classes); }
  
  var scheduleSelect = document.getElementById("schedule-select");
  var i = 0;

  // Create and fill elements for times:
  json.forEach(element => {
    if (i > 1) {
      var option = document.createElement("option");
      option.innerHTML = element.name;
      scheduleSelect.options.add(option);
    }
    i++;
  });

  // Now that the schedule is loaded start updating the clock.
  updateClock();
}


function scheduleSelectChange() { // Add more scheduels
  var json = JSON.parse(localStorage[scheduleDataKey]);
  var dropDown = document.getElementById("schedule-select");
  var selectedSchedule = dropDown.options[dropDown.selectedIndex].value;

  console.log(selectedSchedule);
  if (selectedSchedule == "Weekday 2hr Delay - B Lunch") {
    clearTable();
    fillTable(json[2].classes);
  } else if (selectedSchedule == "Weekday 2hr Delay - A Lunch") {
    clearTable();
    fillTable(json[3].classes);
  } else if (selectedSchedule == "Wed - 1hr long Advisory") {
    clearTable();
    fillTable(json[4].classes);
  }
}


function clearTable() {
  var scheduleTable = document.getElementById("schedule-chart");
  var toRemove = [];
  console.log(scheduleTable.rows.length);
  for (let i = 1; i < scheduleTable.rows.length; i++) {
    const element = scheduleTable.rows[i];
    
    toRemove.push(element.id);
    // document.getElementById(element.id).remove();
    // element.remove();
  }
  toRemove.forEach(element => {
    document.getElementById(element).remove();
  });
}




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


    newRow.setAttribute("id", "prd" + element.name + "row");

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
  

}
