'use strict'

// using a Promises-wrapped version of sqlite3
const db = require('./sqlWrap');

// SQL commands for ActivityTable
const insertDB = "insert into ActivityTable (activity, date, amount) values (?,?,?)"
const getOneDB = "select * from ActivityTable where activity = ? and date = ? and amount = ?";
const allDB = "select * from ActivityTable where activity = ?";
const futureact = "select * from ActivityTable where amount = -1 and date < ? ORDER BY date DESC";
const deletePast = "delete from ActivityTable where amount = -1 and date < ?"
const mostrecent = "SELECT * FROM ActivityTable ORDER BY rowIdNum DESC LIMIT 1"
// const allentriesmatching = "select * from ActivityTable where activity = ? and date between ? and ?"
const allentriesmatching = "select *, sum(amount) as amount from ActivityTable where activity = ? and date >= ? and date <= ? group by date"

async function testDB () {

  // for testing, always use today's date
  const today = new Date().getTime();

  // all DB commands are called using await

  // empty out database - probably you don't want to do this in your program
  await db.deleteEverything();

  await db.run(insertDB,["running",today,2.4]);
  await db.run(insertDB,["walking",today,1.1]);
  await db.run(insertDB,["walking",today,2.7]);
  
  console.log("inserted two items");

  // look at the item we just inserted
  let result = await db.get(getOneDB,["running",today,2.4]);
  console.log(result);

  // get multiple items as a list
  result = await db.all(allDB,["walking"]);
  console.log(result);
}

async function addtodb(request){
  const data = request.body;

  let date = new Date(data.date).getTime();
  console.log(date);
  if(data.scalar == undefined){
    data.scalar = -1;
  }
  await db.run(insertDB,[data.activity, date, data.scalar]);
  console.log("inserted items successfully");
}

// step 5
async function plannedactivities(request,response){
  const today = new Date().getTime();

  let result = await db.all(futureact,[today]);
  let mostrecentdate = result.date;

  response.send(JSON.stringify(result));

  await db.all(deletePast,[today]);
  //.catch(console.log("Nothing planned"));

}

// step 7
async function entries(date,activity){
  var pastWeek = Date();
  //console.log(date);
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

  let result = await db.all(allentriesmatching,[activity,pastWeek,date]);

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

module.exports.testDB = testDB;
module.exports.addtodb = addtodb;
module.exports.plannedactivities = plannedactivities;
module.exports.entries = entries;
