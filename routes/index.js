
/*
 * GET home page.
 */
var crypto = require('crypto'),
	fs = require('fs'),
    User = require('../models/user.js'),
    Post = require('../models/post.js'),
    Pic = require('../models/pic.js'),
    Comment = require('../models/comment.js');
module.exports = function (app) {
	app.get('/', function (req, res) {
	  //判断是否是第一页，并把请求的页数转换成 number 类型
	  var page = req.query.p ? parseInt(req.query.p) : 1;
	  //查询并返回第 page 页的 10 篇文章
	  Post.getTen(null, page, function (err, posts, total) {
	    if (err) {
	      posts = [];
	    } 
	    res.render('index', {
	      title: '首页',
	      posts: posts,
	      page: page,
	      isFirstPage: (page - 1) == 0,
	      isLastPage: ((page - 1) * 10 + posts.length) == total,
	      user: req.session.user,
	      success: req.flash('success').toString(),
	      error: req.flash('error').toString()
	    });
	  });
	});
//注册
	app.get('/reg', checkNotLogin);
	app.get('/reg', function (req, res) {
		res.render('reg', {
		    title: '注册',
		    user: req.session.user,
		    success: req.flash('success').toString(),
		    error: req.flash('error').toString()
		  });
	});
	app.post('/reg', checkNotLogin);
	app.post('/reg', function (req, res) {
		var name = req.body.username,
		     password = req.body.password,
		     password_re = req.body['password-repeat'];
		 //检验用户两次输入的密码是否一致
		 if (password_re != password) {
		   req.flash('error', '两次输入的密码不一致!'); 
		   return res.redirect('/reg');//返回注册页
		 }
		 //生成密码的 md5 值
		 var md5 = crypto.createHash('md5'),
		     password = md5.update(req.body.password).digest('hex');
		 var newUser = new User({
		     name: req.body.username,
		     password: password,
		     email: req.body.email
		 });
		 //检查用户名是否已经存在 
		   User.get(newUser.name, function (err, user) {
		     if (user) {
		       req.flash('error', '用户已存在!');
		       return res.redirect('/reg');//返回注册页
		     }
		     //如果不存在则新增用户
		     newUser.save(function (err, user) {
		       if (err) {
		         req.flash('error', err);
		         return res.redirect('/reg');//注册失败返回主册页
		       }
		       req.session.user = user;//用户信息存入 session
		       req.flash('success', '注册成功!');
		       res.redirect('/');//注册成功后返回主页
		     });
		   });

	});
//登录
	app.get('/login', checkNotLogin);
	app.get('/login', function (req, res) {
		res.render('login', {
	        title: '登录',
	        user: req.session.user,
	        success: req.flash('success').toString(),
	        error: req.flash('error').toString()});
	});
	app.post('/login', checkNotLogin);
	app.post('/login', function (req, res) {
		//生成密码的 md5 值
		var md5 = crypto.createHash('md5'),
			password = md5.update(req.body.password).digest('hex');
		  //检查用户是否存在
		User.get(req.body.username, function (err, user) {
			if (!user) {
				req.flash('error', '用户不存在!'); 
				return res.send(
					{
						'type': 1,
						'mes': '用户不存在'
					}
				);//用户不存在则跳转到登录页
			}
			//检查密码是否一致
			if (user.password != password) {
				req.flash('error', '密码错误!'); 
				return res.send(
					{
						'type': 2,
						'mes': '密码错误'
					}
				);//密码错误则跳转到登录页
			}
			//用户名密码都匹配后，将用户信息存入 session
			req.session.user = user;
			req.flash('success', '登陆成功!');
			res.send(
					{
						'type': 3,
						'mes': '登录成功'
					}
			)
		});
	});
//发布
	app.get('/post', checkLogin);
	app.get('/post', function (req, res) {
		res.render('post', {
	        title: '发布',
	        user: req.session.user,
	        success: req.flash('success').toString(),
	        error: req.flash('error').toString()});
	});
	app.post('/post', checkLogin);
	app.post('/post', function (req, res) {
		var currentUser = req.session.user,
			md5 = crypto.createHash('md5'),
			tags = req.body.tag.split('，'),
			email_MD5 = md5.update(currentUser.email.toLowerCase()).digest('hex'),
			head = "http://www.gravatar.com/avatar/" + email_MD5 + "?s=60",
		    post = new Post(currentUser.name, head, req.body.title, tags, req.body.content);
			post.save(function (err) {
			   	if (err) {
			    	req.flash('error', err); 
			    	return res.redirect('/');
			   	}
			    req.flash('success', '发布成功!');
			    res.redirect('/');//发表成功跳转到主页
			});
	});
	//登出
	app.get('/logout', checkLogin);
	app.get('/logout', function (req, res) {
		req.session.user = null;
		req.flash('success', '登出成功!');
		res.redirect('/');//登出成功后跳转到主页
	});

//相册
	app.get('/album', checkLogin);
	app.get('/album', function (req, res) {
		var page = page = req.query.p ? parseInt(req.query.p) : 1;
		//查询并返回第 page 页的 10 篇文章
		Pic.getTen(null, page, function (err, imgs, total) {
			if (err) {
				imgs = [];
			} 
			res.render('album', {
				title: '首页',
				imgs: imgs,
				page: page,
				isFirstPage: (page - 1) == 0,
				isLastPage: ((page - 1) * 10 + imgs.length) == total,
				user: req.session.user,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
	    	});
		});
	});
//上传文件
	app.get('/upload', checkLogin);
	app.get('/upload', function (req, res) {
	  	res.render('upload', {
	    	title: '文件上传',
	    	user: req.session.user,
	    	success: req.flash('success').toString(),
	    	error: req.flash('error').toString()
	  });
	});
	app.post('/upload', checkLogin);
	app.post('/upload', function (req, res) {
		var dbpic = [],
			blobArr,
			pic;
	  	for (var i in req.files) {
	    	if (req.files[i].size == 0){
	      // 使用同步方式删除一个文件
	     		fs.unlinkSync(req.files[i].path);	     		
	      		console.log('Successfully removed an empty file!');
	    	} else {
	      		var target_path = './public/images/dbimg/' + req.files[i].name;	      		
	      // 使用同步方式重命名一个文件
	      		fs.renameSync(req.files[i].path, target_path);
	      		var dbImgUrl = '/images/dbimg/' + req.files[i].name;
	      		var date = new Date();
	      		var time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
	    			date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
	    		blobArr = {};
	    		blobArr.time = time;
	    		blobArr.pic = dbImgUrl;
	      		dbpic.push(blobArr);
	    	}
		}
		pic = new Pic(dbpic);
	    pic.save(function(){});
		req.flash('success', '文件上传成功!');
		res.redirect('/upload');
	});

	//获得用户信息
	app.get('/u/:name', function (req, res) {
	  var page = req.query.p ? parseInt(req.query.p) : 1;
	  //检查用户是否存在
	  User.get(req.params.name, function (err, user) {
	    if (!user) {
	      req.flash('error', '用户不存在!'); 
	      return res.redirect('/');
	    }
	    //查询并返回该用户第 page 页的 10 篇文章
	    Post.getTen(user.name, page, function (err, posts, total) {
	      if (err) {
	        req.flash('error', err); 
	        return res.redirect('/');
	      } 
	      res.render('user', {
	        title: user.name,
	        posts: posts,
	        page: page,
	        isFirstPage: (page - 1) == 0,
	        isLastPage: ((page - 1) * 10 + posts.length) == total,
	        user: req.session.user,
	        success: req.flash('success').toString(),
	        error: req.flash('error').toString()
	      });
	    });
	  }); 
	});
	//检索文章
	app.get('/search', function (req, res) {
	  Post.search(req.query.keyword, function (err, posts) {
	    if (err) {
	      req.flash('error', err); 
	      return res.redirect('/');
	    }
	    res.render('search', {
	      title: "SEARCH:" + req.query.keyword,
	      posts: posts,
	      user: req.session.user,
	      success: req.flash('success').toString(),
	      error: req.flash('error').toString()
	    });
	  });
	});
	//获取存档
	app.get('/archive', function (req, res) {
	  Post.getArchive(function (err, posts) {
	    if (err) {
	      req.flash('error', err); 
	      return res.redirect('/');
	    }
	    res.render('archive', {
	      title: '存档',
	      posts: posts,
	      user: req.session.user,
	      success: req.flash('success').toString(),
	      error: req.flash('error').toString()
	    });
	  });
	});
	//获取标签
	app.get('/tags', function (req, res) {
	  Post.getTags(function (err, posts) {
	    if (err) {
	      req.flash('error', err); 
	      return res.redirect('/');
	    }
	    res.render('tags', {
	      title: '标签',
	      posts: posts,
	      user: req.session.user,
	      success: req.flash('success').toString(),
	      error: req.flash('error').toString()
	    });
	  });
	});
	//获取当前标签下的文章
	app.get('/tags/:tag', function (req, res) {
	  	Post.getTag(req.params.tag, function (err, posts) {
	    	if (err) {
	      		req.flash('error',err); 
	      		return res.redirect('/');
	    	}
	    	res.render('tag', {
	      		title: 'TAG:' + req.params.tag,
	      		posts: posts,
	      		user: req.session.user,
	      		success: req.flash('success').toString(),
	      		error: req.flash('error').toString()
	    	});
	  	});
	});
	//获得用户文章
	app.get('/p/:id', function (req, res) {
	  	Post.getOne(req.params.id, function (err, post) {
	    	if (err) {
	      		req.flash('error', err); 
	      		return res.redirect('/');
	    	}
	    	res.render('article', {
	    		title: '文章',
	     		post: post,
	      		user: req.session.user,
	      		success: req.flash('success').toString(),
	      		error: req.flash('error').toString()
	    	});
	  	});
	});
	//留言
	app.post('/p/:id', function (req, res) {
	  	var date = new Date(),
	     	time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
	             date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
	       	md5 = crypto.createHash('md5'),
           	email_MD5 = md5.update(req.body.email.toLowerCase()).digest('hex'),
           	head = "http://www.gravatar.com/avatar/" + email_MD5 + "?s=60"; 
	  		comment = {
			    name: req.body.name,
			    head: head,
			    email: req.body.email,
			    time: time,
			    content: req.body.content
			};
	  	var newComment = new Comment(req.params.id, comment);
	  	newComment.save(function (err) {
	    	if (err) {
	      		req.flash('error', err); 
	      		return res.redirect('back');
	    	}
	    	req.flash('success', '留言成功!');
	    	res.redirect('back');
	  	});
	});

//编辑文章
	app.get('/edit/:id', checkLogin);
	app.get('/edit/:id', function (req, res) {
	  	var currentUser = req.session.user;
	  	Post.edit(req.params.id, function (err, post) {
	    	if (err) {
	      		req.flash('error', err); 
	      		return res.redirect('back');
	    	}
	    	res.render('edit', {
	      		title: '编辑',
	      		post: post,
	     		user: req.session.user,
	      		success: req.flash('success').toString(),
	      		error: req.flash('error').toString()
	    	});
	  	});
	});
//保存文章
	app.post('/edit/:id', checkLogin);
	app.post('/edit/:id', function (req, res) {
	  	var currentUser = req.session.user,
	  		tags = req.body.tag.split('，');
	  	Post.update(req.params.id , tags, req.body.title, req.body.content, function (err) {
	    	var url = '/p/' + req.params.id;
	    	if (err) {
	    		console.log('err');
	      		req.flash('error', err); 
	      		return res.redirect(url);//出错！返回文章页
	    	}
	    	console.log('get ok');
	    	req.flash('success', '修改成功!');
	    	// res.redirect(url);//成功！返回文章页
	  	});
	});
//删除文章
	app.get('/remove/:name/:minute/:title', checkLogin);
	app.get('/remove/:name/:minute/:title', function (req, res) {
	  var currentUser = req.session.user;
	  Post.remove(currentUser.name, req.params.minute, req.params.title, function (err) {
	    if (err) {
	      req.flash('error', err); 
	      return res.redirect('back');
	    }
	    req.flash('success', '删除成功!');
	    res.redirect('/');
	  });
	});
	
	//转载
	app.get('/reprint/:name/:minute/:title', checkLogin);
	app.get('/reprint/:name/:minute/:title', function (req, res) {
	  	Post.edit(req.params.name, req.params.minute, req.params.title, function (err, post) {
	    	if (err) {
	      		req.flash('error', err); 
	      		return res.redirect(back);
	    	}
	    	var currentUser = req.session.user,
	        	reprint_from = {name: post.name, minute: post.time.minute, title: post.title},
	        	reprint_to = {name: currentUser.name, head: currentUser.head};
	    	Post.reprint(reprint_from, reprint_to, function (err, post) {
	      		if (err) {
	        		req.flash('error', err); 
	        		return res.redirect('back');
	      		}
	      		req.flash('success', '转载成功!');
	      		var url = '/u/' + post.name + '/' + post.time.minute + '/' + post.title;
	      		//跳转到转载后的文章页面
	      		res.redirect(url);
	    	});
	  	});
	});	

	//	404
	app.use(function (req, res) {
	  	res.render("404");
	});
	//判断是否登录
	function checkLogin(req, res, next) {
	  	if (!req.session.user) {
	    	req.flash('error', '未登录!'); 
	    	res.redirect('/login');
	  	}
	  	next();
	}

	function checkNotLogin(req, res, next) {
	  	if (req.session.user) {
	    	req.flash('error', '已登录!'); 
	    	res.redirect('back');//返回之前的页面
	  	}
	  	next();
	}
};