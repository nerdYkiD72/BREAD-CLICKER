// const { parseJSON } = require("jquery");

// - Variables - :
const niceButton = document.getElementById("nice_hehe");
const startDate = new Date();
const scheduleDataKey = "SCHEDULE_DATA";
const saveDataKey = "SAVE_DATA";
var myChart;
let totalClicks = 0;
var breadSlices = 0;
var breadSlicesOld = 0;
var breadSlicesDisplay = 0;
var breadPerSecond = 0;
var cps = 0;
var addedSclicesPerClick = 0;
var addedSclices_MetalKnife = 0;
var saveData;
var humanClicks = 0;

const upgradeData = [
  {
    name: "Plastic Butter Knife",
    initialPrice: 100,
    price: 100,
    // add data here on how to dynamically adjust the price
    slicesAdded: 0.25
  },
  {
    name: "Metal Butter Knife",
    initialPrice: 250,
    price: 250,
    // add data here on how to dynamically adjust the price
    slicesAdded: 0.5
  },
  {
    name: "Slice Bot",
    initialPrice: 1000,
    price: 1000,
  },
  {
    name: "Super Slice Bot",
    initialPrice: 10000,
    price: 10000,
  },
];

// Document references:
const counterDOM = document.getElementById("counter2");

const knifeCountDOM = document.getElementById("knife-count");
const knifeAddedSlicesDOM = document.getElementById("knife-added-slices");

const metalKnifeCountDOM = document.getElementById("metal-knife-count");
const metalKnifeAddedSlicesDOM = document.getElementById("metal-knife-added-slices");

const sliceBotCountDOM = document.getElementById("slice-bot-count");
const sliceBotSlicePerSecondDom = document.getElementById("slice-bot-slicePerSecond");
const sliceBotNextClickDOM = document.getElementById("slice-bot-nextClick");

const superSliceBotCountDOM = document.getElementById("super-slice-bot-count"); 
const superSliceBotSlicePerSecondDom = document.getElementById("super-slice-bot-slicePerSecond");
// const superSliceBotNextClickDOM = document.getElementById("");

const chart4_2SlopeDOM = document.getElementById("4-2-slope");




// Hi ruths



// - Stuffs lol - :

// setInterval(() => {
//   console.log(`${breadSlices} | ${totalClicks}`);
// }, 100);


/**
 * Continuusly updates the cps counter on the page.
 */
function doingUrMom() {
  document.getElementById("cps-counter").innerHTML = `${getCPS(false)} Clicks per Second`;

  let t = setTimeout(function(){ doingUrMom() }, 75);
}
// Ruths look at this funny function name:
doingUrMom();   // Starts updating



// Run whenver bread is clicked:
function myFunction() {
  totalClicks = totalClicks + 1; // Keep track of total clicks
  // breadSlices = breadSlices + 1 + addedSclicesPerClick + addedSclices_MetalKnife; // Keep track of actual bread sliced

  addedBreadSlices = 1 + addedSclicesPerClick + addedSclices_MetalKnife;
  // smoothAddition(addedSclicesPerClick, 250, 10);
  breadSlices += addedBreadSlices;

  // Update cps when bread is clicked. This will actaully be what counts the clicks.
  document.getElementById("cps-counter").innerHTML = `${getCPS(true)} Clicks per Second`;

  saveData.totalClicks = totalClicks;
  saveData.breadSlices = breadSlices;

  updateCounter();
  localStorage.setItem(saveDataKey, JSON.stringify(saveData));
  storeSaveData();
  // Update the visual counter of total clicks

  // Easter egg for my boi will
  // if (totalClicks == 100000) {
  //   users.willus.getBitcoinWallet.addBitCoin(0.00005);
  // }

  // console.log(`The human has click the bread ${humanClicks} times`);
  // if (totalClicks == 20) {
  //   oneCPS();
  // }
}



// Functionalily of dropdowns in Click Shop
const sliceBotIcon = document.getElementById("slice-bot-arrow");
const slicerBotDiv = document.getElementById("sclicer-bot-details");
function sliceBotButton() {
  if (slicerBotDiv.style.display !== "none") {
    slicerBotDiv.style.display = "none";
    sliceBotIcon.classList.remove("icon-flipped");
  } else {
    slicerBotDiv.style.display = "block";
    sliceBotIcon.classList.add("icon-flipped");
  }
}


const butterKnifeIcon = document.getElementById("butter-knifes-arrow");
const butterKnifeDiv = document.getElementById("butte-knifes-details");
function butterKnifesButton() {
  if (butterKnifeDiv.style.display !== "none") {
    butterKnifeDiv.style.display = "none";
    butterKnifeIcon.classList.remove("icon-flipped");
  } else {
    butterKnifeDiv.style.display = "block";
    butterKnifeIcon.classList.add("icon-flipped");
  }
}

// Start the page and close the dropdowns to save space.
sliceBotButton();
butterKnifesButton();



function oneCPS() {
  totalClicks += 1;
  document.getElementById("counter").innerHTML = "The counter is at: ";
  document.getElementById("counter2").innerHTML = totalClicks;

  let t = setTimeout(function () {
    oneCPS();
  }, 1000);
}


function makeitnice() {
  totalClicks = 69;
  document.getElementById("counter").innerHTML = "The counter is at: ";
  document.getElementById("counter2").innerHTML = 69;
}



function purchaseItem(item) {
  if (item == "getGud") {
    // breadSlices = breadSlices - 10;
    // localStorage.setItem("breadClicked", totalClicks);
    // updateCounter();


  // Purchase Plastic Butter Knife:
  } else if (item == "plasticButterKnife") {
    // Purchase BUTTER KNIFE:
    var knifeData = upgradeData[0];
    if (breadSlices >= knifeData.price) {
      breadSlices = breadSlices - knifeData.price;                // Remove cost of item.

      addedSclicesPerClick += knifeData.slicesAdded;       // Add the knew knifes functionality.
      saveData.upgrades[0].quantity = saveData.upgrades[0].quantity + 1; // Update the number of knifes saved.

      
    }

  // Purchase Metal Butter Knife:
  } else if (item === "metalButterKnife") {
    var knifeData = upgradeData[1];
    if (breadSlices >= knifeData.price) {
      breadSlices = breadSlices - knifeData.price;                // Remove cost of item.

      addedSclices_MetalKnife += knifeData.slicesAdded;       // Add the knew knifes functionality.
      saveData.upgrades[1].quantity = saveData.upgrades[1].quantity + 1;
    }

  // Purchase Slice Bot:
  } else if (item === "sliceBot") {
    var botData = upgradeData[2];

    // Check if user can afford purchase.
    if (breadSlices >= botData.price) {
      breadSlices = breadSlices - botData.price;

      try {
        saveData.upgrades[3].quantity += 1;
      } catch {
        saveData.upgrades.push({
          name: "Slice Bot",
          type: "Slice Bot",
          // lmao ruths you dumb fuck why are you looking at this???????????????? idiot
          quantity: 1,
        });
      }
      sliceBotSlicePerSecondDom.innerHTML = saveData.upgrades[3].quantity / 5;
    }

  // Purchase Super Slice Bot:
  } else if (item === "superSliceBot") {
    var botData = upgradeData[3];

    // Check if user can afford purchase.
    if (breadSlices >= botData.price) {
      breadSlices = breadSlices - botData.price;

      try {
        saveData.upgrades[4].quantity += 1;
      } catch {
        saveData.upgrades.push({
          name: "Super Slice Bot",
          type: "Super Slice Bot",
          quantity: 1,
        });
      }
      sliceBotSlicePerSecondDom.innerHTML = saveData.upgrades[4].quantity / 5;
    }
  }

  // Save all data and show it to the user after purchase
  storeSaveData();
  updateCounter();
}



var ii = 0
var ii2 = 5;
function sliceBotClicking() {
  breadSlicesOld = breadSlices;
  var added = (saveData.upgrades[3].quantity / 5) + saveData.upgrades[4].quantity;
  breadSlices = breadSlices + added;

  animateValue(counterDOM, breadSlicesOld, breadSlices, 1000);
  // if (ii === 0 || ii % 5 == 0) {
  //   // console.log(`Multiple of five, ii = ${ii}`);
  //   smoothAddition(saveData.upgrades[3].quantity, 250, 10);
  // }

  

  // breadSlices += saveData.upgrades[4].quantity;
  // smoothAddition(saveData.upgrades[4].quantity, 250, 10);
  // const testCounter = document.getElementById("testCounter");
  // breadPerSecond = (saveData.upgrades[3].quantity / 5) + saveData.upgrades[4].quantity;
  // animateValue(testCounter, breadSlices, breadSlices + breadPerSecond, 10000);


  


  if (ii2 <= 0) {
    ii2 = 5;
  }



  sliceBotNextClickDOM.innerHTML = ii2;

  updateCounter();
  ii2--;
  ii++;

  


  



  let t = setTimeout(function(){ sliceBotClicking() }, 1000);
}





async function continuousSSBot() {
  // var added = 1000// saveData.upgrades[4].quantity;
  // var pause = added / 1000;
  // console.log(pause);
  // var test = 0;

  // console.log("Start");
  // for (let i = 0; i < added; i++) {
  //   test += 1;
  //   console.log(test);
  //   await sleep(5);
  //   console.log("done sleep")
  // }

  

  setTimeout(() => {
    document.getElementById("testTimer").innerHTML = 1;
  }, 1000);
}


// TODO: implement this. Stolen from: https://css-tricks.com/animating-number-counters/
function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = showBread(Math.floor(progress * (end - start) + start));
    // console.log(Math.floor(progress * (end - start) + start));
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}


function showBread(bread) {
  if (bread >= 1.0e+6 && bread < 1.0e+9) {
    bread = bread.toLocaleString();
    // var blocks = [];
    // var rounded = "";
    // for (let i = 0; i < bread.length; i++) {
    //   const element = bread[i];
    //   if (element === ",") {
    //     blocks.push(rounded);
    //     rounded = "";
    //   } else {
    //     rounded = rounded + element;
    //   }
    // }
    // console.log(blocks);

    var blocks = bread.split(",");
    // console.log(blocks);

    return blocks[0] + "." + blocks[1] + ' <mark class="counter-label">million</mark>';
    // return blocks[0] + "." + blocks[1] + ' million';
  } else {
    return bread;
  }

}


function getSaveData() {
  var storedSave = localStorage[saveDataKey];

  if (storedSave) {
    // We have a save stored
    console.log("Loading local save...");
    this.saveData = JSON.parse(storedSave);
  } else {
    // There is no save stored, create one:
    this.saveData = {
      totalClicks: totalClicks,
      breadSlices: breadSlices,
      historicData: [0, 0, 0, 0, 0, 0],
      upgrades: [
        {
          name: "Knife",
          type: "Plastic Butter knife",
          quantity: 0,
        },
        {
          name: "Knife",
          type: "Metal Butter knife",
          quantity: 0,
        },
        {
          name: "LmaoGetGudNub",
          type: "default",
          quantity: 0,
        },
        {
          name: "Slice Bot",
          type: "Slice Bot",
          quantity: 0,
        },
        {
          name: "Super Slice Bot",
          type: "Super Slice Bot",
          quantity: 0,
        },
      ]
    };
  }

  totalClicks = saveData.totalClicks;
  breadSlices = saveData.breadSlices;
  addedSclicesPerClick = saveData.upgrades[0].quantity / 4;
  addedSclices_MetalKnife = saveData.upgrades[1].quantity / 2;

  if (saveData.historicData == undefined) {
    saveData.historicData = [0, 0, 0, 0, 0, 0];
  }

  updateCounter();
}



function storeSaveData() {
  saveData.totalClicks = totalClicks;
  saveData.breadSlices = breadSlices;
  localStorage.setItem(saveDataKey, JSON.stringify(saveData));
}

// TODO: Add a special upgrade that makes knife effects work on slice bots.

/**
 * Blissful sleep
 * @param {Number} ms How long to pause
 * @returns Promise to block the thread
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


/**
 * Increments a counter in steps. 
 * @param {Number} addedAmount The value your actually adding.
 * @param {Number} time Total time (ms) you want the adding to take.
 * @param {Number} steps How many times the number will get added
 */
async function smoothAddition(addedAmount, time, steps) {
  var definiteAnswer = breadSlices + addedAmount;
  var timeBetweenAdds = time / steps;

  for (let i = 0; i < steps; i++) {
      await sleep(timeBetweenAdds);
      // Ruths what are you doing; go to sleep its past your bedtime.
      breadSlices += (addedAmount / steps);
      counterDOM.innerHTML = Math.trunc(breadSlices).toLocaleString();
  }

  if (breadSlices !== definiteAnswer) {
    breadSlices = definiteAnswer;
  }

  counterDOM.innerHTML = Math.trunc(breadSlices).toLocaleString();

}


function updateCounter() {
  counterDOM.innerHTML = Math.trunc(breadSlices).toLocaleString();
  knifeCountDOM.innerHTML = saveData.upgrades[0].quantity.toLocaleString();
  knifeAddedSlicesDOM.innerHTML = addedSclicesPerClick.toLocaleString();
  metalKnifeCountDOM.innerHTML = saveData.upgrades[1].quantity.toLocaleString();
  metalKnifeAddedSlicesDOM.innerHTML = addedSclices_MetalKnife.toLocaleString();

  sliceBotCountDOM.innerHTML = saveData.upgrades[3].quantity.toLocaleString();
  sliceBotSlicePerSecondDom.innerHTML = (saveData.upgrades[3].quantity / 5).toLocaleString();

  superSliceBotCountDOM.innerHTML = saveData.upgrades[4].quantity.toLocaleString();
  superSliceBotSlicePerSecondDom.innerHTML = saveData.upgrades[4].quantity.toLocaleString();
  
  
  
  
}

function updateGraph() {
  var historicData = saveData.historicData;

  if (historicData[5] !== breadSlices) {
    historicData.push(breadSlices);
    historicData.shift();
    // console.log(historicData);
    // console.log(myChart);

    var rise = historicData[4] - historicData[3];
    // run is equal to 2

    chart4_2SlopeDOM.innerHTML = (rise / 2).toLocaleString();

    try {
      myChart.update();
    } catch {
      console.log("BRUHHHH");
    }
  }

  


  let t = setTimeout(function(){ updateGraph() }, 2000);
}




// Disable image dragging on the page
const img = document.querySelector("img");
img.ondragstart = () => {
  return false;
};




window.onload = pageLoad();

function pageLoad() {
  loadSchedule();

  // Game stufs:
  getSaveData();
  chartConfig();
  updateGraph();
  updateCounter();
  sliceBotClicking(); 
  continuousSSBot();

  document.getElementById("A-select").checked = true;
}


/**
 * Creates and configures the chart
 */
function chartConfig() {
  // Chart.js Configuration:
  const labels = [
    '10',
    '8',
    '6',
    '4',
    '2',
    '0',
  ];
  const data = {
    labels: labels,
    datasets: [{
      label: 'Sliced Bread',
      backgroundColor: 'rgb(255, 99, 255)',
      borderColor: 'rgb(255, 99, 255)',
      data: saveData.historicData,
    }]
  };
  const config = {
    type: 'line',
    data: data,
    options: {
      animation: {
        duration: 100
      }
    }
  };
  // Chart.js Configuration END ---------------------------
  // Create chart
  myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
}




function formatNum() {

}



/**
 * Loads in JSON data.
 * Checks for cache in Local Storage.
 * If cache is updated, continue, but if not, update cache.
 * Reference cache with Local Storage.
 */
function loadSchedule() {
  $.getJSON("./assets/schedules/schedules.json", function (json) {
    // Get the latest data
    var storedData = localStorage[scheduleDataKey];

    if (storedData) {
      // We have a cache
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
  }); // TODO: add the ability to add custome schedules (Things like snow day and 60 min ADV.)

  // Once we know the cache is right, serve its contents to the user.
  serveData();3
}



/**
 * Displays the data from cached JSON in the schedule table.
 * Only logic here for now is determining what schedule to show for either Wed. or other weekdays.
 * TODO: Make it so you can remember what the last schedule was.
 */
function serveData() {
  var dateNow = new Date();
  var json = JSON.parse(localStorage[scheduleDataKey]);

  // 3 = Wednesday, 1-5 = Weekdays, 6 & 0 = Saturday & Sunday
  if (dateNow.getDay() == 3) {
    fillTable(json[1]);
  } else {
    fillTable(json[0]);
  }

  var scheduleSelect = document.getElementById("schedule-select");
  var i = 0;

  // Create and fill elements for times:
  json.forEach((element) => {
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


/**
 * Handles when the user changes the selected schedule in the drop down.
 */
function scheduleSelectChange() {
  // Add more scheduels
  var json = JSON.parse(localStorage[scheduleDataKey]);
  var dropDown = document.getElementById("schedule-select");
  var selectedSchedule = dropDown.options[dropDown.selectedIndex].value;
  var aLunch = document.getElementById("A-select").checked
  var bLunch = document.getElementById("B-select").checked
  var dateNow = new Date();
  console.log(aLunch);


 clearTable();
  // console.log(selectedSchedule);
  if (selectedSchedule == "2hr Delay") {
    aLunch ? fillTable(json[2], "a") : fillTable(json[2], "b");

  }
  else if (selectedSchedule == "1hr long Advisory") {
    fillTable(json[3]);

  }
  else if (selectedSchedule == "Default") {
    if (dateNow.getDay() == 3) {  // Its Wednesday:
      aLunch ? fillTable(json[1], "a") : fillTable(json[1], "b");

    } else {
      aLunch ? fillTable(json[0], "a") : fillTable(json[0], "b");
    }
  }
}


/**
 * Removes the contents from the table
 */
function clearTable() {
  var scheduleTable = document.getElementById("schedule-chart");
  var toRemove = [];
  for (let i = 1; i < scheduleTable.rows.length; i++) {
    const element = scheduleTable.rows[i];

    toRemove.push(element.id);
    // document.getElementById(element.id).remove();
    // element.remove();
  }
  toRemove.forEach((element) => {
    document.getElementById(element).remove();
  });
}

/**
 * Goes through all data given by json data and puts it in a table.
 * @param daysSchedule The json data of the current days schedule.
 */
function fillTable(daysSchedule, lunch="a") {
  var i = 0;
  var schdeuldTable = document.getElementById("schedule-chart");
  console.log(`${lunch}-lunch selected`);

  daysSchedule.classes.forEach((element) => {
    i++;

    // Create new cells.
    var newRow = schdeuldTable.insertRow(i);
    var cell_Left = newRow.insertCell(0);
    var cell_Right = newRow.insertCell(1);
    
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
function ABlunchSelect(Jimmy) {


  if (Jimmy == "A-select"){
    console.log("A Lunch is Selected")


  } 
  else if (Jimmy == "B-select"){
    console.log("B Lunch is Selected")


  }

}