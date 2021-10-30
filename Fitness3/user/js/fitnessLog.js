'use strict';  // always start with this 

import barchart from './barchart.js'
import blankdata from './data.js'


/* Check to see if there was some planned activity*/

/* Set default date in forms to current date */
document.getElementById('pAct-date').valueAsDate = newUTCDate()
document.getElementById('fAct-date').valueAsDate = newUTCDate()

/* View progress button listener*/
let viewProgress = document.getElementById("viewProgressButton")
viewProgress.addEventListener("click", view_progress);
barchart.init('chart-anchor', 500, 300);

/* Logout button listener */
// let logoutButton = document.getElementById("Logoutbtn")
// logoutButton.addEventListener("click", logout_funct)

/* Go chart button listener*/
let goButton = document.getElementById("chart-button")
goButton.addEventListener("click", view_progress)

/* Yes response to reminder button listener*/
let yesresponse = document.getElementById("yes")
yesresponse.addEventListener("click", yes_response_reminder);

/* no response to reminder button listener*/
let noresponse = document.getElementById("no")
noresponse.addEventListener("click", no_response_reminder);

/* Past Activity 'Add New Activity' Button - Show Form */
let add_past_activity_button = document.getElementById("addPastActivityButton")
add_past_activity_button.addEventListener("click", add_past_activity_onclick);


/* Future Activity 'Add New Activity' Button - Show Form */
let add_future_activity_button = document.getElementById("addFutureActivityButton")
add_future_activity_button.addEventListener("click", add_future_activity_onclick);


/* Past Activity Form Dropdown */
let past_activity_dropdown = document.getElementById("pAct-activity")
past_activity_dropdown.addEventListener("change", past_activity_dropdown_onchange);


/* Past Activity 'Submit' Button - Submit Form */
let submit_past_activity_button = document.getElementById("submitPastActivityButton")
submit_past_activity_button.addEventListener("click", submit_past_activity_onclick);


/* Future Activity 'Submit' Button - Submit Form */
let submit_future_activity_button = document.getElementById("submitFutureActivityButton")
submit_future_activity_button.addEventListener("click", submit_future_activity_onclick)


/* Logout function */
// function logout_funct(){
//   app.get('/logout', function (req, res){
//   req.session.destroy(function (err) {
//     res.redirect('/'); //Inside a callback… bulletproof!
//   });
// });
// }

/* Display reminder banner if exists*/
async function check_for_reminder(){

  let banner = document.getElementById("reminder")
  let question = document.getElementById("reminder-question")

  await fetch('/reminder')
  .then(result => result.json())
  .then(data=>{
    if(data.length > 0){
      banner.classList.remove("hide");
      console.log(data);
      question.innerHTML = "Did you remember to " + data[0].activity + "?";
    }  
  })
  .catch(console.log("Nothing to remind you about!"))
}

check_for_reminder();

async function update_name(){
  let username = document.getElementById("username");
  await fetch('/name')
  .then(result => result.json())
  .then(data=>{
    console.log(data.name);
    let name = data.name;
    console.log("RIGHT HERE! " + name);
    username.innerHTML = name+"!";
  })
}
update_name();

/* Hides banner on yes response*/
function yes_response_reminder(){
  let banner = document.getElementById("reminder")
  banner.classList.add("hide");
}

/* Hides banner on no response*/ 
function no_response_reminder(){
  let banner = document.getElementById("reminder")
  let question = document.getElementById("reminder-question")
  question.innerHTML = "Tsk tsk";
  //sleep(2000);
  banner.classList.add("hide");
}



// step 8
async function view_progress(){

  let datein = document.getElementById("chart-date").value;
  let activity = document.getElementById("chart-activity").value;

  let date = new Date(datein).getTime();
  

   if (datein === ""){
     date = new Date().getTime();
    }
    else{
      date = new Date(datein).getTime();
    }
   if(activity == undefined){
     activity = "Walk";
    }

  await fetch(`/week?date=`+ date + `&activity=` +activity, {
    method: 'GET'
  })
  .then(response => response.json())
  .then(data =>{
    let formattedData = formatChartData(data);
    barchart.render(formattedData, 'Amount '+ activity +'ed', 'Day of the Week');
  })
  .catch((error) => {
    console.log("errored in view_progress",error)
  });

var span = document.getElementsByClassName("close")[0];
span.onclick = function() {modal.style.display = "none";}
let modal = document.getElementById("barChart")
modal.style.display = "flex";
window.onclick = function(event) {
if (event.target == modal) {
  modal.style.display = "none";
}
}

}
// step 8
function formatChartData(data) {

  let dayInMiliseconds = 86400000;
  if(data[0] == undefined){
    data = [
    {
        'date': 1617624000000,
        'amount': 0
    }];
  }
  // Format response into readable chart data
  let formatedData = data.map(function(obj) {
    return {
      date: obj.date,
      value: obj.amount
    }
  });
  if(formatedData.length < 7){
    for(var i = formatedData.length; i < 7; i++){
      formatedData.push({date: formatedData[i-1].date+dayInMiliseconds, value: 0})
    }
  }
  return formatedData;
}

// step 8



  /*Check if reminder exists*/
  // fetch(`/reminder`)
  // .then(response => response.json())
  // .then(data => console.log(data))

/**
 * ONCLICK - Hide 'Add New Activity' Button under the Past Section and Show
 * Form to Add a Past Activity
 */
function add_past_activity_onclick() {
  /* Connect to Past Activity Sections */
  let pActAdd = document.getElementById("pAct-Add");
  let pActForm = document.getElementById("pAct-Form");

  /* Show Form, Hide 'Add New Activity' Button */
  pActAdd.classList.add("hide");
  pActForm.classList.remove("hide");
}


/**
 * ONCLICK - Hide 'Add New Activity' Button under the Future Section and Show
 * Form to Add a Future Activity
 */
function add_future_activity_onclick() {
  /* Connect to Past Activity Sections */
  let fActAdd = document.getElementById("fAct-Add");
  let fActForm = document.getElementById("fAct-Form");

  /* Show Form, Hide 'Add New Activity' Button */
  fActAdd.classList.add("hide");
  fActForm.classList.remove("hide");
}


/**
 * ONCHANGE - Automatically Change Units in Past Activty Form to accomodate the
 * selected Activity from the dropdown menu
 */
function past_activity_dropdown_onchange() {
  /* Connect to Past Activity Unit Input */
  let pActUnit = document.getElementById("pAct-unit");

  /* Show Form, Hide 'Add New Activity' Button */
  switch (past_activity_dropdown.value) {
    case 'Walk': case 'Run': case 'Bike':
      pActUnit.value = 'km';
      break;
    case 'Swim':
      pActUnit.value = 'laps';
      break;
    case 'Yoga': case 'Soccer': case 'Basketball':
      pActUnit.value = 'minutes';
      break;
    default:
      pActUnit.value = 'units';
  }
}


/**
 * ONCLICK - Validate Past Activity Form Contents, Send Data to Server, Remove
 * Form, and Display 'Add ...' Button with confirmation text above
 */
async function submit_past_activity_onclick() {
  /* Connect to Past Activity Sections */
  let pActAdd = document.getElementById("pAct-Add");
  let pActForm = document.getElementById("pAct-Form");
  /* Activity Data to Send to Server */
  let data = {
    date: document.getElementById('pAct-date').value,
    activity: document.getElementById('pAct-activity').value,
    scalar: document.getElementById('pAct-scalar').value,
    units: document.getElementById('pAct-unit').value,
    //userID: userIDnum
  }

  if (!past_activity_form_is_valid(data)) {  
    alert("Invalid Past Activity. Please fill in the entire form.");
    return
  }

  /* Hide Form, Show 'Add New Activity' Button */
  pActAdd.classList.remove("hide");
  pActForm.classList.add("hide");
  
  /* Add 'p' tag above 'Add New Activity' Button */
  let newActivity = create_submission_success_element(   
    "Got it! ",
    `${data.activity} for ${data.scalar} ${data.units}. `,
    "Keep it up!"
  )
  insert_latest_response(pActAdd, newActivity)

  console.log('Past Activity Sending:', data);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data), // post body
  }
  




  /* Post Activity Data to Server */
  fetch(`/store`,options)
  .then(response => response.json())
  .then(data => {
    console.log('Past Activity Success:', data);
  })
  .catch((error) => {
    console.error('Past Activity Error:', error);
  });

  // const response = await fetch(`/store`, options);
  // const json = await response.json();
  // console.log(json);

  /* Reset Form */
  document.getElementById('pAct-date').valueAsDate = newUTCDate()
  document.getElementById('pAct-activity').value = "Walk"
  document.getElementById('pAct-scalar').value = ""
  document.getElementById('pAct-unit').value = "km"
}


/**
 * ONCLICK - Validate Future Activity Form Contents, Send Data to Server, Remove
 * Form, and Display 'Add ...' Button with confirmation text above
 */
function submit_future_activity_onclick() {
  /* Connect to Future Activity Sections */
  let fActAdd = document.getElementById("fAct-Add");
  let fActForm = document.getElementById("fAct-Form");
  
  /* Activity Data to Send to Server */
  let data = {
    date: document.getElementById('fAct-date').value,
    activity: document.getElementById('fAct-activity').value
  }
  
  /* Form Validation */
  if (!future_activity_form_is_valid(data)) {  
    alert("Invalid Future Plan. Please fill in the entire form.");
    return
  }

  /* Hide Form, Show 'Add New Activity' Button */
  fActAdd.classList.remove("hide");
  fActForm.classList.add("hide");

  /* Add 'p' tag above 'Add New Activity' Button  */
  let newActivity = create_submission_success_element(
    "Sounds good! Don't forget to come back to update your session for ",
    `${data.activity} on ${reformat_date(data.date)}`,
    "!"
  )
  insert_latest_response(fActAdd, newActivity)

  console.log('Future Plans Sending:', data);

  /* Post Activity Data to Server */
  fetch(`/store`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data), // post body
  })
  .then(response => response.json())
  .then(data => {
    console.log('Future Plans Success:', data);
  })
  .catch((error) => {
    console.error('Future Plans Error:', error);
  });

  /* Reset Form */
  document.getElementById('fAct-date').valueAsDate = newUTCDate()
  document.getElementById('fAct-activity').value = "Walk"
}


/**
 * Create DOM element for acknowledgment message to send to user for submitting a form
 * @param {string} beg - regular starting section
 * @param {string} mid - bolded middle section
 * @param {string} end - regular trailing text
 * @returns {HTMLElement} DOM element combining beg, mid, end
 */
function create_submission_success_element(beg, mid, end) {
  /* Create all HTML elements to add */
  let newMessage = document.createElement('p')
  let baseText = document.createElement('span')
  let dynamicText = document.createElement('strong')
  let exclamationText = document.createElement('span')
  
  /* Update textContent of all generated DOM elements */
  baseText.textContent = beg
  dynamicText.textContent = mid
  exclamationText.textContent = end
  
  /* Append all text contents back to back in wrapper 'p' tag */
  newMessage.appendChild(baseText)
  newMessage.appendChild(dynamicText)
  newMessage.appendChild(exclamationText)

  return newMessage  
}


/**
 * Checks if past activity data is valid
 * @param {Object} data
 * @param {string} data.date - format 'mm-dd-yyyy'
 * @param {string} data.activity
 * @param {string} data.scalar - time or distance integer or float
 * @param {string} data.units - units for scalar value
 * @returns {boolean} Boolean represents if data is valid
 */
function past_activity_form_is_valid(data) {
  let date = new Date(data.date.replace('-','/'))
  if ( date != "Invalid Date" && date > newUTCDate()) {
    return false
  }

  return !(data.date == "" || data.activity == "" || data.scalar == "" || data.units == "" )
}


/**
 * Checks if future activity data is valid
 * @param {Object} data
 * @param {string} data.date
 * @param {string} data.activity
 * @returns {boolean} Boolean represents if data is valid
 */
function future_activity_form_is_valid(data) {
  let date = new Date(data.date.replace('-','/'))
  if ( date != "Invalid Date" && date < newUTCDate()) {
    return false
  }

  return !(data.date == "" || data.activity == "")
}


/**
 * Insert Prompt at the top of parent and remove old prompts
 * @param {HTMLElement} parent - DOM element 
 * @param {HTMLElement} child - DOM element
 */
function insert_latest_response(parent, child) {
  if(parent.children.length > 1) {
    parent.removeChild(parent.children[0])
  }
  parent.insertBefore(child, parent.childNodes[0])
}


/**
 * Convert 'yyyy-mm-dd' to 'mm/dd/yy'
 * @param {string} date 
 * @returns {string} same date, but reformated
 */
function reformat_date(date) {
  let [yyyy, mm, dd] = date.split("-");
  return `${mm}/${dd}/${yyyy.substring(2,4)}`
}


/**
 * Convert GMT date to UTC
 * @returns {Date} current date, but converts GMT date to UTC date
 */
function newUTCDate() {
  let gmtDate = new Date()
  return new Date(gmtDate.toLocaleDateString())
}