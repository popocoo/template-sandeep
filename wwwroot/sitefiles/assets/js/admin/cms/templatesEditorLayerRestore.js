var $url="/cms/templates/templatesEditorLayerRestore",data=utils.init({siteId:utils.getQueryInt("siteId"),templateId:utils.getQueryInt("templateId"),logs:null,logId:0,original:null,modified:null,diffEditor:null}),methods={apiConfig:function(t){var i=this;utils.loading(this,!0),$api.get($url,{params:{siteId:this.siteId,templateId:this.templateId,logId:t}}).then(function(t){var e=t.data;i.logs=e.logs,i.logId=e.logId,i.original=e.original,i.modified=e.modified,i.logId&&i.setEditorContent(i.original,i.modified)}).catch(function(t){utils.error(t)}).then(function(){utils.loading(i,!1)})},apiDelete:function(){var t=this;utils.loading(this,!0),$api.delete($url,{data:{siteId:this.siteId,templateId:this.templateId,logId:this.logId}}).then(function(i){var e=i.data;t.logs=e.logs,t.logId=e.logId,t.original=e.original,t.modified=e.modified,t.logId&&t.setEditorContent(t.original,t.modified),utils.success("历史版本删除成功！")}).catch(function(t){utils.error(t)}).then(function(){utils.loading(t,!1)})},handleLogIdChange:function(){this.apiConfig(this.logId)},btnDeleteClick:function(){var t=this;utils.alertDelete({title:"删除历史版本",text:"此操作将删除此历史版本，确认吗？",callback:function(){t.apiDelete()}})},setEditorContent:function(t,i){var e=this;if(this.diffEditor){var o=monaco.editor.createModel(t,"text/html"),l=monaco.editor.createModel(i,"text/html");e.diffEditor.setModel({original:o,modified:l})}else setTimeout(function(){require.config({paths:{vs:utils.getAssetsUrl("lib/monaco-editor/min/vs")}}),require(["vs/editor/editor.main"],function(){var o=monaco.editor.createModel(t,"text/html"),l=monaco.editor.createModel(i,"text/html");e.diffEditor=monaco.editor.createDiffEditor(document.getElementById("content"),{language:"html"}),e.diffEditor.setModel({original:o,modified:l})})},100)},btnSubmitClick:function(){parent.$vue.setEditorContent(this.original),utils.closeLayer()},btnCancelClick:function(){utils.closeLayer()}},$vue=new Vue({el:"#main",data:data,methods:methods,created:function(){this.apiConfig(0)}});