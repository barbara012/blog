(function () {
	var $content = $('#post-content'),
		$title = $('#post-title'),
		$titleInput = $('.post-title_input'),
		$postBtn = $('#post-btn'),
		article = {},
		$post = $('#post');
	function Editor(input, preview) {
    	this.update = function () {
      		preview.innerHTML = markdown.toHTML(input.value);
      		$content.val(input.value);
      		$title.val(($titleInput.val() != '') ? $titleInput.val() : '最新文章');
    	};
    	input.editor = this;
    	this.update();
    }
  	var getObj = function (id) { return document.getElementById(id); };
  	new Editor(getObj("post"), getObj("preview"));

  	//提交
  	var sendAjax = function (url, data) {
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
  	$postBtn.click(function (e) {
  		if ($post.val() == '') {
  			return false;
  		}
  		var content = $('#post').val(),
  			tag = $('#tag').val(),
  			title = $('#title').val();
  		post = {};
  		post['content'] = content;
  		post['title'] = (title != null) ? title : content.substr(0, 10);
  		post['tag'] = tag;
  		sendAjax('/post', post);
  	});
})();