var $url="/cms/templates/templatesSpecial",$urlUpload=$apiUrl+$url+"/actions/upload",$urlDownload=$url+"/actions/download",data=utils.init({siteId:utils.getQueryInt("siteId"),specials:null,siteUrl:null,uploadUrl:null,panel:!1,form:null,uploadList:[]}),methods={apiGet:function(){var i=this;utils.loading(this,!0),$api.get($url,{params:{siteId:this.siteId}}).then(function(t){var l=t.data;i.specials=l.specials,i.siteUrl=l.siteUrl}).catch(function(i){utils.error(i)}).then(function(){utils.loading(i,!1)})},apiGetSpecial:function(i){var t=this;utils.loading(this,!0),$api.get($url+"/"+this.siteId+"/"+i).then(function(l){var e=l.data;t.panel=!0,t.uploadUrl=$urlUpload+"?siteId="+t.siteId+"&guid="+e.guid,t.form=0===i?{siteId:t.siteId,id:0,guid:e.guid,title:"",url:"/special/"+t.formatDate(),fileNames:[],isEditOnly:!1,isUploadOnly:!1}:{siteId:t.siteId,id:i,guid:e.guid,title:e.special.title,url:e.special.url,fileNames:[],isEditOnly:!1,isUploadOnly:!0},t.uploadList=[]}).catch(function(i){utils.error(i)}).then(function(){utils.loading(t,!1)})},apiDelete:function(i){var t=this;utils.loading(this,!0),$api.delete($url,{data:{siteId:this.siteId,specialId:i}}).then(function(i){var l=i.data;t.specials=l.specials}).catch(function(i){utils.error(i)}).then(function(){utils.loading(t,!1)})},apiSubmit:function(){var i=this;utils.loading(this,!0),$api.post($url,this.form).then(function(t){var l=t.data;utils.success(0===i.form.id?"专题添加成功！":"专题修改成功！"),i.form=null,i.specials=l.specials}).catch(function(i){utils.error(i)}).then(function(){utils.loading(i,!1)})},btnEditClick:function(i){this.form={siteId:this.siteId,id:i.id,guid:"",title:i.title,url:i.url,fileNames:[],isEditOnly:!0,isUploadOnly:!1},this.panel=!0},btnUploadClick:function(i){this.apiGetSpecial(i.id)},btnDownloadClick:function(i){var t=this;utils.loading(this,!0),$api.post($urlDownload,{siteId:this.siteId,specialId:i.id}).then(function(i){var t=i.data;window.location.href=t.value}).catch(function(i){utils.error(i)}).then(function(){utils.loading(t,!1)})},btnAddClick:function(){this.apiGetSpecial(0)},btnDeleteClick:function(i){var t=this;utils.alertDelete({title:"删除专题",text:"此操作将删除专题 "+i.title+"，确定吗？",callback:function(){t.apiDelete(i.id)}})},btnSubmitClick:function(){if(!this.form.isEditOnly&&0===this.form.fileNames.length)return utils.error("请上传专题文件");var i=this;this.$refs.form.validate(function(t){t&&i.apiSubmit()})},formatDate:function(){var i=new Date,t=""+(i.getMonth()+1),l=""+i.getDate(),e=i.getFullYear();return t.length<2&&(t="0"+t),l.length<2&&(l="0"+l),[e,t,l].join("-")},btnCancelClick:function(){this.panel=!1},uploadBefore:i=>!0,uploadProgress:function(){utils.loading(this,!0)},uploadSuccess:function(i,t){utils.loading(this,!1),this.form.fileNames.push(i.value)},uploadError:function(i){utils.loading(this,!1);var t=JSON.parse(i.message);utils.error(t.message)},uploadRemove:function(i,t){this.form.fileNames.splice(this.form.fileNames.indexOf(i.name),1)}},$vue=new Vue({el:"#main",data:data,methods:methods,created:function(){this.apiGet()}});