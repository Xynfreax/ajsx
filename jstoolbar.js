$$.require(['jsbutton'],function(){
  $.add=
  {
    tag:'div'
    ,id:'jstoolbar'
    ,position:'relative'
    ,display:'block'
    ,width:'100%'
    //--,borderBottom:'solid 1px #bbb'
    ,aliases:[
      ['content',function(){return this},'children']
    ]
  }
})
