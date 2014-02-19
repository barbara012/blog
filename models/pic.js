var mongodb = require('./db');

function Pic (pic) {
	this.pic = pic;
};

module.exports = Pic;

//保存上传的图片
Pic.prototype.save = function (callback) {
	var date = new Date();
	//存储各种时间格式，方便以后扩展
	var time = {
	    date: date,
	    year : date.getFullYear(),
	    month : date.getFullYear() + "-" + (date.getMonth() + 1),
	    day : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
	    minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
	    date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) 
	};
	var arrPic = this.pic;
	//要存入数据库的文档
	//打开数据库
	mongodb.open(function (err, db) {
		if (err) {
			return callback(err);
		};
		//读取 pics 集合
		db.collection('pics', function (err, collection) {
		  	if (err) {
		    	mongodb.close();
		    	return callback(err);
		  	};
		  //将文档插入 pics 集合
		  	for (var i = 0; i < arrPic.length; i++) {
		  		console.log(arrPic[i].pic+ ',' + i);
		  		collection.insert(arrPic[i], {safe: true}, function (err) {
		  			//mongodb.close();
			  	  	if (err) {
			  	    		return callback(err);//失败！返回 err
			  	  	};
		  		});
		  		
		  	};
		  	
		});
		mongodb.close()
	});
};