const niceButton = document.getElementById("nice_hehe");
let number = 0;
var humanClicks = 0;

function myFunction() {
    number = number + 1;
    humanClicks = humanClicks + 1;
    // console.log(`The human has click the bread ${humanClicks} times`);
    if (number == 20) {
      oneCPS();
    }
    document.getElementById('counter').innerHTML = "The counter is at: ";
    document.getElementById('counter2').innerHTML = number;

};

var testing = false;
var keepTesting = -1;
function CPSTestButton() {
  

    testCPS();

  
  keepTesting += 1; 
}

function testCPS(startNum, startHumanClicks) {
  if (!testing) {
    startingNumber = number;
    startHumanClicks = humanClicks;
    testing = true;
    let t = setTimeout(function(){ testCPS(startingNumber, startHumanClicks); }, 1000);
  } else if (testing) {
    var cps = number - startNum;
    var humanCPS = humanClicks - startHumanClicks;
    console.log(` CPS:
    Total cps :${cps}
    Your cps: ${humanCPS}`);
    testing = false;
    if (keepTesting % 2 == 0) { 
      let t = setTimeout(function(){ testCPS(startingNumber, startHumanClicks); }, 1000); 
    }
  }
  
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


// Disable image dragging
const img = document.querySelector('img')
img.ondragstart = () => {
  return false;
};



$.getJSON("./assets/schedules/schedules.json", function(json) { 
  var dateNow = new Date();

  if (dateNow != 3) {
    fillTable(json[0].classes); // 0 = normal day, 1 = wednesday 

  } else if (dateNow == 3) {
    fillTable(json[1].classes);
  }
 });


function fillTable(daysSchedule) {
  var i = 0;
  var schdeuldTable = document.getElementById("schedule-chart");

  daysSchedule.forEach(element => {
    i++;
    var newRow = schdeuldTable.insertRow(i);
    var cell_Left = newRow.insertCell(0);
    var cell_Right = newRow.insertCell(1);  // chart-background
    cell_Left.setAttribute("id", "prd" + element.name + "-title");
    cell_Left.classList.add("chart-background");
    cell_Right.setAttribute("id", "prd" + element.name + "-time");
    cell_Right.classList.add("chart-background");

    cell_Left.innerHTML = element.name;
    cell_Right.innerHTML = element.start + " - " + element.end;
  });

  // Start updateing the clock once the table has loaded
  updateClock();

}
