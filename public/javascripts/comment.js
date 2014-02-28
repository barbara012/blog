(function () {
	var $name = $('#form_comment_name'),
		$email = $('#form_comment_email'),
		$comment = $('#form_comment_content'),
		$comments = $('.comments'),
		$aboutAuthor = $('.about_author'),
		$singlePage = $('.singlepage'),
		data,
		timeFlag = 0;
		tipCss = {
			'right': '116px',
			'opacity': 1
		},
		tipCssReset = {
			'right': '110px',
			'opacity': 0
		},
		setHeight = function () {
			$aboutAuthor.css('height', $singlePage.height());
		},
		commentAjax = function (url, data) {
			$.ajax(
				{
					type: 'POST',
					url: url,
					data: data,
					success: function (comment) {
						$('<div class="commented pos-rela"></div>')
							.append($('<a class="comment_head pos-abso"></a>').append($('<img src="' + comment.head + '">')))
							.append(
								$('<div class="comment_content"></div>')
									.append($('<p>' + comment.content + '</p>'))
									.append(
										$('<p class="info"></p>')
											.append($('<a href="javascript:;">' + comment.name + '</a>'))
											.append($('<span>回复于' + comment.time + '</span>'))
									)
								)
							.prependTo($comments);
						$('.time-tip').css(tipCssReset);
						timeFlag = 0;
					}
				}
			)
		};

	setHeight();

	$('.btn-comment').click(function () {

		if (timeFlag === 1) {
			$('.time-tip').css(tipCss);
			return false;
		}
		if (!$comment.val()) return false;

		data = {};
		data['name'] = $name.val() ? $name.val() : '匿名';
		data['email'] = $email.val() ? $email.val() : '838186163@qq.com';
		data['content'] = $comment.val();
		console.log(data);
		commentAjax(location.pathname, data);
		
		timeFlag = 1;
		setHeight();

	});
})();