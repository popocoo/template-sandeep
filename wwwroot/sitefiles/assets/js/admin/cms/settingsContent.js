var $url="/cms/settings/settingsContent",data=utils.init({siteId:utils.getQueryInt("siteId"),form:{isSaveImageInTextEditor:null,pageSize:null,isAutoPageInTextEditor:null,autoPageWordNum:null,isContentTitleBreakLine:null,isContentSubTitleBreakLine:null,isAutoCheckKeywords:null,checkContentLevel:null,checkContentDefaultLevel:null}}),methods={apiGet:function(){var e=this;utils.loading(this,!0),$api.get($url,{params:{siteId:this.siteId}}).then(function(t){var i=t.data;e.form.isSaveImageInTextEditor=i.isSaveImageInTextEditor,e.form.pageSize=i.pageSize,e.form.isAutoPageInTextEditor=i.isAutoPageInTextEditor,e.form.autoPageWordNum=i.autoPageWordNum,e.form.isContentTitleBreakLine=i.isContentTitleBreakLine,e.form.isContentSubTitleBreakLine=i.isContentSubTitleBreakLine,e.form.isAutoCheckKeywords=i.isAutoCheckKeywords,e.form.checkContentLevel=i.checkContentLevel,e.form.checkContentDefaultLevel=i.checkContentDefaultLevel}).catch(function(e){utils.error(e)}).then(function(){utils.loading(e,!1)})},apiSubmit:function(){var e=this;utils.loading(this,!0),$api.post($url,{siteId:this.siteId,isSaveImageInTextEditor:this.form.isSaveImageInTextEditor,pageSize:this.form.pageSize,isAutoPageInTextEditor:this.form.isAutoPageInTextEditor,autoPageWordNum:this.form.autoPageWordNum,isContentTitleBreakLine:this.form.isContentTitleBreakLine,isContentSubTitleBreakLine:this.form.isContentSubTitleBreakLine,isAutoCheckKeywords:this.form.isAutoCheckKeywords,checkContentLevel:this.form.checkContentLevel,checkContentDefaultLevel:this.form.checkContentDefaultLevel}).then(function(e){e.data;utils.success("内容设置保存成功！")}).catch(function(e){utils.error(e)}).then(function(){utils.loading(e,!1)})},btnSubmitClick:function(){var e=this;this.$refs.form.validate(function(t){t&&e.apiSubmit()})},getCheckContentLevel:function(e){switch(e){case 1:return"一级";case 2:return"二级";case 3:return"三级";case 4:return"四级";case 5:return"五级";default:return"一级"}}},$vue=new Vue({el:"#main",data:data,methods:methods,created:function(){this.apiGet()}});