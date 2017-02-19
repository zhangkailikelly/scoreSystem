var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
	global.data=JSON.parse(req.body.data);
	// if(global.data&&global.data.src!=""){
	// 	var base64=global.data.src.replace(/^data:image\/\w+;base64/,"");
	// 	console.log(base64);
	// 	var databuffer=new Buffer(base64,"base64");
	// 	fs.writeFile("bg.png",databuffer,function(err){
	// 		if(err){
	// 			console.log(err);
	// 		}
	// 		else{
	// 			console.log("图片保存成功");
	// 		}
	// 	})
	// }
	res.send("success")
});

module.exports = router;
