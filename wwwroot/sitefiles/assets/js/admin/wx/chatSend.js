var $url="/wx/chatSend",$urlUpload="/wx/chatSend/actions/upload",data=utils.init({success:!1,errorMessage:null,user:null,chats:null,message:null,image:null,audio:null,video:null,form:{siteId:utils.getQueryInt("siteId"),openId:utils.getQueryString("openId"),materialType:"Text",materialId:0,text:null}}),methods={runLayerMessage:function(t){this.form.materialId=t.id,this.message=t},runLayerImage:function(t){this.form.materialId=t.id,this.image=t},runLayerAudio:function(t){this.form.materialId=t.id,this.audio=t},runLayerVideo:function(t){this.form.materialId=t.id,this.video=t},apiGet:function(){var t=this;utils.loading(this,!0),$api.get($url,{params:{siteId:this.form.siteId,openId:this.form.openId}}).then(function(i){var e=i.data;t.success=e.success,t.errorMessage=e.errorMessage,t.user=e.user,t.chats=e.chats}).catch(function(t){utils.error(t)}).then(function(){utils.loading(t,!1)})},apiSubmit:function(){var t=this;utils.loading(this,!0),$api.post($url,this.form).then(function(i){var e=i.data;t.form.materialType="Text",t.form.materialId=0,t.form.text=null,t.chats=e.chats,utils.success("消息回复成功!")}).catch(function(t){utils.error(t)}).then(function(){utils.loading(t,!1)})},btnTabClick:function(t){this.form.materialType=t.name},btnSelectClick:function(){utils.openLayer({title:"选择素材",url:utils.getWxUrl("layer"+this.form.materialType,{siteId:this.form.siteId})})},tableRowClassName:function(t){return t.row.isReply?"reply-row":""},getUserTitle:function(){return this.user.remark?this.user.remark+"("+this.user.nickname+")":this.user.nickname},isSubmit:function(){return"Text"===this.form.materialType?this.form.text&&this.form.text.length>0:this.form.materialId>0},btnSubmitClick:function(){this.isSubmit()?this.apiSubmit():utils.error("请选择或输入需要发送的消息!")},btnCloseClick:function(){utils.removeTab()},btnRemoveClick:function(){this.form.materialId=0},getUploadUrl:function(){return $apiUrl+$urlUpload+"?siteId="+this.form.siteId+"&materialType="+this.form.materialType},uploadProgress:function(){utils.loading(this,!0)},uploadSuccess:function(t){"Image"===this.form.materialType?(this.form.materialId=t.image.id,this.image=t.image):"Audio"===this.form.materialType?(this.form.materialId=t.audio.id,this.audio=t.audio):"Video"===this.form.materialType&&(this.form.materialId=t.video.id,this.video=t.video),utils.loading(this,!1)},uploadError:function(t){utils.loading(this,!1);var i=JSON.parse(t.message);utils.error(i.message)}},$vue=new Vue({el:"#main",data:data,methods:methods,created:function(){this.apiGet()}});