// const clock = ;

// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

const today = new Date();

function updateClock() {
  var hours = today.getHours();
  if (hours > 12) {
    hours = hours - 12;
  }

  var minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  var seconds = today.getSeconds();
  if (seconds < 10) {
    seconds = '0' + seconds;
  }


  var time = hours + ":" + minutes + ":" + seconds;
  document.getElementById("clock").innerHTML = time;
  var t = setTimeout(function(){ updateClock(); }, 1000);
}






function currentTime() {
  let date = new Date(); 
  // date.setHours(13);
  // date.setMinutes(45);
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  let session = "AM";

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

  // -----------------------------
  // -------- Class times --------
  //------------------------------

  // First prd
  var startTime_1 = new Date();
  startTime_1.setHours(9);
  startTime_1.setMinutes(0);
  var endTime_1 = new Date();
  endTime_1.setHours(9);
  endTime_1.setMinutes(49);


  // Second prd
  var startTime_2 = new Date();
  startTime_2.setHours(9);
  startTime_2.setMinutes(54);
  var endTime_2 = new Date();
  endTime_2.setHours(10);
  endTime_2.setMinutes(43);


  // Third prd
  var startTime_3 = new Date();
  startTime_3.setHours(10);
  startTime_3.setMinutes(48);
  var endTime_3 = new Date();
  endTime_3.setHours(11);
  endTime_3.setMinutes(37);


  // Lunch prd
  var startTime_lunch = new Date();
  startTime_lunch.setHours(11);
  startTime_lunch.setMinutes(38);
  var endTime_lunch = new Date();
  endTime_lunch.setHours(12);
  endTime_lunch.setMinutes(11);


  // Advisory prd
  var startTime_adv = new Date();
  startTime_adv.setHours(12);
  startTime_adv.setMinutes(12);
  var endTime_adv = new Date();
  endTime_adv.setHours(12);
  endTime_adv.setMinutes(42);


  // Fourth prd
  var startTime_4 = new Date();
  startTime_4.setHours(12);
  startTime_4.setMinutes(47);
  var endTime_4 = new Date();
  endTime_4.setHours(13);
  endTime_4.setMinutes(36);


  // Fith prd
  var startTime_5 = new Date();
  startTime_5.setHours(13);
  startTime_5.setMinutes(41);
  var endTime_5 = new Date();
  endTime_5.setHours(14);
  endTime_5.setMinutes(30);

  document.getElementById("first").classList.remove("my-primary");
  document.getElementById("first2").classList.remove("my-primary");
  document.getElementById("second").classList.remove("my-primary");
  document.getElementById("second2").classList.remove("my-primary");
  document.getElementById("third").classList.remove("my-primary");
  document.getElementById("third2").classList.remove("my-primary");
  document.getElementById("lunch").classList.remove("my-primary");
  document.getElementById("lunch2").classList.remove("my-primary");
  document.getElementById("adv").classList.remove("my-primary");
  document.getElementById("adv2").classList.remove("my-primary");
  document.getElementById("fourth").classList.remove("my-primary");
  document.getElementById("fourth2").classList.remove("my-primary");
  document.getElementById("fith").classList.remove("my-primary");
  document.getElementById("fith2").classList.remove("my-primary");
  


  if (date < endTime_1 && date > startTime_1) {
    document.getElementById("first").classList.add("my-primary");
    document.getElementById("first2").classList.add("my-primary");
  }
  // console.log('First Period: ' + firstPrd);

  if (date < endTime_2 && date > startTime_2) {
    document.getElementById("second").classList.add("my-primary");
    document.getElementById("second2").classList.add("my-primary");
  } 
  // console.log('Second Period: ' + secondPrd);

  if (date < endTime_3 && date > startTime_3) {
    document.getElementById("third").classList.add("my-primary");
    document.getElementById("third2").classList.add("my-primary");
  }
  // console.log('Third Period: ' + thirdPrd);

  if (date < endTime_lunch && date > startTime_lunch) {
    document.getElementById("lunch").classList.add("my-primary");
    document.getElementById("lunch2").classList.add("my-primary");
  }

  if (date < endTime_adv && date > startTime_adv) {
    document.getElementById("adv").classList.add("my-primary");
    document.getElementById("adv2").classList.add("my-primary");
  }
  // console.log('Lunch Period: ' + advPrd);

  if (date < endTime_4 && date > startTime_4) {
    document.getElementById("fourth").classList.add("my-primary");
    document.getElementById("fourth2").classList.add("my-primary");
  }
  // console.log('Fourth Period: ' + fourthhPrd);

  if (date < endTime_5 && date > startTime_5) {
    document.getElementById("fith").classList.add("my-primary");
    document.getElementById("fith2").classList.add("my-primary");
  }
  // console.log('Fith Period: ' + fithPrd);


  



  



  let t = setTimeout(function(){ currentTime() }, 1000);
}

currentTime();




