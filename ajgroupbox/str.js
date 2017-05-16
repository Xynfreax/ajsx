$$.require(['../ajboxtitle/idx','stl.s'],function() {
  // alert('ajgroupbox');
  $c.add={
    tag:'div'//como fieldset no funciona
    ,id:'ajgroupbox'
    // ,maxWidth: '200px'
    // ,overflow:'hidden'

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
    ,aliases:[
      ['title',function(){return this.myboxtitle},'textContent']
      ,['content',function(){return this.mycontent},'children']

    ]
  }
})
