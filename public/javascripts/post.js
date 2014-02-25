(function () {
	var $content = $('#post-content'),
		$title = $('#post-title'),
		$titleInput = $('.post-title_input'),
		$postBtn = $('#post-btn');
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

  	//为空时提交
  	$postBtn.submit(function (e) {
  		if ($content.val() == '') {
  			e.preventDefault();
  		}
  	});
})();