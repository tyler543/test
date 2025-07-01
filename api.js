require('express');
require('mongodb');
// Add Card
// Incoming: userId, card
// Outgoing: error
exports.setApp = function( app, client){
app.post('/api/addcard', async (req, res, next) =>
{
// incoming: userId, color
// outgoing: error
const { userId, card, jwtToken } = req.body;
try
{
if( token.isExpired(jwtToken))
{
var r = {error:'The JWT is no longer valid', jwtToken: ''};
res.status(200).json(r);
return;
}
}
catch(e)
{
console.log(e.message);
}
const newCard = {Card:card,UserId:userId};
var error = '';
try
{
const db = client.db('COP4331Cards');
await db.collection('Cards').insertOne(newCard);
}
catch(e)
{
error = e.toString();
}
var refreshedToken = null;
try
{
refreshedToken = token.refresh(jwtToken);
}
catch(e)
{
console.log(e.message);
}
var ret = { error: error, jwtToken: refreshedToken };
res.status(200).json(ret);
});

// Login
// Incoming: login, password
// Outgoing: id, firstName, lastName, error
app.post('/api/login', async (req, res, next) =>
{
// incoming: login, password
// outgoing: id, firstName, lastName, error
var error = '';
const { login, password } = req.body;
const db = client.db('pockProf');
const results = await
db.collection('Users').find({Login:login,Password:password}).toArray
();
var id = -1;
var fn = '';
var ln = '';
var ret;
if( results.length > 0 )
{
id = results[0].UserId;
fn = results[0].FirstName;
ln = results[0].LastName;
try
{
const token = require("./createJWT.js");
ret = token.createToken( fn, ln, id );
}
catch(e)
{
ret = {error:e.message};
}
}
else
{
ret = {error:"Login/Password incorrect"};
}
res.status(200).json(ret);
var refreshedToken = null;
try
{
refreshedToken = token.refresh(jwtToken);
}
catch(e)
{
console.log(e.message);
}
var ret = { results:_ret, error: error, jwtToken: refreshedToken };
});
//Register API
//Incoming: login, password, firstName, lastName
//Outgoing id, firstName, lastName, error 
app.post("/api/register", async(req, res) => {
  const{ login ,password, firstName, lastName} = req.body;

  try{
    const db = client.db("pockProf");

    const existingUser = await db
      .collection("Users")
      .findOne({Login: login});

    let id = -1;
    let fn = "";
    let ln = "";
    let error = "";

    if(existingUser) {
      error = "Username is already taken";
    } else {
      // Insert the new user
      const newUser = {
        Login: login,
        Password: password,
        FirstName: firstName,
        LastName: lastName,
      };

      const result = await db.collection("Users").insertOne(newUser);

      id = result.insertedId.toString();
      fn = firstName;
      ln = lastName;
    }
    
    const ret = { id, firstName: fn, lastName: ln, error };
    res.status(200).json(ret);
  } catch (err) {
    console.error("Registration error:", err.message);
    res
      .status(500)
      .json({ id: -1, firstName: "", lastName: "", error: "Server error" });

  }
  console.log("BODY:", req.body);
});

// Search Cards
// Incoming: userId, search
// Outgoing: results[], error
app.post('/api/searchcards', async (req, res, next) =>
{
// incoming: userId, search
// outgoing: results[], error
var error = '';
const { userId, search, jwtToken } = req.body;
try
{
if( token.isExpired(jwtToken))
{
var r = {error:'The JWT is no longer valid', jwtToken: ''};
res.status(200).json(r);
return;
}
}
catch(e)
{
console.log(e.message);
}
var _search = search.trim();
const db = client.db();
const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*',
$options:'i'}}).toArray();
var _ret = [];
for( var i=0; i<results.length; i++ )
{
_ret.push( results[i].Card );
}
var refreshedToken = null;
try
{
refreshedToken = token.refresh(jwtToken);
}
catch(e)
{
console.log(e.message);
}
var ret = { results:_ret, error: error, jwtToken: refreshedToken };
res.status(200).json(ret);
});
}