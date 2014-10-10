(function () {
	var $articleBtn = $('.article-btn'),
		$article = $('.article'),
		$edit = $('.posted_edit'),
		$item = $('.title-item'),
		$operationEdit = $('.operation-group .edit'),
		$operationDelete = $('.operation-group .delete'),
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
					$operationEdit.prop('href', '/edit/' + mes._id);
					$operationDelete.prop('href', '/delete/' + mes._id);
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
})();
