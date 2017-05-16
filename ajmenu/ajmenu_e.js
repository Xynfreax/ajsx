$$.require(['ajmenu.s','../ajbutton/ajbutton'],function() {
  $.add={
    tag:'ul'
    ,id:'ajmenu_e'

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
