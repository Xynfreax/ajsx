var myurl=document.currentScript.src;
//--$$.require(['jstablecss','jstable_f','globalFunciones','jsimg','jsinput','jscheckselect'],function(){
$$.require(['stl.s','../globalFunciones','../ajselect/idx','../ajbutton/idx','../ajinput/idx'],function(){
  $c.add={
    tag:'tr'
    ,id:'ajrow'
  }
  $c.add={
    tag:'div'
    ,id:'ajtable'
    ,classN:'waiting'
    // ,mode:'popup'
    // ,height:'160px'
    ,children:[
      {
        tag:'div'
        ,classN:'top'
        ,idF:'top'
        ,innerId:'mytop'
        ,children:[
          {
            tag:'ajselect'
            ,classN:'rowsxpage'
            ,innerId:'myrowsxpage'
          }
          ,{
            tag:'div'
            ,classN:'search'
            ,innerId:'myfilterfields'
            ,children:[
              {
                tag:'ajselect'
                ,classN:'fields'
                ,innerId:'myselect'
              }
              ,{
                tag:'ajinput'
                ,innerId:'myinput'
                ,height:'100%'
                ,margin:'0px'
                ,type:'search'
                ,placeholder:'Buscar...'

              }
            ]
          }

        ]
      }

      ,{
        tag:'div'
        ,innerId:'box'
        ,classN:'box'
        ,children:[
          {
            tag:'div'
            ,innerId:'tableheader'
            ,classN:'tableheader'
            ,children:[
              {
                tag:'div'
                ,innerId:'mydiv'
                ,classN:'tableheaderdiv'
                ,children:[
                  // {
                  //   tag:'td'
                  //   ,textContent:'ab'
                  // }
                  // ,{
                  //   tag:'td'
                  //   ,textContent:'aasdasd'
                  // }
                ]
              }
            ]
          }
          ,{
            tag:'div'
            // ,border:'solid 1px black'
            ,classN:'middle'
            ,innerId:'middle'
            ,children:[
              {
                tag:'table'
                ,classN:'tablebody'
                ,innerId:'tablebody'
                // ,border:'solid 3px yellow'
                ,children:[
                  {
                    tag:'thead',
                    innerId:'mytheader',
                    children:[
                      {
                        tag:'tr'
                        ,innerId:'mytr'
                      }
                    ]


                  },
                  {
                    tag:'tbody',
                    innerId:'mytbody'
                  }
                ]
              }
            ]
          }
          ,{
            tag:'div'

            ,innerId:'mynav'
            ,classN:'mynav'
            ,children:[
              {
                tag:'div'
                ,classN:'mydirbuttons'
                ,innerId:'mydirbuttons'

                // ,textContent:'esto es otro texto 1234567890'
              }
              ,{
                tag:'ajbutton'
                ,text:'PRIMERO_'
                ,display:'none'
              }
              ,{
                tag:'ajbutton'
                ,text:'ANTERIOR_'
                ,display:'none'
              }
              ,{
                tag:'div'
                ,innerId:'mypagebuttons'
                ,classN:'mypagebuttons'
                // ,textContent:'navu'
              }
              ,{
                tag:'ajbutton'
                ,text:'SIGUIENTE'
                ,display:'none'
              }
              ,{
                tag:'ajbutton'
                ,text:'ULTIMO'
                ,display:'none'
              }
            ]
          }
        ]
      }

    ]
  }
})
