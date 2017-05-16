$$.require(['jsbutton'],function(){
  $.add=
  {
    tag:'div'
    ,id:'jstitlebar'
    ,aliases:[
      ['jstext',function(){return this.children[0]},'textContent']
    ]
    ,children:[
      {
        tag:'div'
        ,textContent:'Sin título'
      }
    ]
  }
})
