!function(){var t=($("#post-content"),$("#post-title"),$(".post-title_input"),$("#post-btn")),o=$("#post"),n=function(t,o){$.ajax({type:"POST",url:t,data:o,success:function(t){location.href=t.url}})};t.click(function(t){if(""==o.val())return!1;var s=$("#post").val(),l=$("#tag").val().replace(/(，)|(\t)|(,)|(-)|(\.)|(:)|(--)|(\s)|(：)|(。)|(\|)/g,";"),a=$("#title").val();post={},post.content=s,post.title=null!=a?a:s.substr(0,10),post.tag=l,console.log(post.content),n(location.pathname,post,1)})}();