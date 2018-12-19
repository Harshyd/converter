var express = require('express');
var app = express();
var cmd = require('node-cmd');
var nrc = require('node-run-cmd');
var curfile;
var cfile=1;

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage})

app.use(express.static(__dirname));

app.get('/',function(req,res)
{
	res.sendFile(__dirname + "/public/" + "index.html");
});

app.post('/upload',upload.single('foo'),function(req,res){
	curfile = req.file.originalname;
	console.log(cfile);

cmd.run('C: & cd Program Files (x86)/VideoLAN/VLC & vlc -I dummy -vvv "F:\\git\\converter\\uploads\\'+curfile+'" --sout=#transcode{vcodec=none,acodec=mp3,ab=128,channels=2,samplerate=44100,scodec=none}:std{access=file{no-overwrite},mux=mp3,dst=F:\\git\\converter\\downloads\\harsh'+cfile+'.mp3}');

	res.redirect('/');
	
});


 app.get("/download",function(req,res){



	res.download(__dirname + '/downloads/harsh'+cfile+'.mp3',"harsh"+cfile+".mp3",function(err){
		if(err) console.log(err);
		else {console.log('fine!');cfile++;}});


});

app.listen(process.env.PORT||3000,process.env.IP,function(){
console.log('server started !');
});

