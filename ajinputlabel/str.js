$$.require(['../ajinput/idx','stl.s'],function() {
  $c.add={
    tag:'label'
    ,id:'ajinputlabel'
    ,children:[
      {
        tag:'ajinput'
        ,innerId:'myinput'
        ,classN:'myinput'
        ,placeholder:' '
        // ,textContent:'ajinput'
        // ,type:'number'
      }
      ,{
        tag:'span'
        ,innerId:'myspan'
        ,classN:'myspan'
      }
      ,{
        tag:'span'
        ,innerId:'highlight'
        ,classN:'highlight'
      }
      // ,{
      //   tag:'span'
      //   ,innerId:'highlight'
      //   ,classN:'highlight'
      // }
    ]
    ,aliases:[
      ['iprops',function(){return this.myinput},'assignProps']
      ,['text',function(){return this.myspan},'textContent']
      ,['checked',function(){return this.myinput},'checked']
      ,['value',function(){return this.myinput},'value']
    ]
  }

})
