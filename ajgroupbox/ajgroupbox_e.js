$$.require(['../ajboxtitle/ajboxtitle','ajgroupbox.s'],function() {
  $.add={
    tag:'div'//como fieldset no funciona
    ,id:'ajgroupbox_e'
    // ,maxWidth: '200px'
    // ,overflow:'hidden'
    ,aliases:[
      ['title',function(){return this.myboxtitle},'textContent']
      ,['content',function(){return this.mycontent},'children']

    ]
    ,children:[
      {
        tag:'ajboxtitle'
        ,innerId:'myboxtitle'
      }
      ,{
        tag:'div'
        ,innerId:'mycontent'
        ,classN:'content'
        // ,textContent:'contenido'
      }
    ]
  }
})
