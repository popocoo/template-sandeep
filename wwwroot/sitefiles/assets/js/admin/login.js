var $url="/login",$urlCaptcha="/login/captcha",$urlCaptchaCheck="/login/captcha/actions/check";window.top!=self&&(window.top.location=self.location);var data=utils.init({pageSubmit:!1,pageAlert:null,account:null,password:null,isPersistent:!1,captchaToken:null,captchaValue:null,captchaUrl:null,version:null,adminTitle:null}),methods={load:function(){var t=this;utils.loading(this,!0),$api.get($url).then(function(a){var i=a.data;i.success?(t.version=i.version,t.adminTitle=i.adminTitle,t.reload()):location.href=i.redirectUrl}).catch(function(t){utils.error(t)}).then(function(){utils.loading(t,!1)})},reload:function(){var t=this;utils.loading(this,!0),$api.post($urlCaptcha).then(function(a){var i=a.data;t.captchaToken=i.value,t.captchaValue="",t.pageSubmit=!1,t.captchaUrl=$apiUrl+$urlCaptcha+"?token="+t.captchaToken}).catch(function(t){utils.error(t)}).then(function(){utils.loading(t,!1)})},checkCaptcha:function(){var t=this;utils.loading(this,!0),$api.post($urlCaptchaCheck,{token:this.captchaToken,value:this.captchaValue}).then(function(a){t.login()}).catch(function(a){t.reload(),utils.loading(t,!1),utils.error(a)})},login:function(){var t=this;utils.loading(this,!0),$api.post($url,{account:this.account,password:md5(this.password),isPersistent:this.isPersistent}).then(function(a){var i=a.data;localStorage.setItem("sessionId",i.sessionId),localStorage.removeItem(ACCESS_TOKEN_NAME),sessionStorage.removeItem(ACCESS_TOKEN_NAME),t.isPersistent?localStorage.setItem(ACCESS_TOKEN_NAME,i.token):sessionStorage.setItem(ACCESS_TOKEN_NAME,i.token),i.isEnforcePasswordChange?t.redirectPassword():t.redirectIndex()}).catch(function(t){utils.error(t)}).then(function(){t.reload(),utils.loading(t,!1)})},redirectPassword:function(){location.href=utils.getSettingsUrl("administratorsPassword")},redirectIndex:function(){location.href=utils.getIndexUrl()},btnLoginClick:function(t){t.preventDefault(),this.pageSubmit=!0,this.pageAlert=null,this.account&&this.password&&this.captchaValue&&this.checkCaptcha()}},$vue=new Vue({el:"#main",data:data,directives:{focus:{inserted:function(t){t.focus()}}},methods:methods,created:function(){this.load()}});