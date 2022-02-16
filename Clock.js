// const clock = ;

// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
document.getElementById("clock").innerHTML = Hi;

function updateClock() {
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  document.getElementById("clock").innerHTML = Hi;
}

updateClock();

// for (let index = 0; index < 10; index++) {
//     updateClock();
//     sleep(1000);
    
// }
