const niceButton = document.getElementById("nice_hehe");
let number = 0;

function myFunction() {
    number = number + 1;
    document.getElementById('counter').innerHTML = "The counter is at: ";
    document.getElementById('counter2').innerHTML = number;

    
};

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

// const scheduleData = require('./assets/schedules/schedules.json');
$.getJSON("./assets/schedules/schedules.json", function(json) {
  document.getElementById('timeLeft').innerHTML = json;
  console.log(json); // this will show the info it in firebug console
});
// const scheduleData = '';




