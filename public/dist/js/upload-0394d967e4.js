$(function(){function e(e,a,n){if("undefined"==typeof FormData)throw new Error("FormData is not implemented");var t=new XMLHttpRequest;t.open("POST",e),t.onreadystatechange=function(){4===t.readyState&&n&&n(t)};var d=new FormData;for(var r in a)if(a.hasOwnProperty(r)){var i=a[r];"function"!=typeof i&&d.append(r,i)}t.send(d)}$(document).on({dragleave:function(e){e.preventDefault()},drop:function(e){e.preventDefault()},dragenter:function(e){e.preventDefault()},dragover:function(e){e.preventDefault()}});var a,n,t=document.getElementById("upload-drag"),d=0,r={},i="/upload",o=$('<div class="modal fade" data-keyboard="true" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"></div>').append('<div class="modal-header"><h3 id="myModalLabel">提示</h3></div>').append('<div class="modal-body"><p>你拖的不图片！</p></div>'),l=function(e){var a=e.parent("a").data("file");e.parent("a").remove(),a in r&&delete r[a]},f=function(){return $('<a href="#"></a>').addClass("thumbnail").append($('<a href="#" data-toggle="tooltip" title="删除">&times;</a>').addClass("close-img").click(function(){l($(this))}))};t.addEventListener("drop",function(e){e.preventDefault();var t=e.dataTransfer.files;if(0==t.length)return!1;if(t[0].type.indexOf("image")===-1)return o.modal(),!1;window.URL=window.URL||window.webkitURL;var i=window.URL.createObjectURL(t[0]),l=(t[0].name,Math.floor(t[0].size/1024));if(l>500)return alert("上传大小不能超过500K."),!1;var p="<img src='"+i+"'>";a=f(),d+=1,n="file"+d,r[n]=t[0],a.append(p).data("file",n),$("#upload-drag").append(a)},!1),$(".upload-submit").click(function(){""!=t.innerHTML&&e(i,r,function(){t.innerHTML="",r=[],d=0})})});