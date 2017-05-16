$$.require(['stl.s','../ajbutton/idx'],function() {
  $c.add={
    tag:'div'
    ,id:'ajmultitab'
    ,children:[
      {
        tag:'div',
        innerId:'mybar',
        classN:'header',
        children:[
          {
            tag:'div',
            innerId:'myline',
            classN:'line',
            // textContent:'-'
          }
        ]
      },
      {
        tag:'div',
        innerId:'mycontent',
        classN:'content',
      },
    ]
  }
  $c.add={//un tab
    tag:'div'
    ,id:'ajtab'
    // ,tabIndex:0

    ,children:[
      {
        tag:'div'
        ,classN:'content'
        ,innerId:'mycontent'
        ,children:[
          {
            tag:'div'
            ,innerId:'mytopline'
            ,classN:'topline'
            ,textContent:'|||||||| '
          }
        ]
      }
      ,{
        tag:'div'
        ,classN:'title'
        ,innerId:'mytitle'
      }

    ]
    ,aliases:[
      ['title',function(){return this.mytitle},'textContent']
      ,['content',function(){return this.mycontent},'children']
    ]
  }
})
