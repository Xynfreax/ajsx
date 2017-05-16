$$.require(['str'],function() {
  Object.assign($j.ajgroupbox,{
    customProps:{
      showTitleBar:{set:function(v){
        if(v==false){
          this.myboxtitle.display='none'
        }
      },configurable:true}
    }

  })
})
