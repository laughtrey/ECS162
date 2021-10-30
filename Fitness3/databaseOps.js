'use strict'

// using a Promises-wrapped version of sqlite3
const db = require('./sqlWrap');

// SQL commands for ActivityTable
const insertDB = "insert into ActivityTable (activity, date, amount, userID) values (?,?,?,?)"
const getOneDB = "select * from ActivityTable where activity = ? and date = ? and amount = ? and userID = ?";
const allDB = "select * from ActivityTable where activity = ? and userID = ?";
const futureact = "select * from ActivityTable where amount = -1 and date < ? and userID = ? ORDER BY date DESC";
const deletePast = "delete from ActivityTable where amount = -1 and date < ? and userID = ?"
const mostrecent = "SELECT * FROM ActivityTable ORDER BY rowIdNum DESC LIMIT 1"
const allentriesmatching = "select *, sum(amount) as amount from ActivityTable where activity = ? and date >= ? and date <= ? and userID = ? group by date"
const addifnotalreadyin = "INSERT OR IGNORE INTO Profile(profileID, name) VALUES (?, ?)"
const getnamefromdb = "select * from Profile where profileID = ?"



async function addtodb(request){
  const data = request.body;
  let userid = request.user.userData.profileID;

  let date = new Date(data.date).getTime();
  //console.log(date);
  if(data.scalar == undefined){
    data.scalar = -1;
  }
  await db.run(insertDB,[data.activity, date, data.scalar,userid]);
  console.log("inserted items successfully");
}

// step 5
async function plannedactivities(request,response){
  const today = new Date().getTime();
  let userid = request.user.userData.profileID;
  console.log("plannedact"+ userid);

  let result = await db.all(futureact,[today,userid]);
  let mostrecentdate = result.date;

  response.send(JSON.stringify(result));

  await db.all(deletePast,[today,userid]);
  //.catch(console.log("Nothing planned"));

}

// step 7
async function entries(date,activity,userid){
  var pastWeek = Date();
  console.log("entries "+ userid);
  if(date == undefined){
    date = new Date().getTime();
    pastWeek = (date - 604800000);
  }
  else{
    pastWeek = (date - 604800000)
  }
  //let today = new Date().getTime();
  //let lastweek = (today - 604800000);  //gave up trying to subtract 7 days from a Date object, now i subtract 7 days worth of miliseconds.

  if(activity == undefined){ //check default express invalid value
    let latestentry = await db.all(mostrecent);
      if(latestentry.length > 0){
        activity = latestentry[0].activity;
      }
  }

  let result = await db.all(allentriesmatching,[activity,pastWeek,date,userid]);

  // for(var i = 0; i < result.length; i++){
  //   if(result[i].date == result[i+1].date){
      
  //   }
  // }

  // if(result.length < 7){
      //result.push({})
  // }

  return result;
}
entries();

function addtoprofiledb(userid,firstName){
  db.run(addifnotalreadyin,[userid,firstName]);
  console.log("Successflly added " + userid + firstName);
}

async function getuserdata(userid){
  let profilerow = await db.get(getnamefromdb,[userid]);
  return profilerow;
}

module.exports.addtodb = addtodb;
module.exports.plannedactivities = plannedactivities;
module.exports.entries = entries;
module.exports.addtoprofiledb = addtoprofiledb;
module.exports.getuserdata = getuserdata;
