var $url="/dashboard",data=utils.init({version:null,lastActivityDate:null,updateDate:null,unCheckedList:null,unCheckedListTotalCount:0,adminWelcomeHtml:null,frameworkDescription:null,osArchitecture:null,osDescription:null,containerized:null,cpuCores:null,userName:null,level:null}),methods={apiGet:function(){var e=this;utils.loading(this,!0),$api.get($url).then(function(t){var i=t.data;e.version=i.version,e.lastActivityDate=i.lastActivityDate,e.updateDate=i.updateDate,e.adminWelcomeHtml=i.adminWelcomeHtml||"欢迎使用 SSCMS 管理后台",e.frameworkDescription=i.frameworkDescription,e.osArchitecture=i.osArchitecture,e.osDescription=i.osDescription,e.containerized=i.containerized,e.cpuCores=i.cpuCores,e.userName=i.userName,e.level=i.level,e.getUnCheckedList()}).catch(function(e){utils.error(e)}).then(function(){utils.loading(e,!1)})},getUnCheckedList:function(){var e=this;$api.get($url+"/actions/unCheckedList").then(function(t){var n=t.data;for(e.unCheckedList=n.value,i=0;i<e.unCheckedList.length;i++)e.unCheckedListTotalCount+=e.unCheckedList[i].count}).catch(function(e){utils.error(e)})}},$vue=new Vue({el:"#main",data:data,created:function(){this.apiGet()},methods:methods});