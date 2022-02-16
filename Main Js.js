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




