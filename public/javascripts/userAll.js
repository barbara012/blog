(function () {
	var $articleBtn = $('.article-btn'),
		$article = $('.article'),
		$hidden = $('.hidden'),
		$edit = $('.posted_edit'),
		$item = $('.title-item'),
		$editObj = $('<a></a>').prop('href', '/edit/' + $hidden.val()).text('编辑'),
		$deleteObj = $('<a></a>').prop('href', '/delete/' + $hidden.val()).text('删除'),
		container = $('<div></div>').append($editObj).append($deleteObj);
		getOneAjax = function (url) {
		$.ajax(
			{
				type: 'get',
				url: url,
				cache: true,
				success: function (mes) {
					if ((typeof mes) == 'string') {
						return false;
					}
					$('.popover').remove();
					$article.html('<h2 class="txt-center">' + mes.title + '</h2>' + mes.post);
					$editObj.prop('href', '/edit/' + mes._id).text('编辑');
					$deleteObj.prop('href', '/delete/' + mes._id).text('删除');
					container.empty().append($editObj).append($deleteObj);
					console.log(container);					
				}
			}
		)
	};

	$articleBtn.click(function () {
		var id = $(this).data('id');
		var name = $(this).data('name');
		var url = '/posted/' + name + '/' + id;
		$item.removeClass('active');
		$(this).parent('div').addClass('active');
		getOneAjax(url);
	});
	PopTip.showPop($('.set'), null, container, null, null, 'default');
})();
