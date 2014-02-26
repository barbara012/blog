(function () {
	var $name = $('#form_comment_name'),
		$email = $('#form_comment_email'),
		$comment = $('#form_comment_content'),
		data,

		commentAjax = function (url, data) {
			$.ajax(
				{
					type: 'POST',
					url: url,
					data: data,
					success: function () {
						console.log(12);
					}
				}
			)
		};

	$('.btn-comment').click(function () {

		
		if (!$comment.val()) return false;

		data = {};
		data['name'] = $name.val() ? $name.val() : '匿名';
		data['email'] = $email.val() ? $email.val() : '838186163@qq.com';
		data['content'] = $comment.val();

		commentAjax(location.pathname, data);

	});
})();