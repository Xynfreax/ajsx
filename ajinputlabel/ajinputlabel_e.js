$$.require(['../ajinput/ajinput','ajinputlabel.s'],function() {
  $.add={
    tag:'label'
    ,id:'ajinputlabel_e'
    ,aliases:[
      ['iprops',function(){return this.myinput},'assignProps']
      ,['text',function(){return this.myspan},'textContent']
      ,['checked',function(){return this.myinput},'checked']
      ,['value',function(){return this.myinput},'value']
    ]
    ,children:[
      {
        tag:'ajinput'
        ,innerId:'myinput'
        ,classN:'myinput'
        // ,type:'number'
      }
      ,{
        tag:'span'
        ,innerId:'myspan'
        ,classN:'myspan'
      }
    ]
  }

})
