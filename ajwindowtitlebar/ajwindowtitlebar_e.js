$$.require(['ajwindowtitlebar.s'],function() {
  $.add={
    tag:'div'
    ,id:'ajwindowtitlebar_e'
    ,aliases:[
      ['text',function() {return this.mytext},'textContent']
      ,['icon',function() {return this.myicon},'src']
    ]
    ,children:[
      {
        tag:'img'
        ,innerId:'icon'
        ,src:''
      }
      ,{
        tag:'div'
        ,innerId:'mytext'
        ,classN:'mytext'
        ,textContent:'asdf'
      }
      ,{
        tag:'div'
        ,innerId:'myclose'
        ,classN:'closeIcon'
        ,textContent:'X'
      }
    ]
    ,customProps:{
      showCloseIcon:{set:function(v) {
        if(v==false){
          this.myclose.display='none'
        }

      }
        ,configurable:true}
    }

  }
})
