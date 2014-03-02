(function () {
	var $username = $('#username'), //登录 -用户名
		$password = $('#password'), //登录--密码

		$passwordTip = $('.password-tip'), //密码错误提示
		$usernameTip = $('.username-tip'), //用户名错误提示

		$regNameTip = $('.reg_name-tip'), //注册用户名提示
		$regEmailTip = $('.reg_email-tip'), //注册邮箱提示
		$regPassTip = $('.reg_pass-tip'), //注册密码提示	
		$regRepeatTip = $('.reg_repeat-tip'), //注册密码重复提示

		$regUsername = $('#reg_username'), //注册--用户名
		$regEmail = $('#reg_email'), //注册--邮箱
		$regPassword = $('#reg_password'), //注册--密码		
		$regPasswordRepeat  = $('#reg_password-repeat'), //注册--重复密码

		$btnLogin = $('.btn-login'), //登录按钮
		$btnReg = $('.btn-reg'), //注册按钮

		$showReg = $('.show-reg'), //打开注册窗口

		$login = $('#login'), //登录窗口
		$reg = $('.reg'), //注册窗口

		$returnLogin = $('.return-log'), //返回登录窗口
		data,

		tipCssReset = {
			left: '220px',
			opacity: 0
		},
		tipCssSet = {
			left: '224px',
			opacity: 1
		},
		logCssSet = {
			'margin-left': '-260px'
		},
		logCssReset = {
			'margin-left': '-110px'
		},
		regCssSet = {
			'left': '260px',
			'opacity': '1',
			'z-index': 220
		},
		regCssReset = {
			'left': '220px',
			'opacity': 0,
			'z-index': -200
		},
		lrAjax = function (url, data, option) {
			$.ajax(
				{
					type: 'POST',
					url: url,
					data: data,
					success: function (mes) {
						if (option === 'log') {
							if (mes['type'] === 1) {
								$usernameTip.css(tipCssSet);
							} else if (mes['type'] === 2){
								$passwordTip.css(tipCssSet);
							} else {
								location.href = '/';
							}
						} else {
							if (mes['type'] === 1) {
								$regNameTip.css(tipCssSet);
							} else {
								location.href = '/';
							}
						}						
					}
				}
			)
		};	
	$username.focus(function () {
		$usernameTip.css(tipCssReset)
					.find('p').text('用户名不存在！');
	});
	$password.focus(function () {
		$passwordTip.css(tipCssReset);
	});
	$regUsername.focus(function () {
		$regNameTip.css(tipCssReset)
				.find('p').text('用户名已存在！');
	});
	$regPassword.focus(function () {
		$regPassTip.css(tipCssReset);
	});
	$regPasswordRepeat.focus(function () {
		$regRepeatTip.css(tipCssReset);
	});
	$regEmail.focus(function () {
		$regEmailTip.css(tipCssReset);
	});

	$btnLogin.click(Login);
	$(document).keydown(function (e) {
		if (e.keyCode === 13) {
			Login();
		}
	});
	function Login () {
		if (!$username.val()) {
			$usernameTip.addClass('input-tip')
						.css(tipCssSet)
						.find('p').text('请输入用户名！');
			return false;
		} 
		data = {};
		data['username'] = $username.val();
		data['password'] = $password.val();

		lrAjax(location.pathname, data, 'log');
	}
	//show register
	$showReg.click(function () {
		$usernameTip.css(tipCssReset)
					.find('p').text('用户名不存在！');		
		$passwordTip.css(tipCssReset);
		$login.addClass('matte').css(logCssSet);
		var t = setTimeout(
			function () {
				$reg.css(regCssSet)
			},
			200
		);
		
	});
	//返回登录窗口
	$returnLogin.click(function () {
		$regNameTip.css(tipCssReset)
				.find('p').text('用户名已存在！');
		$regPassTip.css(tipCssReset);
		$regRepeatTip.css(tipCssReset);
		$regEmailTip.css(tipCssReset);

		$reg.css(regCssReset);
		var t = setTimeout(
			function () {
				$login.removeClass('matte').css(logCssReset)
			},
			200
		);
	});
	//注册提交，信息校验
	$btnReg.click(function () {
		if (!$regUsername.val()) {
			$regNameTip.addClass('input-tip')
					   .css(tipCssSet)
					   .find('p').text('请输入用户名！');
			return false;
		}

		if (!$regPassword.val()) {
			$regPassTip.css(tipCssSet);
			return false;
		};

		if ($regPassword.val() != $regPasswordRepeat.val()) {
			$regRepeatTip.css(tipCssSet);
			return false;
		}

		if ($regEmail.val() && !(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test($regEmail.val()))) {
			$regEmailTip.css(tipCssSet);
			return false;
		}

		data = {};
		data['regUserName'] = $regUsername.val();
		data['regPassword'] = $regPassword.val();
		data['regEmail'] = $regEmail.val();
		lrAjax('/reg', data, 'reg');

	});
})();