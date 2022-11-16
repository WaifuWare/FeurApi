const express = require('express')
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require("body-parser");

let db = new sqlite3.Database('./Players.db', sqlite3.OPEN_READWRITE);

const api = express()

api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

api.get('/member', (req, res) =>
{

	if(req.query.member === undefined){
        let json = {
            returnCode: 403,
            message: "you forgot the query 'member'"
        }

        res.json(json)
    }else{

	db.each("SELECT * FROM Players WHERE UUID='" + req.query.member + "';", (err, row) => {
		if(row.UUID === undefined){
			let json = {
                		returnCode: 404,
		                message: "you are not a member of FeurGroup or whitelisted to one of our base, but you can join us to fix that mistake here : discord.gg/ReK658v4bs"
            		}
		        res.json(json)
		}else{
			let json = {
                		returnCode: 200,
                		message: row.UUID,
	                	canAccessAllBases: row.canAccessAllBases,  
		                assignedBase: row.base
            		}

			res.json(json)

		}
	});

	}
});


api.post('/add', (req, res) => 
{
	
	let message;

	if(req.body.password == "password")
	{
		if(req.body.username === undefined){
			message = "No username was given";	
		}
		else if(req.body.AllClear === undefined){
			message = "no perms were given";
		}else if(req.body.base === undefined) {
			message = "no base were given";
		}else{
			message = "all of the data are clean, adding them to DB";
			db.run("INSERT INTO Players VALUES('" + req.body.username + "', '"+ req.body.AllClear +"', '"+ req.body.base +"')");
		}
	}else{
		message = "The given password is incorrect";
	}
	
	let json = {
		response: message
	}
	res.json(json);
})

api.post('/remove', (req, res) => 
{
	
	let message;

	if(req.body.password == "password")
	{
		if(req.body.username === undefined){
			message = "No username was given";	
		}else{
			message = "username and passwords are correct, deleting.";
			db.run("DELETE FROM Players WHERE UUID='" + username + "'");
		}
	}else{
		message = "The given password is incorrect";
	}
	
	let json = {
		response: message
	}
	res.json(json);
})

/*
player_db.insert({username : 'noctoack', canAccessToAllBases : 'no', assignedBase : 'degand'})
player_db.insert({username : 'fox1', canAccessToAllBases : 'no', assignedBase : 'degand'})
player_db.insert({username : 'painsaga', canAccessToAllBases : 'no', assignedBase : 'degand'})
*/
api.listen("4200", () => {
    console.log("FeurAPI a été demarré, FeurGroup on TOP")
})

