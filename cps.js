var lastPressed;
var pressed;
var clicks = [];
var oneSecond = new Date();
const startTime = new Date();
oneSecond.setHours(0, 0, 1, 0);

function getCPS(clicked) {
    var dateNow = new Date();
    var localTime = dateNow - startTime; // In miliseconds 
    if (clicked) {
        clicks.push(localTime);
    }
    
    for (let i = 0; i < clicks.length; i++) {
        // console.log(`Stats:
        // cliccks[i]: ${clicks[i]}
        // oneSecond: ${oneSecond}
        // dateNow: ${dateNow}
        // Subtract: ${clicks[i] + 1000}`);
        if ( clicks[i] + 1000 < localTime) { 
            clicks.splice(i, 1); 
        }
    }
    return clicks.length;
}