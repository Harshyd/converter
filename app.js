var express = require('express');
var app = express();
var cmd = require('node-cmd');
var nrc = require('node-run-cmd');
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
	res.redirect('/');
	//res.send("hey !");
	//res.send("hey ! express-file must have been uploaded !")
});


// =============================================================================

// cmd.run('C:');
// cmd.run('cd Program Files (x86)\VideoLAN\VLC');
// cmd.run('vlc -I dummy -vvv "C:\Users\Harsh\Downloads\videoplayback.3gpp" -- sout=#transcode{vcodec=none,acodec=mp3,ab=128,channels=2,samplerate=44100,scodec=none}:std{access=file{no-overwrite},mux=mp3,dst='C:/Users/Harsh/Desktop/4.mp3'}');

// =============================================================================


 app.get("/download",function(req,res){

cmd.run('C: & cd Program Files (x86)/VideoLAN/VLC & vlc -vvv \"C:/Users/Harsh/Downloads/videoplayback.3gpp\" --sout=#transcode{vcodec=none,acodec=mp3}:std{access=file{no-overwrite},mux=mp3,dst=\''+ __dirname+'/5.mp3\'}');
//cmd.run('cd Program Files (x86)/VideoLAN/VLC');
//cmd.run('vlc -vvv \"C:/Users/Harsh/Downloads/videoplayback.3gpp\" --sout=#transcode{vcodec=none,acodec=mp3}:std{access=file{no-overwrite},mux=mp3,dst=\''+ __dirname+'/5.mp3\'}');

setTimeout(function(){

	// res.download(__dirname + '/4.mp3',"4.mp3",function(err){
	// 	if(err) console.log(err);
	// 	else console.log('fine!');
res.send('hey!');
	},1000);


	});
	


// app.post("/",function(req,res){

// });

app.listen(process.env.PORT||3000,process.env.IP,function(){
console.log('server started !');
});

