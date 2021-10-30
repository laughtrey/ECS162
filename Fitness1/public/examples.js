let button = document.getElementById("button1");
button.addEventListener("click",displayActivity);

let button2 = document.getElementById("button2");
button2.addEventListener("click",displayfutureActivity);

let submit1 = document.getElementById("submit1");
submit1.addEventListener("click",getInfo);

let submit2 = document.getElementById("submit2");
submit2.addEventListener("click",getFutureInfo);

// function buttonAction(){
//     document.getElementById("pastactivityform").textContent = "clicked";
// }

// function hideActivity(){
//     var x = document.getElementById("pastactivityform");
//     x.style.display = "none;"
// }

function displayActivity(){
    let x = document.getElementById("pastactivityform");
    let y = document.getElementById("button1");
    if(x.style.display === "none"){
        x.style.display = "flex";
        y.style.display = "none";
    }
    else{
        x.style.display="none";
    }
}

function displayfutureActivity(){
    let a = document.getElementById("futureactivityform");
    let b = document.getElementById("button2");
    if(a.style.display === "none"){
        a.style.display = "flex";
        b.style.display = "none";
    }
    else{
        a.style.display="none";
    }
}

function getInfo(){
    //window.alert("CLICKED"); //write error function here
    var date = document.getElementById("date").value;
    console.log("got", date);
    var activityID = document.getElementById("activity").value; //0 walk 1 run 2 swim 3 bike 4 yoga 5 soccer 6 basketball
    if(activityID==0){activity = "Walk"}
    if(activityID==1){activity = "Run"}
    if(activityID==2){activity = "Swim"}
    if(activityID==3){activity = "Bike"}
    if(activityID==4){activity = "Yoga"}
    if(activityID==5){activity = "Soccer"}
    if(activityID==6){activity = "Basketball"}
    console.log("got", activity);
    var timedist = document.getElementById("timedist").value;
    console.log("got", timedist);
    var units = document.getElementById("units").value;
    console.log("got", units);

    let activitydata={
        "date": date,
        "activity": activity,
        "scalar" : timedist,
        "units" : units
        };
    var successtring = ("Got it! " + activity + " for " + timedist + " " + units + " on " + date);
    document.getElementById("SuccessMessage").textContent = successtring;
    let z = document.getElementById("pastactivityform");
    let y = document.getElementById("button1");
    if(z.style.display === "flex"){
        z.style.display = "none";
        y.style.display = "flex";
        
    }

    fetch('/activity', {
        method: 'POST', 
        headers: {'Content-Type': 'text/plain'},
        body: activitydata.toString() })
        .then(function(response){
          return response.text()
        })
        .then(function(successtring){
          console.log(successtring + " at getexample.html"); 
          displayOutputPA(activitydata);
        })
        .catch(function(error) {
        console.error('There has been a problem with your fetch operation:', error);
        });
}


function getFutureInfo(){
    //window.alert("CLICKED"); //write error function here
    var date = document.getElementById("date").value;
    console.log("got", date);
    var activityID = document.getElementById("activity").value; //0 walk 1 run 2 swim 3 bike 4 yoga 5 soccer 6 basketball
    if(activityID==0){activity = "Walk"}
    if(activityID==1){activity = "Run"}
    if(activityID==2){activity = "Swim"}
    if(activityID==3){activity = "Bike"}
    if(activityID==4){activity = "Yoga"}
    if(activityID==5){activity = "Soccer"}
    if(activityID==6){activity = "Basketball"}
    console.log("got", activity);

    let futureactivitydata={
        "date": date,
        "activity": activity,
        };

    let z = document.getElementById("futureactivityform");
    let b = document.getElementById("button2");
    if(z.style.display === "flex"){
        z.style.display = "none";
        b.style.display = "flex";
    }
    


    var successtring = ("Got it! " + activity + " for " + date); 
    fetch('/activity', {
        method: 'POST', 
        headers: {'Content-Type': 'text/plain'},
        body: activitydata.toString() })
        .then(function(response){
          return response.text()
        })
        .then(function(successtring){
          console.log(successtring + " at getexample.html"); 
          displayOutputPA(activitydata);
        })
        .catch(function(error) {
        console.error('There has been a problem with your fetch operation:', error);
        });
}


// function submitPast(){
//     let z = document.getElementById("submit1");
//     if(z.style.display === "block"){
//         z.style.display = "none";
//     }
//     "Got it!" + activity + " for " + timedist + units; 
// }