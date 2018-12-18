var express = require('express');
var app = express();
//var file = require("express-fileupload");
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage})
//app.use(file());

app.use(express.static(__dirname));

app.get('/',function(req,res)
{
	res.sendFile(__dirname + "/public/" + "index.html");
});

app.post('/upload',upload.single('foo'),function(req,res){
	//res.send("hey !");

res.send("hey ! express-file must have been uploaded !")
});

app.get("/download",function(req,res){
	res.download(__dirname + '/app.js',"app.js",function(err){
		if(err) console.log(err);
		else console.log('fine!');
	});
});

app.post("/",function(req,res){

});

app.listen(process.env.PORT||3000,process.env.IP,function(){
console.log('server started !');
});

