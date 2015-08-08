$(function upload() {
		var preview = {
				init: function() {
						preview.setPreviewImg();
						preview.listenInput();
				},
				setPreviewImg: function(fieldImg) {
						var path = $(fieldImg).val();
						var fieldUpload = $(fieldImg).siblings('.field-file-upload');

						if (!path) {
								$(fieldUpload).val('upload photo');
						} else {
								path = path.replace(/^C:\\fakepath\\/, "");
								$(fieldUpload).val(path);

								preview.showPreview(fieldImg, path);
						}
				},
				showPreview: function(fieldImg, path) {
						var file = $(fieldImg)[0].files;

						if (file && file[0]) {
								var reader = new FileReader();
								var fieldUpload = $(fieldImg).siblings('.field-file-upload');

								reader.onload = function(e) {
										var previewImg = $(fieldImg).parent().siblings('.preview');
										var img = $(previewImg).find('img');

										if (img.length == 0) {
												$(previewImg).html('<img src="' + e.target.result + '" alt=""/>');
										} else {
												img.attr('src', e.target.result);
										}

										fieldUpload.val(path);
								}

								reader.onloadstart = function() {
										$(fieldUpload).val('uploading..');
								}

								reader.readAsDataURL(file[0]);
						}
				},
				listenInput: function() {
						$('.field-file-upload-native').on('change', function() {
								preview.setPreviewImg(this);
						});
				}
		}
		
		preview.init();
});