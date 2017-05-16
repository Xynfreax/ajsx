$$.require(['../ajselect/idx','stl.s'],function() {
  $c.add={
    tag:'label'
    ,id:'ajselabel'
    ,aliases:[
      ['iprops',function(){return this.myselect},'assignProps']
      ,['text',function(){return this.myspan},'textContent']
      ,['firstValue',function(){return this.myselect},'firstValue']
      // ,['value',function(){return this.myselect},'value']
    ]
    ,customProps:{
      value:{set:function(v) {
        this.myselect.value=v;
      },get:function() {
        return parseValue(this.myselect.value)
      },configurable:true}
    }
    ,children:[
      {
        tag:'span'
        ,innerId:'myspan'
        ,textContent:''
      }
      ,{
        tag:'ajselect'
        ,innerId:'myselect'
        // ,multiple:true
      }
    ]
  }

})
