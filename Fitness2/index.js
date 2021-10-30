// Include Database
const dbo = require("./databaseOps");

// query string for get/week
const querystring = require('querystring');

// A static server using Node and Express
const express = require("express");
const app = express();

// make all the files in 'public' available on the Web
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/fitnessLog.html");
});

// step 5
app.get("/reminder", (request, response) => {
 dbo.plannedactivities(request,response);
});

// step 7 
///week?date=xxxx&activity=running
app.get("/week", async function (request,response){

  let date = request.query.date;
  let activity = request.query.activity;
  if(activity ==""){
    activity = "Walk";
  }

  // console.log("date:",date)
  // console.log("activity:",activity)

  let result = await dbo.entries(date,activity);
  // console.log("result:", result);
  response.json(result);
})

// instead of older body-parser 
app.use(express.json());

// handle store post requests
// step 3
app.post('/store', function(request, response, next) {
  console.log(
    "Server recieved a post request for /store with body: ",
    request.body
  );
  // step 4
  dbo.addtodb(request);
  const data = request.body;
  let unidate = new Date(data.date);
  response.json({
    date: unidate.getTime(),
    activity: data.activity,
    scalar: data.scalar,
    units: data.units,
    message: "I recieved your POST request at /store and stored it to the DB"
  });
});

// handle futureActivity post requests
// app.post('/futureActivity', function(request, response, next) {
//   console.log(
//     "Server recieved a post request /futureActivity with body: ",
//     request.body
//   );
//   response.send({
//     message: "I recieved your POST request at /futureActivity"
//   });
// });


// handle store post requests
// app.post('/store', function(request, response, next) {
//   console.log(
//     "Server recieved a post request for /store with body: ",
//     request.body
//   );
//   response.json({
//     message: "I recieved your POST request at /store"
//   });
// });

// handle pastActivity post requests
// app.post('/pastActivity', function(request, response, next) {
//   console.log(
//     "Server recieved a post request for /pastActivity with body: ",
//     request.body
//   );
//   response.send({
//     message: "I recieved your POST request at /pastActivity"
//   });
// });

// handle futureActivity post requests
// app.post('/futureActivity', function(request, response, next) {
//   console.log(
//     "Server recieved a post request /futureActivity with body: ",
//     request.body
//   );
//   response.send({
//     message: "I recieved your POST request at /futureActivity"
//   });
// });

// listen for requests :)
const listener = app.listen(3000, () => {
  console.log("The static server is listening on port " + listener.address().port);
});
