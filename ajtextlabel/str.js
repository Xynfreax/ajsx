$$.require(['../ajtextarea/idx','stl.s'],function() {
  $c.add={
    tag:'label'
    ,id:'ajtextlabel'
    ,children:[
      {
        tag:'ajtextarea'
        ,innerId:'myinput'
        ,classN:'myinput'
        ,placeholder:' '
        // ,type:'number'
      }
      ,{
        tag:'span'
        ,innerId:'myspan'
        ,classN:'myspan'
      }
    ]
    ,aliases:[
      ['iprops',function(){return this.myinput},'assignProps']
      ,['text',function(){return this.myspan},'textContent']
      ,['checked',function(){return this.myinput},'checked']
      ,['value',function(){return this.myinput},'value']
    ]
  }

})
