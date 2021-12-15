const express = require('express')
const app = express()
app.use(express.static('hen'))
var mongojs = require('mongojs');
var cstring = "mongodb+srv://subbureddy:subbureddy@cluster0.oknkt.mongodb.net/van?retryWrites=true&w=majority"
var db = mongojs(cstring,['plant'])
app.set('view engine','ejs')



 
app.get('/hello', function (req, res) {
  res.sendFile(__dirname+'/hen/home.html')
})
app.get('/signupsubmitup',function(req,res){
      var d = {
      	firstname:req.query.nam,
      	username:req.query.user,
      	email:req.query.mail,
      	password:req.query.pswd,
      	dob:req.query.date

      }
 db.plant.insert(d,function(err,docs){
  	if (err)
        res.send("something went wrong,please try again")
    else
    	res.sendFile(__dirname+'/hen/login.html')
  })
})
app.get('/login',function(req,res){
      var d = {
      	password:req.query.passwd,
      	email:req.query.email,

      }
db.plant.find(d,function(err,docs){
  	if (err){
        res.send("something went wrong,please try again")
  	}
    if(docs.length>0){
    	db.plant.find({},function(err,docs){
    		if(err) {
    			res.send("something went wrong")
    		}
            else {
    	        res.render("dashboard",{result: docs})
            }
	
        })
    } 
    else{
    	res.send("please check")
    }
})
})
app.get('/place',function(req,res){
	res.sendFile(__dirname+'/hen/place.html')
})
app.get('/team',function(req,res){
	res.sendFile(__dirname+'/hen/team.html')
})
app.get('/update',function(req,res){
	res.sendFile(__dirname+'/hen/update.html')
})

app.get('/donate',function(req,res){
	res.sendFile(__dirname+'/hen/donate.html')
})




app.listen(3000)
