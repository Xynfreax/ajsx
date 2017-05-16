$$.require(['stl.s','../ajbutton/idx'],function() {

  $c.add={
    tag:'ul'
    ,id:'ajmenu'

    ,subelements:{
      ajitem:{
        tag:'li'
        // ,id:''
        ,classN:'ajitem'
        // ,textContent:'item'
        ,children:[
          {
            tag:'ajbutton'
            ,innerId:'mybutton'
          }
        ]
      }
    }
  }
})
