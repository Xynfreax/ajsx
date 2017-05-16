$$.require(['ajgroupbox_e'],function() {
  $.add={
    tag:'ajgroupbox_e'
    ,id:'ajgroupbox'
    ,customProps:{
      showTitleBar:{set:function(v){
        if(v==false){
          this.myboxtitle.display='none'
        }
      },configurable:true}
    }

  }
})
