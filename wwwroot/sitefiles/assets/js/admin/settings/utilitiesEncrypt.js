var $url="/settings/utilitiesEncrypt",data=utils.init({form:{isEncrypt:!0,value:null},results:null}),methods={apiSubmit:function(){var t=this;utils.loading(this,!0),$api.post($url,{isEncrypt:this.form.isEncrypt,value:this.form.value}).then(function(i){var n=i.data;t.results=n.value}).catch(function(t){utils.error(t)}).then(function(){utils.loading(t,!1)})},radioChanged:function(){this.results=""},btnSubmitClick:function(){var t=this;this.$refs.form.validate(function(i){i&&t.apiSubmit()})}},$vue=new Vue({el:"#main",data:data,methods:methods,created:function(){utils.loading(this,!1)}});