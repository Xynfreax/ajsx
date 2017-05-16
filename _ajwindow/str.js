$$.require(['stl.s','../ajwindowtitlebar/idx'],function() {
    $c.add={
    tag:'dialog',
    id:'ajwindow',

    // ,textContent:'probando'
    // customProps:{
    //   content:{set:function(v){
    //     for (let i = 0; i < v.length; i++) {
    //       // this.children[1]._children.push(v[i]);
    //       this.children[1]._children=v;
    //     }
    //       // this.children[1]=v
    //   },get:function(v){
    //       return this.children[1];
    //
    //   },configurable:true}
    // },
    children:[
      {
        tag:'ajwindowtitlebar',
        innerId:'mytitlebar'
      },
      {
        tag:'form',
        classN:'content',
        innerId:'mycontent',
        autocomplete:'off',
      },
      {
        tag:'div',
        innerId:'mybcontent',
        classN:'bcontent',
      }
    ]
    ,aliases:[
      ['bcontent',function(){return this.mybcontent},'children'],
      // ['content',function(){return this.mycontent},'children'],
      ['title',function(){return this.mytitlebar},'text'],

      // ['rcontent',function(){return this.mycontent}]
    ]

  }
})
