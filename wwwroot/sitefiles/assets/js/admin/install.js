var $url="/install",$routeUnCheckedList="unCheckedList",$sqlite="SQLite",data=utils.init({forbidden:!1,version:null,frameworkDescription:null,osDescription:null,contentRootPath:null,webRootPath:null,rootWritable:null,siteFilesWritable:null,databaseTypes:null,adminUrl:null,containerized:!1,databaseType:null,databaseConnectionString:null,redisConnectionString:null,databaseNames:null,pageIndex:0,agreement:!1,passwordLevel:null,errorMessage:null,databaseForm:{databaseType:"MySql",databaseHost:null,isDatabaseDefaultPort:!0,databasePort:null,databaseUserName:null,databasePassword:null,databaseName:null},redisForm:{isRedis:!1,redisHost:"localhost",isRedisDefaultPort:!0,redisPort:6379,isSsl:!1,redisPassword:null},adminForm:{userName:null,adminPassword:null,email:null,mobile:null,confirmPassword:null,isProtectData:!1}}),methods={apiGet:function(){var t=this;this.errorMessage=null,utils.loading(this,!0),$api.get($url).then(function(a){var e=a.data;t.forbidden=e.forbidden,t.version=e.version,t.frameworkDescription=e.frameworkDescription,t.osDescription=e.osDescription,t.contentRootPath=e.contentRootPath,t.webRootPath=e.webRootPath,t.rootWritable=e.rootWritable,t.siteFilesWritable=e.siteFilesWritable,t.databaseTypes=e.databaseTypes,t.adminUrl=e.adminUrl,t.containerized=e.containerized,t.databaseType=e.databaseType,t.databaseConnectionString=e.databaseConnectionString,t.redisConnectionString=e.redisConnectionString}).catch(function(a){t.errorMessage=utils.getErrorMessage(a)}).then(function(){utils.loading(t,!1)})},apiDatabaseConnect:function(){var t=this;this.errorMessage=null,utils.loading(this,!0),$api.post($url+"/actions/databaseConnect",this.databaseForm).then(function(a){var e=a.data;t.containerized?t.pageIndex++:t.databaseNames=e.databaseNames}).catch(function(a){t.errorMessage=utils.getErrorMessage(a)}).then(function(){utils.loading(t,!1)})},apiRedisConnect:function(){var t=this;this.errorMessage=null,utils.loading(this,!0),$api.post($url+"/actions/redisConnect",this.redisForm).then(function(a){a.data;t.pageIndex++}).catch(function(a){t.errorMessage=utils.getErrorMessage(a)}).then(function(){utils.loading(t,!1)})},apiPrepare:function(){var t=this;this.errorMessage=null,utils.loading(this,!0),$api.post($url+"/actions/prepare",_.assign({},this.databaseForm,this.redisForm,this.adminForm)).then(function(a){var e=a.data;setTimeout(function(){t.apiInstall(e.value)},2e3)}).catch(function(a){utils.loading(t,!1),t.errorMessage=utils.getErrorMessage(a)})},apiInstall:function(t){var a=this;this.errorMessage=null,utils.loading(this,!0),$api.post($url+"/actions/install",_.assign({securityKey:t},this.databaseForm,this.redisForm,this.adminForm)).then(function(t){t.data;a.pageIndex++}).catch(function(t){a.errorMessage=utils.getErrorMessage(t)}).then(function(){utils.loading(a,!1)})},validatePass:function(t,a,e){""===a?e(new Error("请再次输入密码")):a!==this.adminForm.adminPassword?e(new Error("两次输入密码不一致!")):e()},checkPasswordLevel:function(t){var a=0;0==t.length?a+=0:t.length<8&&t.length>0?a+=5:t.length>10?a+=25:a+=10;var e=!1,i=!1,n=t.match(/[A-Z]{1}/),s=t.match(/[a-z]{1}/);null==n&&null==s?(a+=0,e=!1):null!=n&&null!=s?(a+=20,i=!0):(a+=10,i=!0);for(var r=!1,o=0,l=0;l<t.length;l++)t.charAt(l)<="9"&&t.charAt(l)>="0"&&(r=!0,o+=1);0==o?(a+=0,r=!1):o>2?(a+=20,r=!0):(a+=10,r=!0);var d=!1,u=0;for(l=0;l<t.length;l++)t.charAt(l)>="0"&&t.charAt(l)<="9"||t.charAt(l)>="A"&&t.charAt(l)<="Z"||t.charAt(l)>="a"&&t.charAt(l)<="z"||(u+=1,d=!0);0==u?(a+=0,d=!1):u>1?(a+=25,d=!0):(a+=10,d=!0),i&&r&&d?a+=5:e&&r&&d?a+=3:e&&r&&(a+=2),this.passwordLevel=a/100*5},btnNextClick:function(){this.databaseNames=null,this.pageIndex++},btnPreviousClick:function(){this.pageIndex--},btnDatabaseConnectClick:function(){var t=this;if(this.containerized)return this.databaseType===$sqlite?void this.pageIndex++:void t.apiDatabaseConnect();this.databaseNames&&this.databaseForm.databaseName||this.databaseForm.databaseType===$sqlite?this.pageIndex++:this.$refs.databaseForm.validate(function(a){a&&t.apiDatabaseConnect()})},btnRedisConnectClick:function(){var t=this;if(this.containerized){if(!this.redisConnectionString)return void this.pageIndex++;t.apiRedisConnect()}else{if(!this.redisForm.isRedis)return void this.pageIndex++;this.$refs.redisForm.validate(function(a){a&&t.apiRedisConnect()})}},btnInstallClick:function(){var t=this;this.$refs.adminForm.validate(function(a){a&&t.apiPrepare()})},btnEnterClick:function(){location.href=utils.getIndexUrl()}},$vue=new Vue({el:"#main",data:data,methods:methods,created:function(){this.apiGet()}});