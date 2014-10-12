var PopTip = {
	targetElement: "",
	flag: 0,
	setTitle: function (title) {
		return $('<div></div>').addClass('title').text(title);
	},
	setContent: function (content) {
		return $('<div class="pop-content"></div>').append(content);
	},
	setButton: function (button) {
		return $('<div class="pop-footer clearfix"></div>').append(button);
	},
	createContainer: function () {
		return $('<div></div>').addClass('popover').addClass('pop-tip');
	},
	closePop: function () {
		$('.popover').stop().animate(
			{
				opacity: 0,
				top: '-4px'
			},
			100,
			function () {
				$(this).detach();
			}
		)
	},
	showPop: function (target, type, content, title, button, theme) {
		this.type = type ? type : 'click';
		this.content = content ? content: '';
		this.title = title ? title: '';
		this.button = button ? button: '';
		this.theme = theme ? theme: 'default';
		var _this = this;
		target.on(_this.type, function () {
			if (_this.flag === 1) {
				_this.closePop();
				_this.flag = 0;
				return false;
			}
			var $container = _this.createContainer(),
				$title = _this.setTitle(_this.title),
				$content = _this.setContent(_this.content),
				$button = _this.setButton(_this.button),
				$arrow = $('<span class="pop-arrow"></span>'),
				targetOffset = $(this).offset(),
				targetLeft = parseInt(targetOffset.left),
				targetTop = parseInt(targetOffset.top),
				targetHeight = parseInt($(this).outerHeight(true)),
				targetWidth = parseInt($(this).outerWidth(true)),
				documentWidth = parseInt($(document).width()),
				cssSet = {},
				h,
				w;

			$container.append($arrow).append($title)
					  .append($content)
					  .append($button)
					  .addClass(theme)
					  .appendTo(target);
			_this.flag = 1;
			return false;
		});
		$(document).click(function (e) {
			if (_this.flag === 1) {
				_this.closePop();
				_this.flag = 0;
			}
		});
	}
};
