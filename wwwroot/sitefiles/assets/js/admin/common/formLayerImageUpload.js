var $url="/common/form/layerImageUpload",data=utils.init({attributeName:utils.getQueryString("attributeName"),no:utils.getQueryInt("no"),editorAttributeName:utils.getQueryString("editorAttributeName"),uploadUrl:null,dialogImageUrl:"",dialogVisible:!1,form:{siteId:utils.getQueryInt("siteId"),isEditor:!1,isLibrary:!0,isThumb:!1,thumbWidth:500,thumbHeight:500,isLinkToOriginal:!0,filePaths:[]}}),methods={parentInsert:function(i,t){var r=parent.$vue;if(r.runFormLayerImageUploadText&&r.runFormLayerImageUploadText(this.attributeName,i,t.imageVirtualUrl),r.runFormLayerImageUploadEditor&&this.editorAttributeName&&this.form.isEditor){var e='<img src="'+t.imageUrl+'" style="border: 0; max-width: 100%" />';if(t.previewUrl){var a='<el-image src="'+t.imageUrl+'" style="border: 0; max-width: 100%"></el-image>';e='<img data-vue="'+encodeURIComponent(a)+'" src="'+t.imageUrl+'" style="border: 0; max-width: 100%" />'}r.runFormLayerImageUploadEditor(this.editorAttributeName,e)}},apiGet:function(){var i=this;utils.loading(this,!0),$api.get($url,{params:{siteId:this.form.siteId}}).then(function(t){var r=t.data;i.form.isEditor=r.isEditor,i.form.isLibrary=r.isLibrary,i.form.isThumb=r.isThumb,i.form.thumbWidth=r.thumbWidth,i.form.thumbHeight=r.thumbHeight,i.form.isLinkToOriginal=r.isLinkToOriginal}).catch(function(i){utils.error(i)}).then(function(){utils.loading(i,!1)})},apiSubmit:function(){var i=this;utils.loading(this,!0),$api.post($url,this.form).then(function(t){var r=t.data;if(r&&r.length>0)for(var e=0;e<r.length;e++){var a=r[e];i.parentInsert(i.no+e,a)}utils.closeLayer()}).catch(function(i){utils.error(i)}).then(function(){utils.loading(i,!1)})},btnSubmitClick:function(){if(0===this.form.filePaths.length)return utils.error("请选择需要插入的图片文件！"),!1;this.apiSubmit()},btnCancelClick:function(){utils.closeLayer()},uploadBefore:i=>!!(i.size/1024/1024<10)||(utils.error("上传图片大小不能超过 10MB!"),!1),uploadProgress:function(){utils.loading(this,!0)},uploadSuccess:function(i){this.form.filePaths.push(i.path),utils.loading(this,!1)},uploadError:function(i){utils.loading(this,!1);var t=JSON.parse(i.message);utils.error(t.message)},uploadRemove(i){i.response&&this.form.filePaths.splice(this.form.filePaths.indexOf(i.response.path),1)},uploadPictureCardPreview(i){this.dialogImageUrl=i.url,this.dialogVisible=!0}},$vue=new Vue({el:"#main",data:data,methods:methods,created:function(){this.uploadUrl=$apiUrl+$url+"/actions/upload?siteId="+this.form.siteId,this.apiGet()}});